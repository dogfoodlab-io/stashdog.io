// API Client for StashDog

const API_BASE_URL = process.env.GATSBY_API_BASE_URL || 'https://gmchczeyburroiyzefie.supabase.co/functions/v1'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtY2hjemV5YnVycm9peXplZmllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyOTM1NjIsImV4cCI6MjA1Mzg2OTU2Mn0.tW4Nx5qpnQh_VszEe9XP8XmTAGu-GHFhhw7e3kCeWFc'

/**
 * Generic API request handler
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
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
 * @param {Object} waitlistEntry - The waitlist entry data
 * @param {string} waitlistEntry.email - Required email address
 * @param {string} [waitlistEntry.name] - Optional name
 * @param {string} [waitlistEntry.phone] - Optional phone number
 * @param {string} [waitlistEntry.country] - Optional country
 * @param {string} [waitlistEntry.source] - Optional source identifier
 * @param {number} [waitlistEntry.priority] - Optional priority number
 * @param {any} [waitlistEntry.form_data] - Optional form data
 * @param {any} [waitlistEntry.metadata] - Optional metadata
 * @returns {Promise<Object>} Response from the API
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

// Export the generic API request function for custom use cases
export { apiRequest } 