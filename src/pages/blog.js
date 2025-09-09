import React, { useEffect, useState } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import Header from "../components/Header"
import Footer from "../components/Footer"
import BlogCard from "../components/BlogCard"
import { getBlogPosts, getBlogPost } from "../utils/api"
import { useFirebase } from "../hooks/useFirebase"
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import "../styles/global.css"

const BlogPage = ({ location }) => {
  const [blogPosts, setBlogPosts] = useState([])
  const [currentPost, setCurrentPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isInitialized, logEvent } = useFirebase()

  // Check if we're viewing a specific post via query parameter
  const urlParams = new URLSearchParams(location?.search || "")
  const slug = urlParams.get('slug')
  const isViewingPost = !!slug

  useEffect(() => {
    if (isInitialized) {
      const title = currentPost ? `${currentPost.title} - StashDog Blog` : "StashDog Blog"
      logEvent("page_view", {
        page_title: title,
        page_location: typeof window !== "undefined" ? window.location.href : "",
        page_path: typeof window !== "undefined" ? window.location.pathname : "/blog",
      })
    }
  }, [isInitialized, logEvent, currentPost])

  useEffect(() => {
    if (isViewingPost && slug) {
      // Fetch individual blog post
      const fetchBlogPost = async () => {
        try {
          setLoading(true)
          const response = await getBlogPost(slug)
          
          if (response && response.data && response.data.blogPost) {
            const post = response.data.blogPost

            // Determine if content is Markdown (simple heuristic) and convert to HTML
            let contentHtml = post.content || ''
            const looksLikeMarkdown = /(^#{1,6}\s)|(^[-*+]\s)|(```)/m.test(contentHtml)

            if (looksLikeMarkdown) {
              try {
                const raw = marked.parse(contentHtml)
                contentHtml = DOMPurify.sanitize(raw)
              } catch (e) {
                console.warn('Markdown parse failed, falling back to raw content', e)
              }
            }

            setCurrentPost({ ...post, content: contentHtml })
          } else {
            setError('Blog post not found.')
          }
        } catch (err) {
          console.error('Error fetching blog post:', err)
          setError('Failed to load blog post. Please try again later.')
        } finally {
          setLoading(false)
        }
      }
      fetchBlogPost()
    } else {
      // Fetch blog posts list
      const fetchBlogPosts = async () => {
        try {
          setLoading(true)
          setCurrentPost(null)
          const response = await getBlogPosts({
            published: true,
            limit: 20
          })
          
          if (response && response.data && response.data.blogPosts) {
            setBlogPosts(response.data.blogPosts)
          } else {
            setBlogPosts([])
          }
        } catch (err) {
          console.error('Error fetching blog posts:', err)
          setError('Failed to load blog posts. Please try again later.')
          setBlogPosts([])
        } finally {
          setLoading(false)
        }
      }
      fetchBlogPosts()
    }
  }, [isViewingPost, slug])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Render individual blog post
  if (isViewingPost) {
    if (loading) {
      return (
        <HelmetProvider>
          <div className="page-container">
            <Header />
            <main className="blog-post-page">
              <div className="container">
                <div className="blog-loading">
                  <p>Loading blog post...</p>
                </div>
              </div>
            </main>
            <Footer />
          </div>
        </HelmetProvider>
      )
    }

    if (error || !currentPost) {
      return (
        <HelmetProvider>
          <div className="page-container">
            <Helmet>
              <title>Blog Post Not Found - StashDog</title>
            </Helmet>
            <Header />
            <main className="blog-post-page">
              <div className="container">
                <div className="blog-error">
                  <h1>Blog Post Not Found</h1>
                  <p>{error || 'The blog post you are looking for does not exist.'}</p>
                  <a href="/blog" className="back-to-blog">
                    ← Back to Blog
                  </a>
                </div>
              </div>
            </main>
            <Footer />
          </div>
        </HelmetProvider>
      )
    }

    return (
      <HelmetProvider>
        <div className="page-container">
          <Helmet>
            <html lang="en" />
            <title>{currentPost.title} - StashDog Blog</title>
            <meta
              name="description"
              content={currentPost.metaDescription || currentPost.excerpt || `Read ${currentPost.title} on the StashDog blog.`}
            />
            <meta
              name="keywords"
              content={currentPost.tags ? currentPost.tags.join(', ') : 'stashdog blog, home organization'}
            />
            <link rel="canonical" href={`https://stashdog.io/blog?slug=${currentPost.slug}`} />
            <meta name="robots" content="index, follow" />

            {/* Open Graph */}
            <meta property="og:title" content={`${currentPost.title} - StashDog Blog`} />
            <meta
              property="og:description"
              content={currentPost.metaDescription || currentPost.excerpt || `Read ${currentPost.title} on the StashDog blog.`}
            />
            <meta property="og:type" content="article" />
            <meta property="og:url" content={`https://stashdog.io/blog?slug=${currentPost.slug}`} />
            <meta property="og:image" content={currentPost.featuredImageUrl || "https://stashdog.io/lab1.png"} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${currentPost.title} - StashDog Blog`} />
            <meta
              name="twitter:description"
              content={currentPost.metaDescription || currentPost.excerpt || `Read ${currentPost.title} on the StashDog blog.`}
            />
            <meta name="twitter:image" content={currentPost.featuredImageUrl || "https://stashdog.io/lab1.png"} />

            {/* Article Structured Data */}
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": currentPost.title,
                "description": currentPost.metaDescription || currentPost.excerpt,
                "image": currentPost.featuredImageUrl,
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
                "datePublished": currentPost.createdAt,
                "dateModified": currentPost.updatedAt,
                "url": `https://stashdog.io/blog?slug=${currentPost.slug}`
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
                  <h1 className="blog-post-title">{currentPost.title}</h1>
                  <div className="blog-post-meta">
                    <time className="blog-post-date">
                      {formatDate(currentPost.createdAt)}
                    </time>
                  </div>
                </header>

                {/* Hero image area: show image if available, otherwise a tasteful placeholder */}
                <div className="blog-post-hero" aria-hidden={!currentPost.featuredImageUrl}>
                  {currentPost.featuredImageUrl ? (
                    <div className="blog-post-image">
                      <img src={currentPost.featuredImageUrl} alt={currentPost.title} />
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
                  dangerouslySetInnerHTML={{ __html: currentPost.content }}
                />

                {/* Tags rendered at the bottom of the post for better discoverability */}
                {currentPost.tags && currentPost.tags.length > 0 && (
                  <div className="blog-post-tags blog-post-tags-bottom" aria-label="Post tags">
                    {currentPost.tags.map((tag, index) => (
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

  return (
    <HelmetProvider>
      <div className="page-container">
        <Helmet>
          <html lang="en" />
          <title>Blog - StashDog</title>
          <meta
            name="description"
            content="Read the latest news, tips, and insights from StashDog about home organization, inventory management, and getting your life together."
          />
          <meta
            name="keywords"
            content="stashdog blog, home organization tips, inventory management, decluttering, organization hacks"
          />
          <link rel="canonical" href="https://stashdog.io/blog" />
          <meta name="robots" content="index, follow" />

          {/* Open Graph */}
          <meta property="og:title" content="Blog - StashDog" />
          <meta
            property="og:description"
            content="Read the latest news, tips, and insights from StashDog about home organization and inventory management."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://stashdog.io/blog" />
          <meta property="og:image" content="https://stashdog.io/lab1.png" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Blog - StashDog" />
          <meta
            name="twitter:description"
            content="Read the latest news, tips, and insights from StashDog about home organization and inventory management."
          />
          <meta name="twitter:image" content="https://stashdog.io/lab1.png" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Blog - StashDog" />
          <meta
            name="twitter:description"
            content="Read the latest news, tips, and insights from StashDog about home organization and inventory management."
          />
          <meta name="twitter:image" content="https://stashdog.io/lab1.png" />
        </Helmet>

        <Header />
        
        <main className="blog-page">
          <div className="container">
            <div className="blog-header">
              <h1>StashDog Blog</h1>
              <p>Tips, tricks, and insights to help you get organized and find your stuff.</p>
              <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
                <a href="/solutions" style={{ color: '#fcd900', textDecoration: 'underline' }}>
                  View Solutions →
                </a>
              </p>
            </div>

            {loading && (
              <div className="blog-loading">
                <p>Loading blog posts...</p>
              </div>
            )}

            {error && (
              <div className="blog-error">
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && blogPosts.length === 0 && (
              <div className="blog-empty">
                <p>No blog posts available at the moment. Check back soon!</p>
              </div>
            )}

            {!loading && !error && blogPosts.length > 0 && (
              <div className="blog-grid">
                {blogPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  )
}

export default BlogPage