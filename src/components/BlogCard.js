import React from "react"
import { Link } from "gatsby"
import { useFirebase } from "../hooks/useFirebase"

const BlogCard = ({ post }) => {
  const { isInitialized, logEvent } = useFirebase()

  const handlePostClick = () => {
    if (isInitialized) {
      logEvent("blog_post_click", {
        post_id: post.id,
        post_slug: post.slug,
        post_title: post.title,
        post_tags: post.tags?.join(", ") || "",
        content_type: "blog"
      })
    }
  }
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <article className="blog-card">
      {post.featuredImageUrl && (
        <div className="blog-card-image">
          <img src={post.featuredImageUrl} alt={post.title} />
        </div>
      )}
      <div className="blog-card-content">
        <h3 className="blog-card-title">
          <Link to={`/blog/${post.slug}`} onClick={handlePostClick}>
            {post.title}
          </Link>
        </h3>
        {post.excerpt && (
          <p className="blog-card-excerpt">{post.excerpt}</p>
        )}
        <div className="blog-card-meta">
          <time className="blog-card-date">
            {formatDate(post.createdAt)}
          </time>
          {post.tags && post.tags.length > 0 && (
            <div className="blog-card-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="blog-card-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <Link to={`/blog/${post.slug}`} className="blog-card-link" onClick={handlePostClick}>
          Read More
        </Link>
      </div>
    </article>
  )
}

export default BlogCard