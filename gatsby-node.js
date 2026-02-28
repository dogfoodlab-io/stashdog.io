const path = require('path')

const SUPABASE_BASE_URL = process.env.GATSBY_SUPABASE_URL || 'https://gmchczeyburroiyzefie.supabase.co'
const SUPABASE_GRAPHQL_URL = SUPABASE_BASE_URL.includes('/graphql/v1')
  ? SUPABASE_BASE_URL
  : `${SUPABASE_BASE_URL}/graphql/v1`
const SUPABASE_ANON_KEY = process.env.GATSBY_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtY2hjemV5YnVycm9peXplZmllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyOTM1NjIsImV4cCI6MjA1Mzg2OTU2Mn0.tW4Nx5qpnQh_VszEe9XP8XmTAGu-GHFhhw7e3kCeWFc'

/**
 * Fetch all published blog posts from Supabase GraphQL at build time
 */
async function fetchBlogPosts() {
  const fetch = (await import('node-fetch')).default

  const query = `
    query GetBlogPosts($filter: BlogPostsFilterInput) {
      blogPosts(filter: $filter) {
        id
        title
        content
        excerpt
        slug
        authorId
        published
        featuredImageUrl
        tags
        metaDescription
        createdAt
        updatedAt
      }
    }
  `

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => {
      controller.abort()
    }, 30000)

    const response = await fetch(SUPABASE_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({
        query,
        variables: {
          filter: {
            published: true
          }
        }
      }),
      signal: controller.signal
    })

    clearTimeout(timeout)

    if (!response.ok) {
      throw new Error(`Failed to fetch blog posts: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    
    if (result.errors) {
      console.error('GraphQL errors:', result.errors)
      return []
    }
    
    return result.data?.blogPosts || []
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
