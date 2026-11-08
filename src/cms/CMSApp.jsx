import { useCallback, useEffect, useMemo, useState } from "react";
import { apiRequest, getStoredUser, getToken, signOut } from "./api";
import "./CMS.css";

const NAV = [
  { label: "Overview", path: "/cms", icon: "▦", roles: ["admin", "editor", "writer"] },
  { label: "Articles", path: "/cms/articles", icon: "▤", roles: ["admin", "editor", "writer"] },
  { label: "Review queue", path: "/cms/reviews", icon: "✓", roles: ["admin", "editor"] },
  { label: "Users & invitations", path: "/cms/users", icon: "♙", roles: ["admin"] },
];
const statusLabel = (status) => (status || "draft").replaceAll("_", " ");

function CMSLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault(); setBusy(true); setError("");
    try {
      const data = await apiRequest("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
      sessionStorage.setItem("tmch_cms_token", data.token);
      sessionStorage.setItem("tmch_cms_user", JSON.stringify(data.user));
      onLogin(data.user);
      window.history.replaceState({}, "", "/cms");
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <div className="tmch-login-wrap"><form className="tmch-login-card" onSubmit={submit}>
    <a className="tmch-wordmark" href="/" aria-label="TMCH public website"><span className="tmch-mark">T</span><span>TMCH <small>GROUP</small></span></a>
    <div className="tmch-eyebrow">CONTENT MANAGEMENT</div><h1>Welcome back.</h1><p className="tmch-muted">Sign in to manage TMCH website content.</p>
    <label htmlFor="cms-email">Email address</label><input id="cms-email" type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} required />
    <label htmlFor="cms-password">Password</label><input id="cms-password" type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} required />
    {error && <div className="tmch-alert" role="alert">{error}</div>}
    <button className="tmch-btn tmch-btn-primary tmch-btn-full" disabled={busy}>{busy ? "Signing in…" : "Sign in to CMS"}</button>
    <a className="tmch-back-link" href="/">← Back to public website</a>
    <p className="tmch-login-foot">Access is invitation-only. Contact your administrator if you need an account.</p>
  </form></div>;
}

function CMSLayout({ user, page, children }) {
  const visibleNav = NAV.filter(n => n.roles.includes(user?.role));
  return <div className="tmch-cms-shell"><aside className="tmch-sidebar">
    <a className="tmch-wordmark tmch-side-brand" href="/cms"><span className="tmch-mark">T</span><span>TMCH <small>CONTENT STUDIO</small></span></a>
    <div className="tmch-nav-caption">WORKSPACE</div><nav className="tmch-nav">{visibleNav.map(item=><a key={item.path} className={`tmch-nav-link ${page===item.path ? "active" : ""}`} href={item.path}><span className="tmch-nav-icon">{item.icon}</span>{item.label}</a>)}</nav>
    <div className="tmch-sidebar-bottom"><a href="/" className="tmch-nav-link"><span className="tmch-nav-icon">↗</span>View public website</a><div className="tmch-user-mini"><div className="tmch-avatar">{(user?.fullName || user?.full_name || user?.email || "U").slice(0,1).toUpperCase()}</div><div className="tmch-user-meta"><strong>{user?.fullName || user?.full_name || "TMCH user"}</strong><span>{user?.role || "member"}</span></div><button className="tmch-icon-button" title="Sign out" onClick={signOut}>⇥</button></div></div>
  </aside><main className="tmch-cms-main"><header className="tmch-topbar"><div><span className="tmch-topbar-label">TMCH GROUP /</span> Content Studio</div><div className="tmch-topbar-right"><span className="tmch-live-dot"/> Local workspace <span className="tmch-topbar-avatar">{(user?.fullName || user?.email || "U").slice(0,1).toUpperCase()}</span></div></header><div className="tmch-cms-content">{children}</div></main></div>;
}

function PageHeader({ eyebrow, title, description, action }) { return <div className="tmch-page-header"><div><div className="tmch-eyebrow">{eyebrow}</div><h1>{title}</h1>{description && <p>{description}</p>}</div>{action}</div>; }
function StatCard({ label, value, note, icon }) { return <div className="tmch-stat-card"><div className="tmch-stat-top"><span>{label}</span><span className="tmch-stat-icon">{icon}</span></div><div className="tmch-stat-value">{value}</div><div className="tmch-stat-note">{note}</div></div>; }
function StatusPill({ status }) { return <span className={`tmch-status tmch-status-${(status||"draft").toLowerCase()}`}>{statusLabel(status)}</span>; }

function Dashboard({ user, articles, loading, error }) {
  const counts = useMemo(() => ({ drafts: articles.filter(a=>a.status==="draft" || a.status==="changes_requested").length, review: articles.filter(a=>["submitted","in_review"].includes(a.status)).length, published: articles.filter(a=>a.status==="published").length }), [articles]);
  return <><PageHeader eyebrow="YOUR WORKSPACE" title={`Good to see you, ${(user?.fullName || user?.full_name || "there").split(" ")[0]}.`} description="Here's what's happening with TMCH content today." action={<a className="tmch-btn tmch-btn-primary" href="/cms/articles/new">＋ New article</a>} />
    {error && <div className="tmch-alert tmch-alert-wide">{error}</div>}
    <div className="tmch-stat-grid"><StatCard label="All articles" value={loading?"—":articles.length} note="Across all content statuses" icon="▤"/><StatCard label="Drafts & changes" value={loading?"—":counts.drafts} note="Work in progress" icon="✎"/><StatCard label="Awaiting review" value={loading?"—":counts.review} note="Submitted for approval" icon="◷"/><StatCard label="Published" value={loading?"—":counts.published} note="Live content" icon="↗"/></div>
    <section className="tmch-panel"><div className="tmch-panel-heading"><div><h2>Recent articles</h2><p>Your latest content activity</p></div><a className="tmch-text-link" href="/cms/articles">View all articles →</a></div><ArticleTable articles={articles.slice(0,5)} loading={loading}/></section>
    <div className="tmch-info-strip"><span className="tmch-info-icon">i</span><div><strong>Approval workflow is enabled</strong><p>Submitted articles must be reviewed by an editor before they can be published.</p></div></div>
  </>;
}

function ArticleTable({ articles, loading, onEdit }) {
  if (loading) return <div className="tmch-empty">Loading articles…</div>;
  if (!articles.length) return <div className="tmch-empty"><div className="tmch-empty-icon">▤</div><strong>No articles yet</strong><p>Create your first article to start building the content library.</p><a className="tmch-btn tmch-btn-primary" href="/cms/articles/new">Create article</a></div>;
  return <div className="tmch-table-wrap"><table className="tmch-table"><thead><tr><th>ARTICLE</th><th>STATUS</th><th>CATEGORY</th><th>UPDATED</th><th/></tr></thead><tbody>{articles.map((a,i)=><tr key={a.id || a.slug || i}><td><div className="tmch-article-title">{a.title || "Untitled article"}</div><div className="tmch-article-slug">{a.slug || "No slug"}</div></td><td><StatusPill status={a.status}/></td><td>{a.category || "—"}</td><td>{a.updated_at ? new Date(a.updated_at).toLocaleDateString() : "—"}</td><td><button className="tmch-table-action" onClick={()=>onEdit ? onEdit(a) : window.location.assign(`/cms/articles/${a.id}/edit`)}>Open ↗</button></td></tr>)}</tbody></table></div>;
}

function ArticlesPage({ articles, loading, reload, user }) {
  const [query,setQuery] = useState(""); const [filter,setFilter] = useState("all");
  const filtered = articles.filter(a => `${a.title||""} ${a.category||""} ${a.slug||""}`.toLowerCase().includes(query.toLowerCase()) && (filter==="all" || a.status===filter));
  return <><PageHeader eyebrow="CONTENT LIBRARY" title="Articles" description="Create, organise and track your website content." action={<a className="tmch-btn tmch-btn-primary" href="/cms/articles/new">＋ New article</a>}/>
    <section className="tmch-panel"><div className="tmch-toolbar"><input aria-label="Search articles" className="tmch-search" placeholder="⌕  Search articles…" value={query} onChange={e=>setQuery(e.target.value)}/><select aria-label="Filter status" className="tmch-select" value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">All statuses</option>{["draft","submitted","in_review","changes_requested","approved","published","archived"].map(s=><option key={s} value={s}>{statusLabel(s)}</option>)}</select><button className="tmch-btn tmch-btn-secondary" onClick={reload}>↻ Refresh</button></div><ArticleTable articles={filtered} loading={loading}/></section>
    {user?.role==="writer" && <p className="tmch-footnote">As a writer, you can create and submit content. An editor must approve it before publication.</p>}
  </>;
}


function ArticleEditor({ article, articleId, onBack, onSaved, user }) {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    category: "Company news",
    coverImageUrl: "",
    body: "",
    focusKeyword: "",
    seoTitle: "",
    metaDescription: "",
    canonicalUrl: ""
  });

  const [loadedArticle, setLoadedArticle] = useState(article || null);
  const [loadingArticle, setLoadingArticle] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const update = (key, value) =>
    setForm((old) => ({ ...old, [key]: value }));
  
const keyword = form.focusKeyword.trim().toLowerCase();
const articleText = form.body.toLowerCase();
const articleTitle = form.title.toLowerCase();
const articleSlug = form.slug.toLowerCase();
const seoDescription = form.metaDescription.toLowerCase();

const headingMatchesKeyword =
  /(^|\n)\s*#{1,6}\s+.*|<h[1-6]\b[^>]*>.*<\/h[1-6]>/i.test(form.body) &&
  (
    form.body.match(/^#{1,6}\s+.*$/gm) || []
  ).some((heading) => heading.toLowerCase().includes(keyword));

const seoChecks = [
  {
    label: "Focus keyword is set",
    passed: Boolean(keyword)
  },
  {
    label: "Keyword appears in the article title",
    passed: Boolean(keyword && articleTitle.includes(keyword))
  },
  {
    label: "Keyword appears in the URL slug",
    passed: Boolean(keyword && articleSlug.includes(keyword.replace(/\s+/g, "-")))
  },
  {
    label: "Keyword appears in the meta description",
    passed: Boolean(keyword && seoDescription.includes(keyword))
  },
  {
    label: "Keyword appears in the article body",
    passed: Boolean(keyword && articleText.includes(keyword))
  },
  {
    label: "Keyword appears in a heading",
    passed: Boolean(keyword && headingMatchesKeyword)
  },
  {
    label: "SEO title is within 60 characters",
    passed: Boolean(form.seoTitle.trim()) && form.seoTitle.trim().length <= 60
  },
  {
    label: "Meta description is within 160 characters",
    passed: Boolean(form.metaDescription.trim()) && form.metaDescription.trim().length <= 160
  }
];


  function slugify(value) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  useEffect(() => {
    let active = true;

    if (!articleId) {
      setLoadedArticle(null);
      setForm({
        title: "",
        slug: "",
        excerpt: "",
        category: "Company news",
        coverImageUrl: "",
        body: "",
        focusKeyword: "",
        seoTitle: "",
        metaDescription: "",
        canonicalUrl: ""
      });
      setLoadingArticle(false);
      return () => {
        active = false;
      };
    }

    setLoadingArticle(true);
    setError("");

    apiRequest(`/articles/${articleId}`)
      .then((data) => {
        if (!active) return;

        const saved = data.article || data;
        setLoadedArticle(saved);

        setForm({
          title: saved.title || "",
          slug: saved.slug || "",
          excerpt: saved.excerpt || "",
          category: saved.category || "Company news",
          coverImageUrl:
            saved.cover_image_url || saved.coverImageUrl || "",
          body: saved.body || "",
          focusKeyword: saved.focus_keyword || saved.focusKeyword || "",
seoTitle: saved.seo_title || saved.seoTitle || "",
metaDescription: saved.meta_description || saved.metaDescription || "",
canonicalUrl: saved.canonical_url || saved.canonicalUrl || ""
        });
      })
      .catch((err) => {
        if (active) {
          setError(`Could not load article: ${err.message}`);
        }
      })
      .finally(() => {
        if (active) setLoadingArticle(false);
      });

    return () => {
      active = false;
    };
  }, [articleId]);

  async function save(submitForReview = false) {
    setBusy(true);
    setError("");
    setMessage("");

    try {
      const payload = {
        ...form,
        slug: form.slug || slugify(form.title)
      };

      let saved;

      if (loadedArticle?.id) {
        saved = await apiRequest(`/articles/${loadedArticle.id}`, {
          method: "PUT",
          body: JSON.stringify(payload)
        });
      } else {
        saved = await apiRequest("/articles", {
          method: "POST",
          body: JSON.stringify(payload)
        });
      }

      const id =
        saved.article?.id || saved.id || loadedArticle?.id;

      if (submitForReview && id) {
        await apiRequest(`/articles/${id}/submit`, {
          method: "POST",
          body: JSON.stringify({})
        });
      }

    setMessage(
  submitForReview
    ? "Article submitted for editorial review."
    : saved.article?.status === "published"
      ? "Published article updated successfully. Your changes are live."
      : "Draft saved successfully."
);

      if (onSaved) onSaved();

      if (id && !articleId) {
        window.location.assign(`/cms/articles/${id}/edit`);
      }
    } catch (err) {
      setError(err.message || "Unable to save the article.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="CONTENT EDITOR"
        title={articleId ? "Edit article" : "Create an article"}
        description="Write clearly. Save a draft or submit it for editorial review."
        action={
          <button
            className="tmch-btn tmch-btn-secondary"
            onClick={onBack}
          >
            ← Back to articles
          </button>
        }
      />

      {loadingArticle && (
        <div className="tmch-info-strip">
          Loading saved article…
        </div>
      )}

      {error && (
        <div className="tmch-alert tmch-alert-wide">{error}</div>
      )}

      {message && <div className="tmch-success">{message}</div>}

      <div className="tmch-editor-layout">
        <section className="tmch-panel tmch-editor-main">
          <label>
            Article title
            <input
              value={form.title}
              onChange={(e) => {
                const title = e.target.value;
                update("title", title);
                if (!form.slug) update("slug", slugify(title));
              }}
              placeholder="Give your article a clear title"
              required
            />
          </label>

          <label>
            Article body
            <textarea
              className="tmch-body-input"
              value={form.body}
              onChange={(e) => update("body", e.target.value)}
              placeholder="Write your article content here…"
              rows={16}
            />
          </label>

          <div className="tmch-editor-actions">
            <button
              className="tmch-btn tmch-btn-secondary"
              disabled={busy || loadingArticle}
              onClick={() => save(false)}
            >
              {busy ? "Saving…" : "Save draft"}
            </button>

            {user?.role === "writer" ? (
              <button
                className="tmch-btn tmch-btn-primary"
                disabled={busy || loadingArticle || !form.title.trim()}
                onClick={() => save(true)}
              >
                Submit for review →
              </button>
            ) : (
              <button
                className="tmch-btn tmch-btn-primary"
                disabled={busy || loadingArticle}
                onClick={() => save(false)}
              >
                Save changes
              </button>
            )}
          </div>
        </section>

        <aside className="tmch-panel tmch-editor-side">
          <h3>Article details</h3>

          <label>
            URL slug
            <input
              value={form.slug}
              onChange={(e) => update("slug", slugify(e.target.value))}
              placeholder="article-url-slug"
            />
          </label>

          <label>
            Excerpt
            <textarea
              value={form.excerpt}
              onChange={(e) => update("excerpt", e.target.value)}
              rows={4}
              placeholder="A short summary for previews"
            />
          </label>

          <label>
            Category
            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
            >
              {[
                "Company news",
                "Projects",
                "Insights",
                "Services",
                "Announcements",
                "Industry updates"
              ].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label>
            Cover image URL
            <input
              type="url"
              value={form.coverImageUrl}
              onChange={(e) => update("coverImageUrl", e.target.value)}
              placeholder="https://…"
            />
            
<div className="tmch-seo-section">
  <h3>SEO settings</h3>
  <p className="tmch-muted">
    Optimise this article for search engines.
  </p>

  <label>
    Focus keyword
    <input
      value={form.focusKeyword}
      onChange={(e) => update("focusKeyword", e.target.value)}
      placeholder="e.g. infrastructure development"
    />
  </label>

  <label>
    SEO title
    <input
      value={form.seoTitle}
      maxLength={250}
      onChange={(e) => update("seoTitle", e.target.value)}
      placeholder="Title displayed in search results"
    />
    <small>{form.seoTitle.length}/250 characters</small>
  </label>

  <label>
    Meta description
    <textarea
      value={form.metaDescription}
      maxLength={320}
      onChange={(e) => update("metaDescription", e.target.value)}
      rows={3}
      placeholder="Summarise the article for search results"
    />
    <small>{form.metaDescription.length}/320 characters</small>
  </label>

  <label>
    Canonical URL (optional)
    <input
      type="url"
      value={form.canonicalUrl}
      onChange={(e) => update("canonicalUrl", e.target.value)}
      placeholder="https://tmchgroup.com/blog/article-slug"
    />
  </label>
  
<div className="tmch-seo-checklist">
  <h4>SEO checklist</h4>

  <p className="tmch-muted">
    {seoChecks.filter((check) => check.passed).length} of{" "}
    {seoChecks.length} checks passed
  </p>

  {seoChecks.map((check) => (
    <div className="tmch-seo-check" key={check.label}>
      <span>{check.passed ? "✓" : "○"}</span>
      <span>{check.label}</span>
    </div>
  ))}
</div>

</div>

          </label>

          <div className="tmch-info-strip compact">
            <span className="tmch-info-icon">i</span>
            <p>
              Submitting sends this version to an editor. Writers cannot
              approve their own work.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}



function ReviewsPage({ articles, loading, reload, user }) {
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [comment, setComment] = useState({});

  const items = articles.filter((a) =>
    ["submitted", "in_review", "approved", "changes_requested"].includes(
      a.status
    )
  );

  async function decide(article, decision) {
    setBusyId(article.id);
    setError("");
    setSuccess("");

    try {
      await apiRequest(`/articles/${article.id}/review`, {
        method: "POST",
        body: JSON.stringify({
          decision,
          comments: comment[article.id] || "",
        }),
      });

      setSuccess(`Review decision saved for "${article.title}".`);
      await reload();
    } catch (err) {
      setError(err.message || "Unable to save the review decision.");
    } finally {
      setBusyId(null);
    }
  }

  async function publish(article) {
    if (
      !window.confirm(
        `Publish "${article.title}" on the public TMCH website?`
      )
    ) {
      return;
    }

    setBusyId(article.id);
    setError("");
    setSuccess("");

    try {
      await apiRequest(`/articles/${article.id}/publish`, {
        method: "POST",
        body: JSON.stringify({}),
      });

      setSuccess(`"${article.title}" has been published.`);
      await reload();
    } catch (err) {
      setError(err.message || "Unable to publish the article.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="EDITORIAL WORKFLOW"
        title="Review queue"
        description="Review submissions, approve content, and publish approved articles."
        action={
          <button
            className="tmch-btn tmch-btn-secondary"
            onClick={reload}
          >
            ↻ Refresh
          </button>
        }
      />

      {error && (
        <div className="tmch-alert tmch-alert-wide" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="tmch-info-strip" role="status">
          {success}
        </div>
      )}

      {user?.role === "writer" ? (
        <div className="tmch-panel tmch-empty">
          Only editors and administrators can access the review queue.
        </div>
      ) : loading ? (
        <div className="tmch-panel tmch-empty">
          Loading submissions…
        </div>
      ) : items.length === 0 ? (
        <div className="tmch-panel tmch-empty">
          <strong>No articles awaiting review.</strong>
        </div>
      ) : (
        <div className="tmch-review-list">
          {items.map((article) => (
            <article
              className="tmch-panel tmch-review-card"
              key={article.id}
            >
              <div className="tmch-review-head">
                <div>
                  <StatusPill status={article.status} />
                  <h2>{article.title}</h2>
                  <p>{article.excerpt || "No excerpt provided."}</p>
                  <span className="tmch-muted">
                    {article.category || "Uncategorised"} · Article #
                    {article.id}
                  </span>
                </div>
              </div>

              {article.status !== "approved" && (
                <label>
                  Review comments
                  <textarea
                    rows={2}
                    placeholder="Optional feedback for the author…"
                    value={comment[article.id] || ""}
                    onChange={(e) =>
                      setComment((old) => ({
                        ...old,
                        [article.id]: e.target.value,
                      }))
                    }
                  />
                </label>
              )}

              <div className="tmch-editor-actions">
                {article.status === "approved" ? (
                  <button
                    className="tmch-btn tmch-btn-primary"
                    disabled={busyId === article.id}
                    onClick={() => publish(article)}
                  >
                    {busyId === article.id
                      ? "Publishing…"
                      : "Publish article ↗"}
                  </button>
                ) : (
                  <>
                    <button
                      className="tmch-btn tmch-btn-secondary"
                      disabled={busyId === article.id}
                      onClick={() =>
                        decide(article, "changes_requested")
                      }
                    >
                      Request changes
                    </button>

                    <button
                      className="tmch-btn tmch-btn-danger"
                      disabled={busyId === article.id}
                      onClick={() => decide(article, "rejected")}
                    >
                      Reject
                    </button>

                    <button
                      className="tmch-btn tmch-btn-primary"
                      disabled={
                        busyId === article.id ||
                        !["submitted", "in_review"].includes(
                          article.status
                        )
                      }
                      onClick={() => decide(article, "approved")}
                    >
                      Approve article ✓
                    </button>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}



function UsersPage() {
  const [email,setEmail]=useState(""); const [role,setRole]=useState("writer"); const [busy,setBusy]=useState(false); const [error,setError]=useState(""); const [result,setResult]=useState(null);
  async function submit(e){e.preventDefault();setBusy(true);setError("");setResult(null);try{setResult(await apiRequest("/invitations",{method:"POST",body:JSON.stringify({email,role})}));setEmail("");}catch(err){setError(err.message);}finally{setBusy(false);}}
  return <><PageHeader eyebrow="ACCESS CONTROL" title="Users & invitations" description="Invite trusted teammates to contribute to the TMCH website."/><div className="tmch-two-col"><form className="tmch-panel tmch-form-panel" onSubmit={submit}><h2>Invite a teammate</h2><p className="tmch-muted">Invitations expire after 48 hours and can only be used once.</p><label>Email address<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="colleague@company.com" required/></label><label>Role<select value={role} onChange={e=>setRole(e.target.value)}><option value="writer">Writer — create and submit content</option><option value="editor">Editor — review and approve content</option></select></label><button className="tmch-btn tmch-btn-primary" disabled={busy}>{busy?"Creating invitation…":"Create invitation →"}</button>{error&&<div className="tmch-alert">{error}</div>}{result&&<div className="tmch-success"><strong>Invitation created.</strong><p>Email: {result.email}</p><p>Role: {result.role}</p>{result.token?<><p>Development invitation token (copy it now):</p><textarea readOnly rows={3} value={result.token}/><button type="button" className="tmch-btn tmch-btn-secondary" onClick={()=>navigator.clipboard?.writeText(result.token)}>Copy invitation token</button></>:<p>{result.message || "Share the invitation using your configured delivery method."}</p>}</div>}</form><section className="tmch-panel tmch-role-panel"><h2>Roles & permissions</h2><div className="tmch-role-item"><span className="tmch-role-symbol">A</span><div><strong>Administrator</strong><p>Invite users, manage access, and oversee all content.</p></div></div><div className="tmch-role-item"><span className="tmch-role-symbol">E</span><div><strong>Editor</strong><p>Review submissions, request changes, and approve content.</p></div></div><div className="tmch-role-item"><span className="tmch-role-symbol">W</span><div><strong>Writer</strong><p>Create drafts and submit articles for editorial review.</p></div></div><div className="tmch-info-strip compact"><span className="tmch-info-icon">i</span><p>Never share administrator credentials. Production invitations should be delivered through a secure email workflow.</p></div></section></div></>;
}

export default function CMSApp() {
  const path=window.location.pathname;
  const [user,setUser]=useState(getStoredUser()); const [authChecked,setAuthChecked]=useState(false); const [articles,setArticles]=useState([]); const [loadingArticles,setLoadingArticles]=useState(false); const [articleError,setArticleError]=useState(""); const [refreshKey,setRefreshKey]=useState(0);
  const reload=useCallback(()=>setRefreshKey(k=>k+1),[]);
  useEffect(()=>{
    if(!getToken()){setAuthChecked(true);return;}
    let active=true;
    apiRequest("/auth/me").then(data=>{if(active){const current=data.user||data;setUser(current);sessionStorage.setItem("tmch_cms_user",JSON.stringify(current));}}).catch(()=>{sessionStorage.removeItem("tmch_cms_token");sessionStorage.removeItem("tmch_cms_user");setUser(null);}).finally(()=>{if(active)setAuthChecked(true);});
    return ()=>{active=false;};
  },[]);
  useEffect(()=>{
    if(!user || path==="/cms/login") return;
    let active=true;setLoadingArticles(true);setArticleError("");
    apiRequest("/articles").then(data=>{if(active)setArticles(Array.isArray(data)?data:(data.articles||[]));}).catch(err=>{if(active){setArticles([]);setArticleError(`${err.message} The CMS interface is ready, but the article API may still need to be implemented.`);}}).finally(()=>{if(active)setLoadingArticles(false);});
    return ()=>{active=false;};
  },[user,path,refreshKey]);
  if(path==="/cms/login") return user && getToken() ? <div className="tmch-login-wrap"><div className="tmch-login-card"><h1>You're signed in</h1><p>Continue to your workspace.</p><a className="tmch-btn tmch-btn-primary" href="/cms">Open CMS dashboard</a><button className="tmch-btn tmch-btn-secondary" onClick={signOut}>Sign out</button></div></div>:<CMSLogin onLogin={setUser}/>;
  if(!authChecked) return <div className="tmch-cms-loading">Checking your session…</div>;
  if(!user || !getToken()){window.location.replace("/cms/login");return null;}
  const page=path.startsWith("/cms/articles/new")?"editor":/^\/cms\/articles\/\d+\/edit$/.test(path)?"editor":path;
  const idMatch=path.match(/^\/cms\/articles\/(\d+)\/edit$/); const currentArticle=idMatch?articles.find(a=>String(a.id)===idMatch[1]):null;
  let content;
  if(page==="/cms" || path==="/cms/") content=<Dashboard user={user} articles={articles} loading={loadingArticles} error={articleError}/>;
  else if(path==="/cms/articles" || path==="/cms/articles/") content=<ArticlesPage articles={articles} loading={loadingArticles} reload={reload} user={user}/>;
 else if (page === "editor") {
  content = (
    <ArticleEditor
      key={path}
      article={currentArticle}
      articleId={idMatch?.[1] || null}
      user={user}
      onBack={() => window.location.assign("/cms/articles")}
      onSaved={reload}
    />
  );
}
  else if(path==="/cms/reviews") content=<ReviewsPage articles={articles} loading={loadingArticles} reload={reload} user={user}/>;
  else if(path==="/cms/users") content=user.role==="admin"?<UsersPage/>:<div className="tmch-panel tmch-empty">You do not have permission to manage users.</div>;
  else if(path==="/cms/settings") content=<><PageHeader eyebrow="YOUR ACCOUNT" title="Settings" description="Account details and workspace preferences."/><div className="tmch-panel tmch-settings-card"><div className="tmch-avatar large">{(user.fullName||user.full_name||user.email||"U").slice(0,1).toUpperCase()}</div><div><h2>{user.fullName||user.full_name||"CMS user"}</h2><p>{user.email}</p><StatusPill status={user.role}/></div><button className="tmch-btn tmch-btn-secondary" onClick={signOut}>Sign out</button></div></>;
  else content=<div className="tmch-panel tmch-empty"><strong>Page not found</strong><p>That CMS page doesn't exist.</p><a className="tmch-btn tmch-btn-primary" href="/cms">Back to dashboard</a></div>;
  return <CMSLayout user={user} page={page}>{content}</CMSLayout>;
}
