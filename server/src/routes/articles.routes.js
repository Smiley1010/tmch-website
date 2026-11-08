
const express = require("express");
const crypto = require("crypto");
const pool = require("../config/db");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();


/* PUBLIC BLOG: list published articles */
router.get("/public", async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT
        a.id,
        a.title,
        a.slug,
        a.status,
        a.category,
        a.published_at,
        a.focus_keyword,
        a.seo_title,
        a.meta_description,
        a.canonical_url,
        v.excerpt_snapshot AS excerpt,
        v.cover_image_url_snapshot AS cover_image_url
      FROM articles a
      LEFT JOIN article_versions v
        ON v.id = a.current_version_id
       AND v.article_id = a.id
      WHERE a.status = 'published'
      ORDER BY a.published_at DESC NULLS LAST, a.id DESC
    `);

    res.set("Cache-Control", "public, max-age=60");
    res.json({ articles: result.rows });
  } catch (error) {
    next(error);
  }
});

/* PUBLIC BLOG: fetch one published article by slug */
router.get("/public/:slug", async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT
        a.id,
        a.title,
        a.slug,
        a.category,
        a.published_at,
        a.focus_keyword,
        a.seo_title,
        a.meta_description,
        a.canonical_url,
        v.body,
        v.excerpt_snapshot AS excerpt,
        v.cover_image_url_snapshot AS cover_image_url
      FROM articles a
      JOIN article_versions v
        ON v.id = a.current_version_id
       AND v.article_id = a.id
      WHERE a.slug = $1
        AND a.status = 'published'
      LIMIT 1
    `, [req.params.slug]);

    if (!result.rows.length) {
      return res.status(404).json({ message: "Article not found." });
    }

    res.set("Cache-Control", "public, max-age=60");
    res.json({ article: result.rows[0] });
  } catch (error) {
    next(error);
  }
});


function contentHash(data) {
  return crypto.createHash("sha256").update(JSON.stringify(data)).digest("hex");
}


function validateArticle(body) {
  const focusKeyword = body?.focusKeyword ?? body?.focus_keyword ?? "";
  const seoTitle = body?.seoTitle ?? body?.seo_title ?? "";
  const metaDescription = body?.metaDescription ?? body?.meta_description ?? "";
  const canonicalUrl = body?.canonicalUrl ?? body?.canonical_url ?? "";

  return (
    body &&
    typeof body.title === "string" &&
    body.title.trim().length >= 2 &&
    body.title.trim().length <= 250 &&
    typeof body.slug === "string" &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(body.slug) &&
    typeof (body.body ?? "") === "string" &&
    typeof (body.excerpt ?? "") === "string" &&
    typeof (body.category ?? "") === "string" &&
    typeof (body.coverImageUrl ?? body.cover_image_url ?? "") === "string" &&
    typeof focusKeyword === "string" &&
    focusKeyword.length <= 200 &&
    typeof seoTitle === "string" &&
    seoTitle.length <= 250 &&
    typeof metaDescription === "string" &&
    metaDescription.length <= 320 &&
    typeof canonicalUrl === "string"
  );
}

function articleFields(body) {
  return {
    title: body.title.trim(),
    slug: body.slug,
    excerpt: body.excerpt || "",
    category: body.category || "",
    coverImageUrl: body.coverImageUrl ?? body.cover_image_url ?? "",
    body: body.body || "",
    focusKeyword: (body.focusKeyword ?? body.focus_keyword ?? "").trim(),
    seoTitle: (body.seoTitle ?? body.seo_title ?? "").trim(),
    metaDescription: (
      body.metaDescription ?? body.meta_description ?? ""
    ).trim(),
    canonicalUrl: (
      body.canonicalUrl ?? body.canonical_url ?? ""
    ).trim(),
  };
}

// List articles. Writers see only their own articles.
router.get("/", requireAuth, async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT a.id, a.title, a.slug, a.status, a.author_id,
              a.created_at, a.updated_at, a.published_at, a.focus_keyword,
             a.seo_title,
             a.meta_description,
             a.canonical_url,
              v.body, v.excerpt_snapshot AS excerpt,
              v.category_snapshot AS category,
              v.cover_image_url_snapshot AS cover_image_url
       FROM articles a
       LEFT JOIN article_versions v
         ON v.id = a.current_version_id
        AND v.article_id = a.id
       WHERE ($1::text <> 'writer' OR a.author_id = $2)
       ORDER BY a.updated_at DESC, a.id DESC`,
      [req.user.role, req.user.id]
    );

    res.json({ articles: result.rows });
  } catch (error) {
    next(error);
  }
});
router.get("/:id", requireAuth, async (req, res, next) => {
  try {
    const articleId = Number(req.params.id);

    if (!Number.isInteger(articleId) || articleId < 1) {
      return res.status(400).json({ message: "Invalid article ID." });
    }

    const result = await pool.query(
      `SELECT
         a.id,
         a.title,
         a.slug,
         a.excerpt,
         a.category,
         a.cover_image_url,
         a.focus_keyword,
         a.seo_title,
         a.meta_description,
         a.canonical_url,
         a.status,
         a.author_id,
         a.created_at,
         a.updated_at,
         v.body
       FROM articles a
       LEFT JOIN article_versions v
         ON v.id = a.current_version_id
        AND v.article_id = a.id
       WHERE a.id = $1`,
      [articleId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Article not found." });
    }

    const article = result.rows[0];

    if (
      req.user.role === "writer" &&
      Number(article.author_id) !== Number(req.user.id)
    ) {
      return res.status(403).json({ message: "Access denied." });
    }

    return res.json({ article });
  } catch (error) {
    next(error);
  }
});

// Create a draft and its first version.
router.post(
  "/",
  requireAuth,
  requireRole("admin", "editor", "writer"),
  async (req, res, next) => {
    if (!validateArticle(req.body)) {
      return res.status(400).json({ message: "Provide a valid title and slug." });
    }

    const data = articleFields(req.body);
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

     
const created = await client.query(
  `INSERT INTO articles
     (
       title, slug, excerpt, category, cover_image_url,
       focus_keyword, seo_title, meta_description, canonical_url,
       author_id, status
     )
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'draft')
   RETURNING id, title, slug, status, author_id, created_at, updated_at`,
  [
    data.title,
    data.slug,
    data.excerpt,
    data.category,
    data.coverImageUrl || null,
    data.focusKeyword || null,
    data.seoTitle || null,
    data.metaDescription || null,
    data.canonicalUrl || null,
    req.user.id,
  ]
);


      const article = created.rows[0];

      const version = await client.query(
        `INSERT INTO article_versions
           (article_id, version_number, body, title_snapshot,
            excerpt_snapshot, category_snapshot, cover_image_url_snapshot,
            content_hash, created_by)
         VALUES ($1, 1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING id`,
        [
          article.id,
          data.body,
          data.title,
          data.excerpt,
          data.category,
          data.coverImageUrl || null,
          contentHash(data),
          req.user.id,
        ]
      );

      await client.query(
        `UPDATE articles SET current_version_id = $1, updated_at = NOW()
         WHERE id = $2`,
        [version.rows[0].id, article.id]
      );

      await client.query(
        `INSERT INTO audit_logs (actor_id, action, entity_type, entity_id)
         VALUES ($1, 'article.created', 'article', $2)`,
        [req.user.id, article.id]
      );

      await client.query("COMMIT");

      res.status(201).json({
        article: {
          ...article,
          ...data,
          current_version_id: version.rows[0].id,
        },
      });
    } catch (error) {
      await client.query("ROLLBACK");
      if (error.code === "23505") {
        return res.status(409).json({ message: "That article slug is already in use." });
      }
      next(error);
    } finally {
      client.release();
    }
  }
);

// Update an existing article by creating a new version.

// Update an existing article by creating a new version.
// Admins and editors can update published articles.
// Archived articles remain locked.
router.put("/:id", requireAuth, async (req, res, next) => {
  if (!validateArticle(req.body)) {
    return res.status(400).json({
      message: "Provide a valid title and slug."
    });
  }

  const articleId = Number(req.params.id);

  if (!Number.isSafeInteger(articleId) || articleId < 1) {
    return res.status(400).json({
      message: "Invalid article ID."
    });
  }

  const data = articleFields(req.body);
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const found = await client.query(
      `SELECT id, author_id, status, current_version_id
       FROM articles
       WHERE id = $1
       FOR UPDATE`,
      [articleId]
    );

    const article = found.rows[0];

    if (!article) {
      await client.query("ROLLBACK");
      return res.status(404).json({
        message: "Article not found."
      });
    }

    const canEdit =
      req.user.role === "admin" ||
      req.user.role === "editor" ||
      Number(article.author_id) === Number(req.user.id);

    if (!canEdit) {
      await client.query("ROLLBACK");
      return res.status(403).json({
        message: "You cannot edit this article."
      });
    }

    // Archived articles cannot be edited.
    if (article.status === "archived") {
      await client.query("ROLLBACK");
      return res.status(409).json({
        message: "Archived articles cannot be edited."
      });
    }

    // Get the next version number.
    const latest = await client.query(
      `SELECT COALESCE(MAX(version_number), 0) AS version_number
       FROM article_versions
       WHERE article_id = $1`,
      [articleId]
    );

    const versionNumber =
      Number(latest.rows[0].version_number) + 1;

    // Create a new immutable article version.
    const version = await client.query(
      `INSERT INTO article_versions
        (article_id, version_number, body, title_snapshot,
         excerpt_snapshot, category_snapshot, cover_image_url_snapshot,
         content_hash, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id`,
      [
        articleId,
        versionNumber,
        data.body,
        data.title,
        data.excerpt,
        data.category,
        data.coverImageUrl || null,
        contentHash(data),
        req.user.id
      ]
    );

    // Preserve published status and publication date.
    // Articles still in the review workflow return to draft.
    const updated = await client.query(
      `UPDATE articles
       SET title = $1,
           slug = $2,
           excerpt = $3,
           category = $4,
           cover_image_url = $5,
           focus_keyword = $6,
           seo_title = $7,
           meta_description = $8,
           canonical_url = $9,
           current_version_id = $10,
           status = CASE
             WHEN status IN (
               'submitted',
               'in_review',
               'changes_requested'
             )
             THEN 'draft'
             ELSE status
           END,
           updated_at = NOW()
       WHERE id = $11
       RETURNING id, title, slug, status, published_at,
                 updated_at, current_version_id`,
      [
        data.title,
        data.slug,
        data.excerpt,
        data.category,
        data.coverImageUrl || null,
        data.focusKeyword || null,
        data.seoTitle || null,
        data.metaDescription || null,
        data.canonicalUrl || null,
        version.rows[0].id,
        articleId
      ]
    );

    // Record the update.
    await client.query(
      `INSERT INTO audit_logs
        (actor_id, action, entity_type, entity_id)
       VALUES ($1, 'article.updated', 'article', $2)`,
      [req.user.id, articleId]
    );

    await client.query("COMMIT");

    return res.json({
      message: updated.rows[0].status === "published"
        ? "Published article updated successfully."
        : "Article updated successfully.",
      article: {
        ...updated.rows[0],
        ...data
      }
    });

  } catch (error) {
    await client.query("ROLLBACK");

    if (error.code === "23505") {
      return res.status(409).json({
        message: "That article slug is already in use."
      });
    }

    return next(error);

  } finally {
    client.release();
  }
});


// Submit a draft for editorial review.
router.post("/:id/submit", requireAuth, async (req, res, next) => {
  const articleId = Number(req.params.id);
  if (!Number.isSafeInteger(articleId) || articleId < 1) {
    return res.status(400).json({ message: "Invalid article ID." });
  }

  try {
    const result = await pool.query(
      `UPDATE articles
       SET status = 'submitted', updated_at = NOW()
       WHERE id = $1
         AND author_id = $2
         AND status IN ('draft', 'changes_requested')
       RETURNING id, status`,
      [articleId, req.user.id]
    );

    if (!result.rowCount) {
      return res.status(409).json({
        message: "Article not found, not owned by you, or not eligible for submission.",
      });
    }

    await pool.query(
      `INSERT INTO audit_logs (actor_id, action, entity_type, entity_id)
       VALUES ($1, 'article.submitted', 'article', $2)`,
      [req.user.id, articleId]
    );

    res.json({ article: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

// Editors/admins review the current version. Authors cannot review their own work.
router.post(
  "/:id/review",
  requireAuth,
  requireRole("admin", "editor"),
  async (req, res, next) => {
    const articleId = Number(req.params.id);
    const { decision, comments = "" } = req.body || {};

    if (
      !Number.isSafeInteger(articleId) ||
      articleId < 1 ||
      !["approved", "rejected", "changes_requested"].includes(decision) ||
      typeof comments !== "string" ||
      comments.length > 5000
    ) {
      return res.status(400).json({ message: "Invalid review details." });
    }

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const found = await client.query(
        `SELECT id, author_id, status, current_version_id
         FROM articles WHERE id = $1 FOR UPDATE`,
        [articleId]
      );

      const article = found.rows[0];

      if (!article) {
        await client.query("ROLLBACK");
        return res.status(404).json({ message: "Article not found." });
      }

      if (Number(article.author_id) === Number(req.user.id)) {
        await client.query("ROLLBACK");
        return res.status(403).json({
          message: "You cannot review or approve your own article.",
        });
      }

      if (!["submitted", "in_review"].includes(article.status)) {
        await client.query("ROLLBACK");
        return res.status(409).json({
          message: "Only submitted articles can be reviewed.",
        });
      }

      await client.query(
        `INSERT INTO approval_decisions
           (article_id, version_id, reviewer_id, decision, comments)
         VALUES ($1, $2, $3, $4, $5)`,
        [articleId, article.current_version_id, req.user.id, decision, comments]
      );

      const nextStatus =
        decision === "approved" ? "approved" : "changes_requested";

      await client.query(
        `UPDATE articles SET status = $1, updated_at = NOW()
         WHERE id = $2`,
        [nextStatus, articleId]
      );

      await client.query(
        `INSERT INTO audit_logs (actor_id, action, entity_type, entity_id, details)
         VALUES ($1, $2, 'article', $3, jsonb_build_object('decision', $4::text))`,
        [req.user.id, `article.${decision}`, articleId, decision]
      );

      await client.query("COMMIT");
      res.json({ article: { id: articleId, status: nextStatus } });
    } catch (error) {
      await client.query("ROLLBACK");

      if (error.code === "23505") {
        return res.status(409).json({
          message: "You have already reviewed this article version.",
        });
      }

      next(error);
    } finally {
      client.release();
    }
  }
);


/* Publish an approved article. Admins and editors only. */
router.post(
  "/:id/publish",
  requireAuth,
  requireRole("admin", "editor"),
  async (req, res, next) => {
    const articleId = Number(req.params.id);

    if (!Number.isSafeInteger(articleId) || articleId < 1) {
      return res.status(400).json({
        message: "Invalid article ID.",
      });
    }

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const found = await client.query(
        `SELECT id, status, author_id, current_version_id
         FROM articles
         WHERE id = $1
         FOR UPDATE`,
        [articleId]
      );

      const article = found.rows[0];

      if (!article) {
        await client.query("ROLLBACK");
        return res.status(404).json({
          message: "Article not found.",
        });
      }

      if (article.status !== "approved") {
        await client.query("ROLLBACK");
        return res.status(409).json({
          message: "Only approved articles can be published.",
        });
      }

      if (!article.current_version_id) {
        await client.query("ROLLBACK");
        return res.status(409).json({
          message: "This article has no saved version to publish.",
        });
      }

      const published = await client.query(
        `UPDATE articles
         SET status = 'published',
             published_at = NOW(),
             published_by = $1,
             updated_at = NOW()
         WHERE id = $2
         RETURNING id, title, slug, status, published_at, published_by`,
        [req.user.id, articleId]
      );

      await client.query(
        `INSERT INTO audit_logs
           (actor_id, action, entity_type, entity_id)
         VALUES ($1, 'article.published', 'article', $2)`,
        [req.user.id, articleId]
      );

      await client.query("COMMIT");

      return res.json({
        message: "Article published successfully.",
        article: published.rows[0],
      });
    } catch (error) {
      await client.query("ROLLBACK");
      return next(error);
    } finally {
      client.release();
    }
  }
);


module.exports = router;
