import React, { useEffect, useState } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import Header from "../components/Header"
import Footer from "../components/Footer"
import BlogCard from "../components/BlogCard"
import { getBlogPosts } from "../utils/api"
import { useFirebase } from "../hooks/useFirebase"
import "../styles/global.css"

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isInitialized, logEvent } = useFirebase()

  useEffect(() => {
    if (isInitialized) {
      logEvent("page_view", {
        page_title: "StashDog Blog",
        page_location: typeof window !== "undefined" ? window.location.href : "",
        page_path: typeof window !== "undefined" ? window.location.pathname : "/blog",
      })
    }
  }, [isInitialized, logEvent])

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true)
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
  }, [])

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
        </Helmet>

        <Header />
        
        <main className="blog-page">
          <div className="container">
            <div className="blog-header">
              <h1>StashDog Blog</h1>
              <p>Tips, tricks, and insights to help you get organized and find your stuff.</p>
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