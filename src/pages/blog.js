import React from 'react'
import { useCallback, useEffect, useMemo, useState } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import BlogCard from "../components/BlogCard"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useFirebase } from "../hooks/useFirebase"
import "../styles/global.css"
import { getBlogPosts } from "../utils/api"

const IS_DEV_MODE = typeof process !== "undefined" && process.env.NODE_ENV.startsWith("dev")

const POSTS_PER_PAGE = 20

const TAG_GROUPS = [
  {
    key: "content-type",
    title: "Content Type",
    description: "Dial in the kind of story you need.",
    tags: [
      { value: "tutorial", label: "Tutorial" },
      { value: "guide", label: "Guide" },
      { value: "announcement", label: "Announcement" },
      { value: "case-study", label: "Case Study" },
      { value: "opinion", label: "Opinion" },
      { value: "behind-the-scenes", label: "Behind the Scenes" },
      { value: "resource", label: "Resource" }
    ]
  },
  {
    key: "audience",
    title: "Audience Focus",
    description: "Tailor content to who you are or who you're helping.",
    tags: [
      { value: "new-users", label: "New Users" },
      { value: "current-users", label: "Current Users" },
      { value: "life-transitions", label: "Life Transitions" },
      { value: "families", label: "Families" },
      { value: "small-business", label: "Small Business" },
      { value: "professionals", label: "Professionals" }
    ]
  },
  {
    key: "funnel-stage",
    title: "Customer Journey",
    description: "Meet readers where they are in the funnel.",
    tags: [
      { value: "awareness", label: "Awareness" },
      { value: "consideration", label: "Consideration" },
      { value: "decision", label: "Decision" },
      { value: "retention", label: "Retention" },
      { value: "advocacy", label: "Advocacy" }
    ]
  },
  {
    key: "features",
    title: "Product Superpowers",
    description: "Explore by the feature or use case you care about.",
    tags: [
      { value: "inventory-management", label: "Inventory Management" },
      { value: "photo-features", label: "Photo Features" },
      { value: "sharing-collaboration", label: "Sharing & Collaboration" },
      { value: "search-organization", label: "Search & Organization" },
      { value: "ai-features", label: "AI Features" },
      { value: "mobile-app", label: "Mobile App" },
      { value: "integrations", label: "Integrations" },
      { value: "moving-relocation", label: "Moving & Relocation" },
      { value: "seasonal-storage", label: "Seasonal Storage" },
      { value: "garage-organization", label: "Garage Organization" },
      { value: "kitchen-pantry", label: "Kitchen & Pantry" },
      { value: "craft-supplies", label: "Craft Supplies" },
      { value: "documents-records", label: "Documents & Records" },
      { value: "collections-hobbies", label: "Collections & Hobbies" },
      { value: "emergency-prep", label: "Emergency Prep" }
    ]
  },
  {
    key: "seo-focus",
    title: "Strategic Spotlight",
    description: "Prioritise the keywords and initiatives that matter.",
    tags: [
      { value: "home-organization", label: "Home Organization" },
      { value: "inventory-software", label: "Inventory Software" },
      { value: "moving-tips", label: "Moving Tips" },
      { value: "estate-management", label: "Estate Management" },
      { value: "small-business-inventory", label: "Small Business Inventory" },
      { value: "smart-home", label: "Smart Home" }
    ]
  },
  {
    key: "format",
    title: "Format & Engagement",
    description: "Choose how you like to consume content.",
    tags: [
      { value: "long-form", label: "Long Form" },
      { value: "quick-tips", label: "Quick Tips" },
      { value: "video-post", label: "Video Post" },
      { value: "infographic", label: "Infographic" },
      { value: "checklist", label: "Checklist" },
      { value: "template", label: "Template" },
      { value: "interview", label: "Interview" },
      { value: "viral-potential", label: "Viral Potential" },
      { value: "community-discussion", label: "Community Discussion" },
      { value: "user-generated", label: "User Generated" },
      { value: "trending-topic", label: "Trending Topic" }
    ]
  },
  {
    key: "operational",
    title: "Operational Focus",
    description: "Curate by campaign priority and lifecycle.",
    tags: [
      { value: "evergreen", label: "Evergreen" },
      { value: "seasonal", label: "Seasonal" },
      { value: "flagship", label: "Flagship" },
      { value: "supporting", label: "Supporting" },
      { value: "experimental", label: "Experimental" },
      { value: "maintenance", label: "Maintenance" }
    ]
  }
]

const QUICK_FILTERS = [
  {
    id: "moving-masterclass",
    label: "Moving Masterclass",
    description: "Flagship moving tutorial bundle for chaos-free moves.",
    tags: ["flagship", "tutorial", "moving-relocation", "awareness"]
  },
  {
    id: "stashdog-pro-onboarding",
    label: "StashDog Pro Onboarding",
    description: "Show me guides for new or curious users.",
    tags: ["guide", "new-users", "consideration", "inventory-management"]
  },
  {
    id: "family-peacekeeper",
    label: "Family Peacekeeper",
    description: "Content that keeps households from waging war over scissors.",
    tags: ["case-study", "families", "sharing-collaboration", "decision"]
  },
  {
    id: "organizer-power-pack",
    label: "Organizer Power Pack",
    description: "Retention content for power users and pros.",
    tags: ["tutorial", "professionals", "retention", "search-organization"]
  }
]

const TAG_LABEL_LOOKUP = TAG_GROUPS.reduce((acc, group) => {
  group.tags.forEach(tag => {
    acc[tag.value] = tag.label
  })
  return acc
}, {})

const BlogPage = ({ location }) => {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isInitialized, logEvent } = useFirebase()

  // Check for query parameters
  const urlParams = new URLSearchParams(location?.search || "")
  const preselectedTag = urlParams.get('tag')
  const initialSearchQuery = urlParams.get('search') || ""
  const publishedParam = urlParams.get('published')

  const [selectedTags, setSelectedTags] = useState(() => (preselectedTag ? [preselectedTag] : []))
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const [offset, setOffset] = useState(0)
  const [appliedQuickFilter, setAppliedQuickFilter] = useState(null)
  const [publishedOnly, setPublishedOnly] = useState(() => {
    // If published parameter exists in URL, use it (accepts "true", "false", "1", "0")
    if (publishedParam !== null) {
      return publishedParam === 'true' || publishedParam === '1'
    }
    // Default to true (only show published posts)
    return true
  })

  const activeFilterPayload = useMemo(() => ({
    tags: selectedTags.length > 0 ? selectedTags : null,
    searchQuery: searchQuery.trim() ? searchQuery.trim() : null,
    published: publishedOnly,
    limit: POSTS_PER_PAGE,
    offset
  }), [selectedTags, searchQuery, offset, publishedOnly])

  const hasActiveFilters = useMemo(() => {
    return Boolean(activeFilterPayload.tags?.length || activeFilterPayload.searchQuery)
  }, [activeFilterPayload])

  const activeTagLabels = useMemo(() => (
    activeFilterPayload.tags ? activeFilterPayload.tags.map(tag => TAG_LABEL_LOOKUP[tag] || tag) : []
  ), [activeFilterPayload])

  const filterSearchTerm = activeFilterPayload.searchQuery

  const filterSummary = useMemo(() => {
    const parts = []
    if (activeTagLabels.length > 0) {
      parts.push(activeTagLabels.join(', '))
    }
    if (filterSearchTerm) {
      parts.push(`search “${filterSearchTerm}”`)
    }
    if (IS_DEV_MODE && publishedOnly === false) {
      parts.push('including drafts')
    }
    return parts.join(' + ')
  }, [activeTagLabels, filterSearchTerm])

  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value)
    setAppliedQuickFilter(null)

    // Track search usage
    if (isInitialized && event.target.value) {
      logEvent("blog_search", {
        search_term: event.target.value,
        content_type: "blog"
      })
    }
  }, [isInitialized, logEvent])

  const handleSearchClear = useCallback(() => {
    setSearchQuery("")
    setAppliedQuickFilter(null)
    setOffset(0)

    // Track search clear
    if (isInitialized) {
      logEvent("blog_search_clear", {
        content_type: "blog"
      })
    }
  }, [isInitialized, logEvent])

  const toggleTag = useCallback((tagValue) => {
    setSelectedTags((prev) => {
      const exists = prev.includes(tagValue)
      const next = exists ? prev.filter(tag => tag !== tagValue) : [...prev, tagValue]

      // Track tag selection/deselection
      if (isInitialized) {
        logEvent(exists ? "blog_tag_removed" : "blog_tag_added", {
          tag_name: tagValue,
          tag_label: TAG_LABEL_LOOKUP[tagValue] || tagValue,
          content_type: "blog"
        })
      }

      return next
    })
    setAppliedQuickFilter(null)
  }, [isInitialized, logEvent])

  const removeTag = useCallback((tagValue) => {
    setSelectedTags((prev) => prev.filter(tag => tag !== tagValue))
    setAppliedQuickFilter(null)

    // Track tag removal from active filters
    if (isInitialized) {
      logEvent("blog_tag_removed", {
        tag_name: tagValue,
        tag_label: TAG_LABEL_LOOKUP[tagValue] || tagValue,
        removed_from: "active_filters",
        content_type: "blog"
      })
    }
  }, [isInitialized, logEvent])

  const clearFilters = useCallback(() => {
    const hadTags = selectedTags.length > 0
    const hadSearch = searchQuery.trim().length > 0

    setSelectedTags([])
    setSearchQuery("")
    setAppliedQuickFilter(null)
    setOffset(0)

    // Track filter clearing
    if (isInitialized && (hadTags || hadSearch)) {
      logEvent("blog_filters_cleared", {
        had_tags: hadTags,
        had_search: hadSearch,
        tags_count: selectedTags.length,
        content_type: "blog"
      })
    }
  }, [selectedTags, searchQuery, isInitialized, logEvent])

  const handleQuickFilterClick = useCallback((filter) => {
    const isActive = appliedQuickFilter === filter.id
    if (isActive) {
      setSelectedTags([])
      setSearchQuery("")
      setAppliedQuickFilter(null)
    } else {
      setSelectedTags([...filter.tags])
      setSearchQuery(filter.searchQuery || "")
      setAppliedQuickFilter(filter.id)

      // Track quick filter usage
      if (isInitialized) {
        logEvent("blog_quick_filter_applied", {
          filter_id: filter.id,
          filter_label: filter.label,
          tags_count: filter.tags.length,
          content_type: "blog"
        })
      }
    }
    setOffset(0)
  }, [appliedQuickFilter, isInitialized, logEvent])

  useEffect(() => {
    setOffset((prev) => (prev !== 0 ? 0 : prev))
  }, [selectedTags, searchQuery])

  useEffect(() => {
    if (preselectedTag && !selectedTags.includes(preselectedTag)) {
      setSelectedTags((prev) => (prev.length === 0 ? [preselectedTag] : prev))
    }
  }, [preselectedTag, selectedTags])

  useEffect(() => {
    if (isInitialized) {
      logEvent("page_view", {
        page_title: "StashDog Blog",
        page_location: typeof window !== "undefined" ? window.location.href : "",
        page_path: "/blog",
      })
    }
  }, [isInitialized, logEvent])

  useEffect(() => {
    // Fetch blog posts list
    const fetchBlogPosts = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getBlogPosts({
          tags: activeFilterPayload.tags,
          searchQuery: activeFilterPayload.searchQuery,
          published: activeFilterPayload.published,
          limit: activeFilterPayload.limit,
          offset: activeFilterPayload.offset
        })

        if (response && response.data && response.data.blogPosts) {
          setBlogPosts(response.data.blogPosts)

          // Track blog results loaded
          if (isInitialized) {
            logEvent("blog_results_loaded", {
              results_count: response.data.blogPosts.length,
              has_filters: hasActiveFilters,
              tags_count: activeFilterPayload.tags?.length || 0,
              has_search: Boolean(activeFilterPayload.searchQuery),
              offset: activeFilterPayload.offset,
              content_type: "blog"
            })
          }
        } else {
          setBlogPosts([])
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err)
        setError('Failed to load blog posts. Please try again later.')
        setBlogPosts([])

        // Track error
        if (isInitialized) {
          logEvent("blog_load_error", {
            error_message: err.message,
            content_type: "blog"
          })
        }
      } finally {
        setLoading(false)
      }
    }
    fetchBlogPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilterPayload])

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

            {IS_DEV_MODE && (
            <section className="blog-filter-panel" aria-label="Filter blog posts">
              <div className="blog-filter-row">
                <div className="blog-filter-search">
                  <label className="blog-filter-label" htmlFor="blog-search">Search the archive</label>
                  <div className="blog-filter-search-input">
                    <input
                      id="blog-search"
                      type="search"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Search by chaos trigger, feature, or goal..."
                      aria-label="Search blog posts"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        className="blog-filter-clear-button"
                        onClick={handleSearchClear}
                        aria-label="Clear search"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <p className="blog-filter-hint">Try “garage organization”, “AI inventory”, or “moving checklist”.</p>
                </div>

                <div className="blog-quick-filters" aria-label="Curated quick filters">
                  <span className="blog-quick-filters-title">Quick paths</span>
                  <div className="blog-quick-filters-grid">
                    {QUICK_FILTERS.map((filter) => {
                      const isActive = appliedQuickFilter === filter.id
                      return (
                        <button
                          key={filter.id}
                          type="button"
                          className={`blog-quick-filter${isActive ? ' active' : ''}`}
                          onClick={() => handleQuickFilterClick(filter)}
                          aria-pressed={isActive}
                        >
                          <span className="blog-quick-filter-label">{filter.label}</span>
                          <span className="blog-quick-filter-description">{filter.description}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div className="blog-filter-published" style={{ minWidth: 160 }}>
                  <label className="blog-filter-label">Published</label>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <input
                        type="radio"
                        name="published"
                        checked={publishedOnly === true}
                        onChange={() => setPublishedOnly(true)}
                      />
                      <span>Only published</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <input
                        type="radio"
                        name="published"
                        checked={publishedOnly === false}
                        onChange={() => setPublishedOnly(false)}
                      />
                      <span>Include drafts</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="blog-active-filters" aria-live="polite">
                {hasActiveFilters ? (
                  <>
                    <span className="blog-active-filters-title">Active filters:</span>
                    {(activeFilterPayload.tags || []).map((tag) => (
                      <span key={tag} className="blog-active-filter-chip">
                        {TAG_LABEL_LOOKUP[tag] || tag}
                        <button
                          type="button"
                          className="blog-active-filter-remove"
                          onClick={() => removeTag(tag)}
                          aria-label={`Remove ${TAG_LABEL_LOOKUP[tag] || tag} filter`}
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                    {activeFilterPayload.searchQuery && (
                      <span className="blog-active-filter-chip">
                        Search: “{activeFilterPayload.searchQuery}”
                        <button
                          type="button"
                          className="blog-active-filter-remove"
                          onClick={handleSearchClear}
                          aria-label="Clear search filter"
                        >
                          ✕
                        </button>
                      </span>
                    )}
                    <button type="button" className="blog-filter-clear-all" onClick={clearFilters}>
                      Clear all
                    </button>
                  </>
                ) : (
                  <p className="blog-active-filters-empty">Use the filters to surface the smartest content for your situation.</p>
                )}
              </div>

              <div className="blog-filter-groups">
                {TAG_GROUPS.map((group) => (
                  <section key={group.key} className="blog-filter-group">
                    <div className="blog-filter-group-header">
                      <h3>{group.title}</h3>
                      <p>{group.description}</p>
                    </div>
                    <div className="blog-filter-options">
                      {group.tags.map((tag) => {
                        const isSelected = selectedTags.includes(tag.value)
                        return (
                          <button
                            key={tag.value}
                            type="button"
                            className={`blog-filter-tag${isSelected ? ' active' : ''}`}
                            onClick={() => toggleTag(tag.value)}
                            aria-pressed={isSelected}
                          >
                            {tag.label}
                          </button>
                        )
                      })}
                    </div>
                  </section>
                ))}
              </div>
            </section>
            )}

            {!loading && !error && (
              <div className="blog-results-meta">
                <span className="blog-results-count">
                  {blogPosts.length > 0
                    ? `Showing ${blogPosts.length} ${blogPosts.length === 1 ? 'article' : 'articles'}`
                    : 'No articles found'}
                </span>
                {hasActiveFilters && filterSummary && (
                  <span className="blog-results-filters">
                    Filtering by {filterSummary}
                  </span>
                )}
              </div>
            )}

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
                <p>No articles match this combo yet. Try clearing a filter or explore another quick path.</p>
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