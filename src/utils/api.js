// API Client for StashDog

const getBaseUrl = () => {
  if (process.env.GATSBY_SUPABASE_URL) {
    return process.env.GATSBY_SUPABASE_URL.includes('/rest/v1')
      ? process.env.GATSBY_SUPABASE_URL
      : `${process.env.GATSBY_SUPABASE_URL}/rest/v1`
  }
  const isLocal = typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  return isLocal
    ? 'http://127.0.0.1:54321/rest/v1'
    : 'https://api.stashdog.io'
}

const getBackendUrl = () => {
  if (process.env.GATSBY_BACKEND_URL) {
    return process.env.GATSBY_BACKEND_URL
  }
  const isLocal = typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  return isLocal
    ? 'http://127.0.0.1:3000'
    : 'https://api.stashdog.io'
}

const API_BASE_URL = getBaseUrl()
const BACKEND_URL = getBackendUrl()
const SUPABASE_ANON_KEY = process.env.GATSBY_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'

// Get Supabase Functions URL
const getSupabaseFunctionsUrl = () => {
  if (process.env.GATSBY_SUPABASE_URL) {
    const baseUrl = process.env.GATSBY_SUPABASE_URL.replace('/rest/v1', '');
    return `${baseUrl}/functions/v1`;
  }
  const isLocal = typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  return isLocal
    ? 'http://127.0.0.1:54321/functions/v1'
    : 'https://api.stashdog.io/functions/v1';
}

const SUPABASE_FUNCTIONS_URL = getSupabaseFunctionsUrl()

/**
 * Generic API request handler for Supabase REST
 * Pass { schema: 'content' } for non-public schema table access.
 */
async function apiRequest(endpoint, options = {}) {
  const { schema, ...requestConfig } = options
  const url = `${API_BASE_URL}${endpoint}`

  const schemaHeaders = schema
    ? {
      'Accept-Profile': schema,
      'Content-Profile': schema,
    }
    : {}

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'apikey': SUPABASE_ANON_KEY,
      ...schemaHeaders,
      ...(requestConfig.headers || {})
    },
  }

  const requestOptions = {
    ...defaultOptions,
    ...requestConfig,
    headers: {
      ...defaultOptions.headers,
      ...(requestConfig.headers || {})
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
 * Fetch active subscription plans for the pricing page
 */
export async function getSubscriptionPlans() {
  const query = new URLSearchParams({
    select: 'id,name,description,tier,price,currency,interval,interval_count,features,usage_limits,stripe_price_id,active,sort_order',
    active: 'eq.true',
    order: 'sort_order.asc.nullslast,price.asc.nullslast,created_at.asc'
  })

  return apiRequest(`/subscription_plans?${query.toString()}`)
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
 * Get share data by token (public endpoint)
 * Calls the /get-share-data Supabase Edge Function
 */
export async function getShareData(token) {
  try {
    const response = await fetch(`${SUPABASE_FUNCTIONS_URL}/get-share-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token })
    });

    if (!response.ok) {
      if (response.status === 404) {
        return { error: 'not_found', message: 'This content is not available' };
      }
      const errorData = await response.json();
      return { error: errorData.error || 'unknown_error', message: errorData.message || 'An error occurred' };
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching share data:', error);
    return { error: 'network_error', message: 'Failed to load content. Please check your connection.' };
  }
}

/**
 * Record a share view event for analytics
 * Calls the /record-share-view Supabase Edge Function
 */
export async function recordShareView(token, platform = 'web') {
  try {
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : null;

    await fetch(`${SUPABASE_FUNCTIONS_URL}/record-share-view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        platform,
        userAgent
      })
    });

    // Fire and forget - don't wait for response
  } catch (error) {
    // Silently fail - analytics shouldn't block UI
    console.debug('Failed to record share view:', error);
  }
}

/**
 * Fetch public item by share token
 * Uses the new getShareData endpoint
 */
export async function getPublicItem(shareToken) {
  try {
    const result = await getShareData(shareToken);

    if (result.error) {
      return { data: { getPublicItem: null }, error: result.message };
    }

    const { share, resource } = result;

    // Verify it's an item share
    if (share.resourceType !== 'item') {
      return { data: { getPublicItem: null }, error: 'Invalid resource type' };
    }

    const mapImages = (images) => (images || []).map(img => {
      if (typeof img === 'string') {
        return {
          id: img,
          path: img,
          signedUrl: img,
          versions: null
        };
      }
      const versions = img.versions || {};
      const signedUrl = img.signedUrl ||
        versions.preview?.signedUrl ||
        versions.original?.signedUrl ||
        versions.thumbnail?.signedUrl ||
        null;

      return {
        id: img.id || img.path || null,
        path: img.path || null,
        signedUrl: signedUrl,
        versions: img.versions || null
      };
    });

    // Transform to expected format
    const formattedItem = {
      id: resource.id,
      name: resource.name,
      description: resource.description,
      tags: resource.tags || [],
      images: mapImages(resource.images),
      customFields: resource.customFields || [],
      containedItems: (resource.containedItems || []).map(ci => ({
        ...ci,
        images: mapImages(ci.images)
      })),
      relatedItems: (resource.relatedItems || []).map(ri => ({
        ...ri,
        images: mapImages(ri.images)
      })),
      createdAt: resource.createdAt || new Date().toISOString(),
      updatedAt: resource.lastModified || resource.updatedAt || new Date().toISOString(),
      shareToken: shareToken
    };

    return {
      data: {
        getPublicItem: formattedItem
      }
    };

  } catch (error) {
    console.error('Error in getPublicItem:', error);
    return { data: { getPublicItem: null }, error: 'Failed to load item' };
  }
}

/**
 * Fetch public collection by share token
 */
export async function getPublicCollection(shareToken) {
  try {
    const result = await getShareData(shareToken);

    if (result.error) {
      return { data: { getPublicCollection: null }, error: result.message };
    }

    const { share, resource } = result;

    // Verify it's a collection share
    if (share.resourceType !== 'collection') {
      return { data: { getPublicCollection: null }, error: 'Invalid resource type' };
    }

    // Transform to expected format
    const formattedCollection = {
      id: resource.id,
      name: resource.name,
      description: resource.description,
      itemCount: resource.itemCount || 0,
      shareToken: shareToken
    };

    return {
      data: {
        getPublicCollection: formattedCollection
      }
    };

  } catch (error) {
    console.error('Error in getPublicCollection:', error);
    return { data: { getPublicCollection: null }, error: 'Failed to load collection' };
  }
}

export { apiRequest }