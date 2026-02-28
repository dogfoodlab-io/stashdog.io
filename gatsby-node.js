const path = require('path')

const SUPABASE_BASE_URL = process.env.GATSBY_SUPABASE_URL || 'https://gmchczeyburroiyzefie.supabase.co'
const SUPABASE_GRAPHQL_URL = SUPABASE_BASE_URL.includes('/graphql/v1')
  ? SUPABASE_BASE_URL
  : `${SUPABASE_BASE_URL}/graphql/v1`
const SUPABASE_ANON_KEY = process.env.GATSBY_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtY2hjemV5YnVycm9peXplZmllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyOTM1NjIsImV4cCI6MjA1Mzg2OTU2Mn0.tW4Nx5qpnQh_VszEe9XP8XmTAGu-GHFhhw7e3kCeWFc'

/**
 * Fetch all published blog posts from Supabase REST API at build time
 */
async function fetchBlogPosts() {
  const fetch = (await import('node-fetch')).default

  const restUrl = SUPABASE_BASE_URL.includes('/rest/v1')
    ? SUPABASE_BASE_URL
    : `${SUPABASE_BASE_URL}/rest/v1`

  const params = new URLSearchParams({
    select: 'id,title,content,excerpt,slug,author_id,published,featured_image_url,tags,meta_description,created_at,updated_at',
    published: 'eq.true',
    order: 'created_at.desc',
    limit: '100'
  })

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => {
      controller.abort()
    }, 30000)

    const response = await fetch(`${restUrl}/blog_posts?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY,
        'Accept-Profile': 'content',
      },
      signal: controller.signal
    })

    clearTimeout(timeout)

    if (!response.ok) {
      throw new Error(`Failed to fetch blog posts: ${response.status} ${response.statusText}`)
    }

    const rows = await response.json()
    
    // Transform snake_case to camelCase
    const mapBlogRow = (row) => ({
      id: row.id,
      title: row.title,
      content: row.content,
      excerpt: row.excerpt,
      slug: row.slug,
      authorId: row.author_id,
      published: row.published,
      featuredImageUrl: row.featured_image_url,
      tags: row.tags || [],
      metaDescription: row.meta_description,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    })
    
    return Array.isArray(rows) ? rows.map(mapBlogRow) : []
  } catch (error) {
    console.error('Error fetching blog posts for static generation:', error)
    return []
  }
}

/**
 * Create static pages for each blog post at build time
 */
exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  console.log('Fetching blog posts for static generation...')
  const blogPosts = await fetchBlogPosts()
  console.log(`Found ${blogPosts.length} published blog posts`)

  const blogPostTemplate = path.resolve('./src/templates/blog-post.js')
  const blogListingTemplate = path.resolve('./src/templates/blog-listing.js')

  // Create individual blog post pages
  blogPosts.forEach((post) => {
    console.log(`Creating page for: /blog/${post.slug}`)
    createPage({
      path: `/blog/${post.slug}`,
      component: blogPostTemplate,
      context: {
        // Pass the entire post data as context
        post
      },
    })
  })

  // Create the blog listing page with all posts
  console.log('Creating blog listing page with static data...')
  createPage({
    path: '/blog',
    component: blogListingTemplate,
    context: {
      // Pass all blog posts as context for static generation
      blogPosts
    },
  })
}

/**
 * Configure webpack to handle node-fetch polyfills if needed
 */
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        fs: false,
        net: false,
        tls: false,
      },
    },
  })
}
