import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Clock3, Search, X } from "lucide-react";
import "./Blog.css";

const PAGE_SIZE = 6;

const API_BASE = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

export default function Blog() {
  const pageRef = useRef(null);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    const controller = new AbortController();

    async function loadArticles() {
      try {
        const response = await fetch(
          `${API_BASE}/articles/public`,
          { signal: controller.signal }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load articles.");
        }

        setArticles(
          Array.isArray(data.articles) ? data.articles : []
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to load articles.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadArticles();

    return () => controller.abort();
  }, []);

  const featured = articles[0] || null;

  // SEO metadata for the Blog listing page.
useEffect(() => {
  const title = "Insights & Industry Perspectives | TMCH Group";

  const description =
    "Explore insights on environmental management, industrial operations, sustainable infrastructure and construction from TMCH Group.";

  const canonical = "https://tmchgroup.com/blog";

  const image = featured?.cover_image_url
    ? new URL(featured.cover_image_url, "https://tmchgroup.com").href
    : "https://tmchgroup.com/images/tmchlogo.png";

  document.title = title;

  const setMeta = (attribute, key, content) => {
    let tag = document.head.querySelector(
      `meta[${attribute}="${key}"]`
    );

    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute(attribute, key);
      document.head.appendChild(tag);
    }

    tag.setAttribute("content", content);
  };

  setMeta("name", "description", description);
  setMeta("name", "robots", "index, follow");
  setMeta("property", "og:type", "website");
  setMeta("property", "og:site_name", "TMCH Group");
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", description);
  setMeta("property", "og:url", canonical);
  setMeta("property", "og:image", image);
  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", title);
  setMeta("name", "twitter:description", description);
  setMeta("name", "twitter:image", image);

  let canonicalTag = document.head.querySelector(
    'link[rel="canonical"]'
  );

  if (!canonicalTag) {
    canonicalTag = document.createElement("link");
    canonicalTag.rel = "canonical";
    document.head.appendChild(canonicalTag);
  }

  canonicalTag.href = canonical;
}, [featured]);

  // Build categories from the actual published articles.
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        articles
          .map((article) => article.category?.trim())
          .filter(Boolean)
      ),
    ].sort((a, b) => a.localeCompare(b));

    return ["All Articles", ...uniqueCategories];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return articles.filter((article) => {
      if (article.id === featured?.id) return false;

      const matchesCategory =
        activeCategory === "All Articles" ||
        article.category === activeCategory;

      const searchableText = [
        article.title,
        article.excerpt,
        article.category,
        article.focus_keyword,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !search || searchableText.includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [articles, featured, activeCategory, searchTerm]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeCategory, searchTerm]);

  // Reveal elements when they enter the viewport.
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const elements = page.querySelectorAll(
      ".blog-reveal:not(.is-visible)"
    );

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      elements.forEach((element) =>
        element.classList.add("is-visible")
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [articles, loading, visibleArticles, activeCategory]);

  function formatDate(date) {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "";

    return parsedDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function articleUrl(article) {
    return `/blog/${encodeURIComponent(article.slug)}`;
  }

  function clearSearch() {
    setSearchTerm("");
  }

  return (
    <main className="tmch-blog" ref={pageRef}>
      {/* HERO */}
      <section className="page-hero blog-hero">
        <div className="blog-hero-overlay" />

        <div className="hero-content blog-container blog-hero-inner blog-reveal">
          <div className="blog-hero-copy">
            <span className="blog-eyebrow">
              TMCH GROUP / INSIGHTS
            </span>

            <h1>
              Knowledge that
              <br />
              moves industry <span>forward.</span>
            </h1>

            <p>
              Discover perspectives on engineering, environmental
              responsibility, infrastructure and the industries
              shaping tomorrow.
            </p>
          </div>

          <div className="blog-hero-caption">
            ENGINEERING. ENVIRONMENT. INFRASTRUCTURE.
          </div>
        </div>
      </section>

      {/* LOADING */}
      {loading && (
        <div className="blog-container blog-status">
          <p>Loading articles...</p>
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="blog-container blog-status">
          <p role="alert">{error}</p>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && articles.length === 0 && (
        <div className="blog-container blog-status">
          <p>
            No published articles are available yet. Please check
            back soon.
          </p>
        </div>
      )}

      {/* FEATURED ARTICLE */}
      {!loading && !error && featured && (
        <section
          className="blog-featured-section blog-container blog-reveal"
          id="featured-article"
        >
          <div className="blog-section-heading">
            <span className="blog-eyebrow">EDITOR'S PICK</span>

            <span className="blog-section-note">
              Featured insight
            </span>
          </div>

          <article className="blog-featured">
            <a
              href={articleUrl(featured)}
              className="blog-featured-image"
              aria-label={`Read ${featured.title}`}
            >
              {featured.cover_image_url ? (
                <img
                  src={featured.cover_image_url}
                  alt={featured.title}
                  loading="eager"
                />
              ) : (
                <div className="blog-image-placeholder">
                  TMCH GROUP
                </div>
              )}

              <span className="blog-image-arrow">
                <ArrowUpRight size={23} />
              </span>
            </a>

            <div className="blog-featured-content">
              <span className="blog-category">
                {featured.category || "Insights"}
              </span>

              <h2>{featured.title}</h2>

              {featured.excerpt && <p>{featured.excerpt}</p>}

              <div className="blog-article-meta">
                <span>{formatDate(featured.published_at)}</span>
                <span className="blog-meta-dot" />
                <span>TMCH Insights</span>
              </div>

              <a
                href={articleUrl(featured)}
                className="blog-read-link"
              >
                Read full article
                <ArrowUpRight size={18} />
              </a>
            </div>
          </article>
        </section>
      )}

      {/* ALL ARTICLES */}
      {!loading && !error && articles.length > 0 && (
        <section className="blog-latest-section">
          <div className="blog-container">
            <div className="blog-section-heading blog-latest-heading blog-reveal">
              <div>
                <span className="blog-eyebrow">
                  FROM OUR JOURNAL
                </span>

                <h2>Explore our insights.</h2>
              </div>

              <span className="blog-section-note">
                Knowledge. Experience. Perspective.
              </span>
            </div>

            {/* SEARCH */}
            <div className="blog-toolbar blog-reveal">
              <div className="blog-search">
                <Search size={19} />

                <input
                  type="search"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  aria-label="Search articles"
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    aria-label="Clear search"
                  >
                    <X size={17} />
                  </button>
                )}
              </div>

              <span className="blog-results-count">
               {searchTerm || activeCategory !== "All Articles"
  ? filteredArticles.length
  : articles.length}{" "}
{(searchTerm || activeCategory !== "All Articles"
  ? filteredArticles.length
  : articles.length) === 1
  ? "article"
  : "articles"}
              </span>
            </div>

            {/* CATEGORY FILTERS */}
            <div
              className="blog-filters blog-reveal"
              aria-label="Filter articles by category"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={
                    activeCategory === category ? "active" : ""
                  }
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* ARTICLE GRID */}
            <div className="blog-grid">
              {visibleArticles.map((article) => (
                <article
                  className="blog-card blog-reveal"
                  key={article.id}
                >
                  <a
                    className="blog-card-image"
                    href={articleUrl(article)}
                    aria-label={`Read ${article.title}`}
                  >
                    {article.cover_image_url ? (
                      <img
                        src={article.cover_image_url}
                        alt={article.title}
                        loading="lazy"
                      />
                    ) : (
                      <div className="blog-image-placeholder">
                        TMCH GROUP
                      </div>
                    )}

                    <span className="blog-card-arrow">
                      <ArrowUpRight size={20} />
                    </span>
                  </a>

                  <div className="blog-card-content">
                    <span className="blog-category">
                      {article.category || "Insights"}
                    </span>

                    <h3>
                      <a href={articleUrl(article)}>
                        {article.title}
                      </a>
                    </h3>

                    {article.excerpt && <p>{article.excerpt}</p>}

                    <div className="blog-card-footer">
                      <span>
                        {formatDate(article.published_at)}
                      </span>

                      <a
                        href={articleUrl(article)}
                        aria-label={`Read ${article.title}`}
                      >
                        Read article <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* NO RESULTS */}
            {filteredArticles.length === 0 &&
  (searchTerm || activeCategory !== "All Articles") && (
              <div className="blog-empty">
                <h3>No articles found.</h3>
                <p>
                  Try another search term or select a different
                  category.
                </p>

                {(searchTerm ||
                  activeCategory !== "All Articles") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("");
                      setActiveCategory("All Articles");
                    }}
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}

            {/* LOAD MORE */}
            {visibleCount < filteredArticles.length && (
              <div className="blog-load-more">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((current) => current + PAGE_SIZE)
                  }
                >
                  Load more articles
                  <ArrowUpRight size={17} />
                </button>
              </div>
            )}

            <div className="blog-bottom-note blog-reveal">
              <Clock3 size={17} />
              <p>
                Explore insights and updates from TMCH Group.
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}