import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Clock3,
  Share2,
  MessageCircle,
  Link as LinkIcon,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./Blog.css";

const SITE_NAME = "TMCH Group";
const PRODUCTION_URL = "https://tmchgroup.com";

const API_BASE = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

function setMetaTag(attribute, key, content) {
  let tag = document.head.querySelector(
    `meta[${attribute}="${key}"]`
  );

  const created = !tag;

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  const previousContent = tag.getAttribute("content");
  tag.setAttribute("content", content);

  return () => {
    if (created) {
      tag.remove();
    } else if (previousContent !== null) {
      tag.setAttribute("content", previousContent);
    } else {
      tag.removeAttribute("content");
    }
  };
}

function setCanonicalUrl(url) {
  let tag = document.head.querySelector(
    'link[rel="canonical"]'
  );

  const created = !tag;
  const previousHref = tag?.getAttribute("href");

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", url);

  return () => {
    if (created) {
      tag.remove();
    } else if (previousHref !== null) {
      tag.setAttribute("href", previousHref);
    } else {
      tag.removeAttribute("href");
    }
  };
}

function getReadingTime(content = "") {
  const words = content
    .replace(/[#*_`~>\[\]()!-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 200));
}

function getAbsoluteImageUrl(image) {
  if (!image) return "";

  try {
    return new URL(image, PRODUCTION_URL).href;
  } catch {
    return "";
  }
}

export default function BlogArticle() {
  const slug = useMemo(() => {
    try {
      return decodeURIComponent(
        window.location.pathname
          .replace(/^\/blog\//, "")
          .replace(/\/$/, "")
      );
    } catch {
      return "";
    }
  }, []);

  const [article, setArticle] = useState(null);
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const readingTime = useMemo(
    () => getReadingTime(article?.body || ""),
    [article]
  );

  const currentUrl = `${PRODUCTION_URL}/blog/${encodeURIComponent(slug)}`;

  useEffect(() => {
    const controller = new AbortController();

    async function loadArticle() {
      try {
        const [articleResponse, listResponse] = await Promise.all([
          fetch(
            `${API_BASE}/articles/public/${encodeURIComponent(slug)}`,
            { signal: controller.signal }
          ),
          fetch(`${API_BASE}/articles/public`, {
            signal: controller.signal,
          }),
        ]);

        const articleData = await articleResponse.json();

        if (!articleResponse.ok) {
          throw new Error(
            articleData.message || "Unable to load this article."
          );
        }

        setArticle(articleData.article);

        if (listResponse.ok) {
          const listData = await listResponse.json();
          setAllArticles(
            Array.isArray(listData.articles)
              ? listData.articles
              : []
          );
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to load this article.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    if (slug) {
      loadArticle();
    } else {
      setError("Invalid article address.");
      setLoading(false);
    }

    return () => controller.abort();
  }, [slug]);

  // SEO metadata
  useEffect(() => {
    if (!article) return;

    const title =
      article.seo_title || article.title || SITE_NAME;

    const description = (
      article.meta_description ||
      article.excerpt ||
      ""
    ).trim();

    let canonicalUrl = currentUrl;

    if (article.canonical_url) {
      try {
        canonicalUrl = new URL(
          article.canonical_url,
          PRODUCTION_URL
        ).href;
      } catch {
        canonicalUrl = currentUrl;
      }
    }

    const imageUrl = getAbsoluteImageUrl(
      article.cover_image_url
    );

    const previousTitle = document.title;
   document.title = title
  .toLowerCase()
  .endsWith(SITE_NAME.toLowerCase())
  ? title
  : `${title} | ${SITE_NAME}`;

    const cleanup = [
      setMetaTag("name", "description", description),
      setMetaTag("name", "robots", "index, follow"),
      setMetaTag("property", "og:type", "article"),
      setMetaTag("property", "og:site_name", SITE_NAME),
      setMetaTag("property", "og:title", title),
      setMetaTag("property", "og:description", description),
      setMetaTag("property", "og:url", canonicalUrl),
      setMetaTag(
        "name",
        "twitter:card",
        imageUrl ? "summary_large_image" : "summary"
      ),
      setMetaTag("name", "twitter:title", title),
      setMetaTag("name", "twitter:description", description),
      setCanonicalUrl(canonicalUrl),
    ];

    if (imageUrl) {
      cleanup.push(
        setMetaTag("property", "og:image", imageUrl),
        setMetaTag("name", "twitter:image", imageUrl)
      );
    }

    // Structured data for search engines.
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description,
      image: imageUrl || undefined,
      datePublished: article.published_at || undefined,
      mainEntityOfPage: canonicalUrl,
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: PRODUCTION_URL,
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      cleanup.reverse().forEach((restore) => restore());
      script.remove();
      document.title = previousTitle;
    };
  }, [article, currentUrl]);

  const relatedArticles = useMemo(() => {
    if (!article) return [];

    return allArticles
      .filter(
        (item) =>
          item.id !== article.id &&
          item.category &&
          item.category === article.category
      )
      .slice(0, 3);
  }, [article, allArticles]);

  async function copyArticleLink() {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this article link:", currentUrl);
    }
  }

  const shareText = encodeURIComponent(
    article?.title || "Read this article from TMCH Group"
  );

  const shareUrl = encodeURIComponent(currentUrl);

  if (loading) {
    return (
      <main className="tmch-blog blog-container blog-status">
        <p>Loading article...</p>
      </main>
    );
  }

  if (error || !article) {
    return (
      <main className="tmch-blog blog-container blog-not-found">
        <h1>Article unavailable</h1>
        <p>{error || "This article could not be found."}</p>
        <a href="/blog" className="blog-read-link">
          <ArrowLeft size={17} /> Back to insights
        </a>
      </main>
    );
  }

  const date = article.published_at
    ? new Date(article.published_at).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <main className="tmch-blog blog-article-page">
      <article className="blog-container">
        {/* BREADCRUMB */}
        <nav className="blog-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/blog">Insights</a>
          <span>/</span>
          <span>{article.title}</span>
        </nav>

        {/* ARTICLE HEADER */}
        <header className="blog-article-header">
          <a href="/blog" className="blog-back-link">
            <ArrowLeft size={17} />
            Back to insights
          </a>

          <span className="blog-category">
            {article.category || "Insights"}
          </span>

          <h1>{article.title}</h1>

          {article.excerpt && (
            <p className="blog-article-excerpt">
              {article.excerpt}
            </p>
          )}

          <div className="blog-article-details">
            {date && <span>{date}</span>}

            <span className="blog-meta-dot" />

            <span>TMCH Insights</span>

            <span className="blog-meta-dot" />

            <span className="blog-reading-time">
              <Clock3 size={15} />
              {readingTime} min read
            </span>
          </div>
        </header>

        {/* COVER IMAGE */}
        {article.cover_image_url && (
          <div className="blog-article-cover">
            <img
              src={article.cover_image_url}
              alt={article.title}
            />
          </div>
        )}

        {/* ARTICLE BODY */}
        <div className="blog-article-layout">
          <div className="blog-article-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ children, href }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                img: ({ src, alt }) => (
                  <img src={src} alt={alt || ""} loading="lazy" />
                ),
              }}
            >
              {article.body || ""}
            </ReactMarkdown>
          </div>

          {/* SHARE */}
          <aside className="blog-share">
            <span>SHARE THIS ARTICLE</span>

            <div className="blog-share-buttons">
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
              >
               <Share2 size={19} />
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Facebook"
              >
                <Share2 size={19} />
              </a>

              <a
                href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on WhatsApp"
              >
                <MessageCircle size={19} />
              </a>

              <button
                type="button"
                onClick={copyArticleLink}
                aria-label="Copy article link"
                title={copied ? "Copied!" : "Copy link"}
              >
                {copied ? "✓" : <LinkIcon size={19} />}
              </button>
            </div>

            {copied && (
              <small className="blog-copied-message">
                Link copied!
              </small>
            )}
          </aside>
        </div>

        {/* RELATED ARTICLES */}
        {relatedArticles.length > 0 && (
          <section className="blog-related-section">
            <div className="blog-section-heading">
              <div>
                <span className="blog-eyebrow">
                  KEEP EXPLORING
                </span>
                <h2>Related insights.</h2>
              </div>
            </div>

            <div className="blog-related-grid">
              {relatedArticles.map((item) => (
                <article className="blog-card" key={item.id}>
                  <a
                    href={`/blog/${encodeURIComponent(item.slug)}`}
                    className="blog-card-image"
                  >
                    {item.cover_image_url && (
                      <img
                        src={item.cover_image_url}
                        alt={item.title}
                        loading="lazy"
                      />
                    )}

                    <span className="blog-card-arrow">
                      <ArrowUpRight size={20} />
                    </span>
                  </a>

                  <div className="blog-card-content">
                    <span className="blog-category">
                      {item.category}
                    </span>

                    <h3>
                      <a
                        href={`/blog/${encodeURIComponent(item.slug)}`}
                      >
                        {item.title}
                      </a>
                    </h3>

                    {item.excerpt && <p>{item.excerpt}</p>}

                    <div className="blog-card-footer">
                      <span>
                        {item.published_at
                          ? new Date(
                              item.published_at
                            ).toLocaleDateString("en-GB")
                          : ""}
                      </span>

                      <a
                        href={`/blog/${encodeURIComponent(item.slug)}`}
                      >
                        Read article <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <div className="blog-article-end">
          <a href="/blog" className="blog-read-link">
            <ArrowLeft size={17} />
            Explore all insights
          </a>
        </div>
      </article>
    </main>
  );
}