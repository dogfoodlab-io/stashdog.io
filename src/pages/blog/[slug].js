import React, { useEffect, useState } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { navigate } from "gatsby"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { getBlogPost } from "../../utils/api"
import { useFirebase } from "../../hooks/useFirebase"
import "../../styles/global.css"

const BlogPostPage = ({ params }) => {
  const [blogPost, setBlogPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isInitialized, logEvent } = useFirebase()
  const slug = params.slug

  useEffect(() => {
    if (isInitialized && blogPost) {
      logEvent("page_view", {
        page_title: `${blogPost.title} - StashDog Blog`,
        page_location: typeof window !== "undefined" ? window.location.href : "",
        page_path: typeof window !== "undefined" ? window.location.pathname : `/blog/${slug}`,
      })
    }
  }, [isInitialized, logEvent, blogPost, slug])

  useEffect(() => {
    if (!slug) {
      navigate('/blog')
      return
    }

    const fetchBlogPost = async () => {
      try {
        setLoading(true)
        const response = await getBlogPost(slug)
        
        if (response && response.data && response.data.blogPost) {
          setBlogPost(response.data.blogPost)
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
  }, [slug])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

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

  if (error || !blogPost) {
    return (
      <HelmetProvider>
        <div className="page-container">
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
          <title>{blogPost.title} - StashDog Blog</title>
          <meta
            name="description"
            content={blogPost.metaDescription || blogPost.excerpt || `Read ${blogPost.title} on the StashDog blog.`}
          />
          <meta
            name="keywords"
            content={blogPost.tags ? blogPost.tags.join(', ') : 'stashdog blog, home organization'}
          />
          <link rel="canonical" href={`https://stashdog.io/blog/${blogPost.slug}`} />
          <meta name="robots" content="index, follow" />

          {/* Open Graph */}
          <meta property="og:title" content={`${blogPost.title} - StashDog Blog`} />
          <meta
            property="og:description"
            content={blogPost.metaDescription || blogPost.excerpt || `Read ${blogPost.title} on the StashDog blog.`}
          />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`https://stashdog.io/blog/${blogPost.slug}`} />
          <meta property="og:image" content={blogPost.featuredImageUrl || "https://stashdog.io/lab1.png"} />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`${blogPost.title} - StashDog Blog`} />
          <meta
            name="twitter:description"
            content={blogPost.metaDescription || blogPost.excerpt || `Read ${blogPost.title} on the StashDog blog.`}
          />
          <meta name="twitter:image" content={blogPost.featuredImageUrl || "https://stashdog.io/lab1.png"} />

          {/* Article Structured Data */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": blogPost.title,
              "description": blogPost.metaDescription || blogPost.excerpt,
              "image": blogPost.featuredImageUrl,
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
              "datePublished": blogPost.createdAt,
              "dateModified": blogPost.updatedAt,
              "url": `https://stashdog.io/blog/${blogPost.slug}`
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
                <h1 className="blog-post-title">{blogPost.title}</h1>
                {blogPost.featuredImageUrl && (
                  <div className="blog-post-image">
                    <img src={blogPost.featuredImageUrl} alt={blogPost.title} />
                  </div>
                )}
                <div className="blog-post-meta">
                  <time className="blog-post-date">
                    {formatDate(blogPost.createdAt)}
                  </time>
                  {blogPost.tags && blogPost.tags.length > 0 && (
                    <div className="blog-post-tags">
                      {blogPost.tags.map((tag, index) => (
                        <span key={index} className="blog-post-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </header>
              
              <div 
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />
            </article>
          </div>
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  )
}

export default BlogPostPage