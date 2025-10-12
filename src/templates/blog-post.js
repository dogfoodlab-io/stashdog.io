import React from 'react'
import { marked } from 'marked'
import { Helmet, HelmetProvider } from "react-helmet-async"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useFirebase } from "../hooks/useFirebase"
import "../styles/global.css"

// Lazy import DOMPurify to avoid SSR issues
let DOMPurify
if (typeof window !== 'undefined') {
  DOMPurify = require('isomorphic-dompurify')
}

const BlogPostTemplate = ({ pageContext }) => {
  const { post } = pageContext
  const { isInitialized, logEvent } = useFirebase()

  React.useEffect(() => {
    if (isInitialized && post) {
      logEvent("page_view", {
        page_title: `${post.title} - StashDog Blog`,
        page_location: typeof window !== "undefined" ? window.location.href : "",
        page_path: `/blog/${post.slug}`,
      })
    }
  }, [isInitialized, logEvent, post])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Process content: convert Markdown to HTML if needed
  let contentHtml = post.content || ''
  const looksLikeMarkdown = /(^#{1,6}\s)|(^[-*+]\s)|(```)/m.test(contentHtml)

  if (looksLikeMarkdown) {
    try {
      const raw = marked.parse(contentHtml)
      // Only sanitize in the browser to avoid SSR issues with jsdom
      if (DOMPurify) {
        contentHtml = DOMPurify.sanitize(raw)
      } else {
        contentHtml = raw
      }
    } catch (e) {
      console.warn('Markdown parse failed, falling back to raw content', e)
    }
  }

  return (
    <HelmetProvider>
      <div className="page-container">
        <Helmet>
          <html lang="en" />
          <title>{post.title} - StashDog Blog</title>
          <meta
            name="description"
            content={post.metaDescription || post.excerpt || `Read ${post.title} on the StashDog blog.`}
          />
          <meta
            name="keywords"
            content={post.tags ? post.tags.join(', ') : 'stashdog blog, home organization'}
          />
          <link rel="canonical" href={`https://stashdog.io/blog/${post.slug}`} />
          <meta name="robots" content="index, follow" />

          {/* Open Graph */}
          <meta property="og:title" content={`${post.title} - StashDog Blog`} />
          <meta
            property="og:description"
            content={post.metaDescription || post.excerpt || `Read ${post.title} on the StashDog blog.`}
          />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`https://stashdog.io/blog/${post.slug}`} />
          <meta property="og:image" content={post.featuredImageUrl || "https://stashdog.io/lab1.png"} />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`${post.title} - StashDog Blog`} />
          <meta
            name="twitter:description"
            content={post.metaDescription || post.excerpt || `Read ${post.title} on the StashDog blog.`}
          />
          <meta name="twitter:image" content={post.featuredImageUrl || "https://stashdog.io/lab1.png"} />

          {/* Article Structured Data */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.metaDescription || post.excerpt,
              "image": post.featuredImageUrl,
              "author": {
                "@type": "Organization",
                "name": "Dogfood Lab LLC"
              },
              "publisher": {
                "@type": "Organization",
                "name": "StashDog",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://stashdog.io/round-logo-goggles.png"
                }
              },
              "datePublished": post.createdAt,
              "dateModified": post.updatedAt,
              "url": `https://stashdog.io/blog/${post.slug}`
            })}
          </script>
        </Helmet>

        <Header />

        <main className="blog-post-page">
          <div className="container">
            <article className="blog-post">
              <header className="blog-post-header">
                <a href="/blog" className="back-to-blog">
                  ← Back to Blog
                </a>
                <h1 className="blog-post-title">{post.title}</h1>
                <div className="blog-post-meta">
                  <time className="blog-post-date">
                    {formatDate(post.createdAt)}
                  </time>
                </div>
              </header>

              {/* Hero image area */}
              <div className="blog-post-hero" aria-hidden={!post.featuredImageUrl}>
                {post.featuredImageUrl ? (
                  <div className="blog-post-image">
                    <img src={post.featuredImageUrl} alt={post.title} />
                  </div>
                ) : (
                  <div className="blog-post-hero-placeholder" role="img" aria-label="No hero image available">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="14" rx="2" stroke="#fcd900" strokeWidth="1.2" fill="rgba(252,217,0,0.03)" />
                      <path d="M7 9L10 13L13 10L17 15" stroke="#fcd900" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="placeholder-text">No hero image</div>
                  </div>
                )}
              </div>

              <div
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />

              {/* Tags at the bottom */}
              {post.tags && post.tags.length > 0 && (
                <div className="blog-post-tags blog-post-tags-bottom" aria-label="Post tags">
                  {post.tags.map((tag, index) => (
                    <a key={index} href={`/blog?tag=${encodeURIComponent(tag)}`} className="blog-post-tag">
                      {tag}
                    </a>
                  ))}
                </div>
              )}
            </article>
          </div>
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  )
}

export default BlogPostTemplate
