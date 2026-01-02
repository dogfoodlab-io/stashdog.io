// API Client for StashDog

const getBaseUrl = () => {
  if (process.env.GATSBY_SUPABASE_URL) {
    return process.env.GATSBY_SUPABASE_URL.includes('/rest/v1')
      ? process.env.GATSBY_SUPABASE_URL
      : `${process.env.GATSBY_SUPABASE_URL}/rest/v1`
  }
  return typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:54321/rest/v1'
    : 'https://api.stashdog.io'
}

const getBackendUrl = () => {
  if (process.env.GATSBY_BACKEND_URL) {
    return process.env.GATSBY_BACKEND_URL
  }
  return typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://api.stashdog.io'
}

const API_BASE_URL = getBaseUrl()
const BACKEND_URL = getBackendUrl()
const SUPABASE_ANON_KEY = process.env.GATSBY_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'

/**
 * Generic API request handler for Supabase REST
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'apikey': SUPABASE_ANON_KEY,
      ...(options.headers || {})
    },
  }

  const requestOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers
    }
  }

  try {
    const response = await fetch(url, requestOptions)

    if (!response.ok) {
      const errorData = await response.text()
      throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorData}`)
    }

    // Check if response has content
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return await response.json()
    }

    return await response.text()
  } catch (error) {
    console.error('API request error:', error)
    throw error
  }
}

/**
 * Submit a waitlist entry
 */
export async function submitWaitlistEntry(waitlistEntry) {
  return apiRequest('/waitlist', {
    method: 'POST',
    body: JSON.stringify(waitlistEntry)
  })
}

/**
 * Health check endpoint
 */
export async function healthCheck() {
  return apiRequest('/health')
}

/**
 * GraphQL request handler targeting the backend server
 */
async function graphqlRequest(query, variables = {}, options = {}) {
  const url = `${BACKEND_URL}/graphql`
  const requestOptions = {
    method: 'POST',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    body: JSON.stringify({
      query,
      variables
    })
  }

  try {
    const response = await fetch(url, requestOptions)
    if (!response.ok) {
      const errorData = await response.text()
      throw new Error(`GraphQL request failed: ${response.status} ${response.statusText} - ${errorData}`)
    }
    return await response.json()
  } catch (error) {
    console.error('GraphQL request error:', error)
    throw error
  }
}

/**
 * Fetch all published blog posts
 */
export async function getBlogPosts(filter = {}) {
  const query = `
    query GetBlogPosts($filter: BlogPostsFilterInput) {
      blogPosts(filter: $filter) {
        id
        title
        excerpt
        slug
        authorId
        published
        featuredImageUrl
        tags
        createdAt
        updatedAt
      }
    }
  `

  return graphqlRequest(query, {
    filter: {
      published: typeof filter.published === 'boolean' ? filter.published : true,
      ...filter
    }
  })
}

/**
 * Fetch a single blog post by slug
 */
export async function getBlogPost(slug) {
  const query = `
    query GetBlogPost($slug: String!) {
      blogPost(slug: $slug) {
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

  return graphqlRequest(query, { slug })
}

/**
 * Fetch a public item by share token using the backend GraphQL API
 */
export async function getPublicItem(shareToken) {
  try {
    // 1. Get the share info from the backend
    const shareQuery = `
      query GetShareInfo($token: String!) {
        publicShareByToken(token: $token) {
          resourceId
          resourceType
          status
          expiresAt
        }
      }
    `;

    // The share lookup itself is usually public
    const shareResponse = await graphqlRequest(shareQuery, { token: shareToken });

    if (!shareResponse.data || !shareResponse.data.publicShareByToken) {
      return { data: { getPublicItem: null } };
    }

    const share = shareResponse.data.publicShareByToken;

    if (share.status !== 'ACTIVE') {
      return { data: { getPublicItem: null } };
    }

    // 2. Get the item details
    // We pass the shareToken as a Bearer token in the headers for authorization
    const itemQuery = `
      query GetItem($id: String!) {
        getItem(id: $id) {
          id
          name
          notes
          tags
          images {
            id
            path
            versions {
              thumbnail { path }
              preview { path }
              original { path }
            }
            createdAt
            lastModified
          }
          containedItems {
            id
            name
            notes
            images {
              id
              path
              versions {
                thumbnail { path }
              }
            }
          }
          createdAt
          updatedAt
        }
      }
    `;

    const itemResponse = await graphqlRequest(itemQuery, { id: share.resourceId }, {
      headers: {
        'Authorization': `Bearer ${shareToken}`
      }
    });

    if (!itemResponse.data || !itemResponse.data.getItem) {
      if (itemResponse.errors) {
        console.error('GraphQL errors in getItem:', itemResponse.errors);
        return { errors: itemResponse.errors };
      }
      return { data: { getPublicItem: null } };
    }

    const item = itemResponse.data.getItem;

    // Helper to format item images
    const formatImages = (images) => {
      if (!images) return [];
      const supabaseUrl = (process.env.GATSBY_SUPABASE_URL || 'http://localhost:54321').replace(/\/$/, '');
      return images.map(img => ({
        id: img.id,
        path: img.path,
        urls: {
          thumbnail: img.versions?.thumbnail?.path ? `${supabaseUrl}/storage/v1/object/public/items/${img.versions.thumbnail.path}` : null,
          preview: img.versions?.preview?.path ? `${supabaseUrl}/storage/v1/object/public/items/${img.versions.preview.path}` : null,
          full: img.versions?.original?.path ? `${supabaseUrl}/storage/v1/object/public/items/${img.versions.original.path}` : null,
        },
        createdAt: img.createdAt,
        lastModified: img.lastModified
      }));
    };

    const formattedItem = {
      id: item.id,
      name: item.name,
      description: item.notes,
      tags: item.tags || [],
      images: formatImages(item.images),
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      shareToken: shareToken,
      containedItems: (item.containedItems || []).map(ci => ({
        ...ci,
        description: ci.notes,
        images: formatImages(ci.images)
      })),
      relatedItems: []
    };

    return {
      data: {
        getPublicItem: formattedItem
      }
    };

  } catch (error) {
    console.error('Error in getPublicItem GraphQL refactor:', error);
    throw error;
  }
}

export { apiRequest }