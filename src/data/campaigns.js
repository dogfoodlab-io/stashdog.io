export const DEFAULT_APP_STORE_URL = "https://apps.apple.com/us/app/stashdog/id6743368759"
const DEFAULT_SITE_CAMPAIGN_ID = "sitewide_downloads"

const buildTimeCppUrls = {
  GATSBY_APP_STORE_CPP_MOVING_BOXES_URL: process.env.GATSBY_APP_STORE_CPP_MOVING_BOXES_URL,
  GATSBY_APP_STORE_CPP_RESELLERS_URL: process.env.GATSBY_APP_STORE_CPP_RESELLERS_URL,
  GATSBY_APP_STORE_CPP_CONTRACTORS_URL: process.env.GATSBY_APP_STORE_CPP_CONTRACTORS_URL,
  GATSBY_APP_STORE_CPP_LANDLORDS_URL: process.env.GATSBY_APP_STORE_CPP_LANDLORDS_URL,
  GATSBY_APP_STORE_CPP_EVENT_BUSINESSES_URL: process.env.GATSBY_APP_STORE_CPP_EVENT_BUSINESSES_URL,
  GATSBY_APP_STORE_CPP_COLLECTORS_URL: process.env.GATSBY_APP_STORE_CPP_COLLECTORS_URL,
}

export const appendUtmParams = (baseUrl, utmParams) => {
  const query = new URLSearchParams(utmParams).toString()
  const separator = baseUrl.includes("?") ? "&" : "?"

  return `${baseUrl}${separator}${query}`
}

const campaignUtm = (campaignId, medium = "owned_web") => ({
  utm_source: "stashdog.io",
  utm_medium: medium,
  utm_campaign: campaignId,
})

const getRuntimeCppUrl = (envVarName, fallbackUrl = DEFAULT_APP_STORE_URL) => {
  if (typeof window !== "undefined" && window.__STASHDOG_CPP_URLS__?.[envVarName]) {
    return window.__STASHDOG_CPP_URLS__[envVarName]
  }

  return buildTimeCppUrls[envVarName] || fallbackUrl
}

const normalizePathname = (pathname = "") => {
  if (!pathname) return "/"

  let normalizedPathname = pathname

  try {
    normalizedPathname = new URL(pathname, "https://stashdog.io").pathname
  } catch (error) {
    normalizedPathname = pathname.split("?")[0].split("#")[0]
  }

  if (!normalizedPathname.startsWith("/")) {
    normalizedPathname = `/${normalizedPathname}`
  }

  return normalizedPathname.replace(/\/+$/, "") || "/"
}

const getFromParamPath = (pathname = "") => {
  if (!pathname) return ""

  try {
    return new URL(pathname, "https://stashdog.io").searchParams.get("from") || ""
  } catch (error) {
    return ""
  }
}

const getPathCampaign = (pathname) => {
  const normalizedPathname = normalizePathname(pathname)
  const forPageMatch = normalizedPathname.match(/^\/for\/([^/]+)/)

  if (forPageMatch) {
    return getIcpCampaign(forPageMatch[1])
  }

  if (normalizedPathname === normalizePathname(movingBoxesCampaign.landingPath)) {
    return movingBoxesCampaign
  }

  const blogMatch = normalizedPathname.match(/^\/blog\/([^/]+)/)

  if (blogMatch && isMovingBoxesCampaignBlogPost(blogMatch[1])) {
    return movingBoxesCampaign
  }

  return null
}

const getStoredDownloadOrigin = () => {
  if (typeof window === "undefined") return ""

  try {
    return window.sessionStorage.getItem("stashdog_download_origin") || ""
  } catch (error) {
    return ""
  }
}

const getOriginCandidatePaths = ({ pathname, referrer } = {}) => {
  const currentPathname = normalizePathname(pathname)
  const candidatePaths = [currentPathname]

  if (currentPathname === "/download") {
    const explicitOrigin = getFromParamPath(pathname)
    if (explicitOrigin) candidatePaths.push(explicitOrigin)
    const storedOrigin = getStoredDownloadOrigin()
    if (storedOrigin) candidatePaths.push(storedOrigin)
    if (referrer) candidatePaths.push(referrer)
  }

  return candidatePaths
}

export const movingBoxesCampaign = {
  id: "moving_boxes_qr_storage",
  appStoreCppEnvVar: "GATSBY_APP_STORE_CPP_MOVING_BOXES_URL",
  appStoreUrl: "https://apps.apple.com/us/app/stashdog-home-inventory/id6743368759?ppid=bd10115d-a667-4c84-a869-d2272323028e",
  landingPath: "/searchable-moving-boxes/",
  blogSlugs: [
    "search-first-storage-qr-code-box-organization",
    "smart-moving-organize-lazily-find-instantly",
  ],
  utm: {
    ...campaignUtm("moving_boxes_qr_storage"),
  },
}

export const getMovingBoxesAppStoreUrl = (utmContent) =>
  appendUtmParams(getRuntimeCppUrl(movingBoxesCampaign.appStoreCppEnvVar, movingBoxesCampaign.appStoreUrl), {
    ...movingBoxesCampaign.utm,
    utm_content: utmContent,
  })

export const isMovingBoxesCampaignBlogPost = (slug) =>
  movingBoxesCampaign.blogSlugs.includes(slug)

export const topIcpCampaigns = [
  {
    slug: "resellers",
    campaignId: "icp_resellers_death_pile_inventory",
    landingPath: "/for/resellers/",
    appStoreCppEnvVar: "GATSBY_APP_STORE_CPP_RESELLERS_URL",
    appStoreUrl: DEFAULT_APP_STORE_URL,
    appStoreConnectName: "StashDog - Resellers",
    metaCampaignName: "META_Traffic_Resellers_CPP_2026Q2",
    audienceHook: "Your death pile is cash. Find, list, and sell what is already hiding in bins.",
    adCopy: {
      primaryText:
        "Bought it, listed it, stored it, sold it, then lost it in a tote? StashDog turns reseller bins, shelves, and sourcing piles into searchable inventory.",
      headline: "Turn your death pile into cash",
      description: "Track bins, listings, locations, and sold items without another fragile spreadsheet.",
      cta: "Download",
    },
    meta: {
      objective: "OUTCOME_TRAFFIC",
      status: "PAUSED",
      dailyBudgetCents: 2000,
      billingEvent: "IMPRESSIONS",
      optimizationGoal: "LINK_CLICKS",
      countries: ["US"],
    },
    utm: campaignUtm("icp_resellers_death_pile_inventory"),
  },
  {
    slug: "contractors",
    campaignId: "icp_contractors_tool_parts_inventory",
    landingPath: "/for/contractors/",
    appStoreCppEnvVar: "GATSBY_APP_STORE_CPP_CONTRACTORS_URL",
    appStoreUrl: DEFAULT_APP_STORE_URL,
    appStoreConnectName: "StashDog - Contractors",
    metaCampaignName: "META_Traffic_Contractors_CPP_2026Q2",
    audienceHook: "Stop rebuying tools and parts you already own.",
    adCopy: {
      primaryText:
        "The part you need is probably already in a van, job box, shelf, or garage. StashDog helps small crews search before they buy.",
      headline: "Stop buying the same part twice",
      description: "Track tools, supplies, vans, bins, and job materials from your phone.",
      cta: "Download",
    },
    meta: {
      objective: "OUTCOME_TRAFFIC",
      status: "PAUSED",
      dailyBudgetCents: 2000,
      billingEvent: "IMPRESSIONS",
      optimizationGoal: "LINK_CLICKS",
      countries: ["US"],
    },
    utm: campaignUtm("icp_contractors_tool_parts_inventory"),
  },
  {
    slug: "landlords",
    campaignId: "icp_landlords_property_inventory",
    landingPath: "/for/landlords/",
    appStoreCppEnvVar: "GATSBY_APP_STORE_CPP_LANDLORDS_URL",
    appStoreUrl: DEFAULT_APP_STORE_URL,
    appStoreConnectName: "StashDog - Landlords",
    metaCampaignName: "META_Traffic_Landlords_CPP_2026Q2",
    audienceHook: "Know what is in every property, closet, garage, and storage unit.",
    adCopy: {
      primaryText:
        "Appliances, paint, keys, fixtures, warranties, and spare parts get expensive when nobody knows where they live. Make each property searchable.",
      headline: "Inventory every rental property",
      description: "Track assets, supplies, keys, warranties, and maintenance storage.",
      cta: "Download",
    },
    meta: {
      objective: "OUTCOME_TRAFFIC",
      status: "PAUSED",
      dailyBudgetCents: 2000,
      billingEvent: "IMPRESSIONS",
      optimizationGoal: "LINK_CLICKS",
      countries: ["US"],
    },
    utm: campaignUtm("icp_landlords_property_inventory"),
  },
  {
    slug: "event-businesses",
    campaignId: "icp_event_businesses_gear_inventory",
    landingPath: "/for/event-businesses/",
    appStoreCppEnvVar: "GATSBY_APP_STORE_CPP_EVENT_BUSINESSES_URL",
    appStoreUrl: DEFAULT_APP_STORE_URL,
    appStoreConnectName: "StashDog - Event Businesses",
    metaCampaignName: "META_Traffic_EventBusinesses_CPP_2026Q2",
    audienceHook: "Never show up missing the cable, case, linen, or prop.",
    adCopy: {
      primaryText:
        "Event gear moves from storage to vehicles to venues and back again. StashDog helps you scan, search, pack, and recover reusable gear.",
      headline: "Know what is packed before event day",
      description: "Track decor, AV, cases, linens, props, and return checks.",
      cta: "Download",
    },
    meta: {
      objective: "OUTCOME_TRAFFIC",
      status: "PAUSED",
      dailyBudgetCents: 2000,
      billingEvent: "IMPRESSIONS",
      optimizationGoal: "LINK_CLICKS",
      countries: ["US"],
    },
    utm: campaignUtm("icp_event_businesses_gear_inventory"),
  },
  {
    slug: "collectors",
    campaignId: "icp_collectors_collection_vault",
    landingPath: "/for/collectors/",
    appStoreCppEnvVar: "GATSBY_APP_STORE_CPP_COLLECTORS_URL",
    appStoreUrl: DEFAULT_APP_STORE_URL,
    appStoreConnectName: "StashDog - Collectors",
    metaCampaignName: "META_Traffic_Collectors_CPP_2026Q2",
    audienceHook: "Catalog your collection before you need to prove what it is worth.",
    adCopy: {
      primaryText:
        "Your collection is worth more than a memory game. Keep photos, condition, receipts, authenticity notes, and storage locations in one searchable place.",
      headline: "Protect the collection you built",
      description: "Catalog valuables for insurance, resale, estate planning, and duplicate prevention.",
      cta: "Download",
    },
    meta: {
      objective: "OUTCOME_TRAFFIC",
      status: "PAUSED",
      dailyBudgetCents: 2000,
      billingEvent: "IMPRESSIONS",
      optimizationGoal: "LINK_CLICKS",
      countries: ["US"],
    },
    utm: campaignUtm("icp_collectors_collection_vault"),
  },
]

export const topIcpCampaignsBySlug = topIcpCampaigns.reduce((campaigns, campaign) => {
  campaigns[campaign.slug] = campaign
  return campaigns
}, {})

export const getIcpCampaign = (slug) => topIcpCampaignsBySlug[slug]

export const getIcpLandingUrl = (slug, source = "meta") => {
  const campaign = getIcpCampaign(slug)
  if (!campaign) return null

  const medium = source === "meta" ? "paid_social" : campaign.utm.utm_medium
  return appendUtmParams(`https://stashdog.io${campaign.landingPath}`, {
    ...campaign.utm,
    utm_source: source,
    utm_medium: medium,
  })
}

export const getIcpAppStoreUrl = (slug, utmContent = "landing_page_app_store_badge") => {
  const campaign = getIcpCampaign(slug)
  if (!campaign) return DEFAULT_APP_STORE_URL

  return appendUtmParams(getRuntimeCppUrl(campaign.appStoreCppEnvVar, campaign.appStoreUrl), {
    ...campaign.utm,
    utm_content: utmContent,
  })
}

export const getCampaignForOriginPath = (pathname) => getPathCampaign(pathname)

export const getAppStoreUrlForOrigin = ({
  pathname,
  referrer,
  utmContent = "app_store_badge",
} = {}) => {
  const candidatePaths = getOriginCandidatePaths({ pathname, referrer })

  for (const candidatePath of candidatePaths) {
    const campaign = getPathCampaign(candidatePath)

    if (campaign?.slug) {
      return getIcpAppStoreUrl(campaign.slug, utmContent)
    }

    if (campaign?.id === movingBoxesCampaign.id) {
      return getMovingBoxesAppStoreUrl(utmContent)
    }
  }

  return appendUtmParams(DEFAULT_APP_STORE_URL, {
    ...campaignUtm(DEFAULT_SITE_CAMPAIGN_ID),
    utm_content: utmContent,
  })
}

export const getTopIcpMetaCampaignDrafts = ({ pixelConfigured = Boolean(process.env.GATSBY_META_PIXEL_ID) } = {}) =>
  topIcpCampaigns.map((campaign) => ({
    campaign: {
      name: campaign.metaCampaignName,
      objective: campaign.meta.objective,
      status: campaign.meta.status,
    },
    adSet: {
      name: `${campaign.metaCampaignName}_US_20Day`,
      status: campaign.meta.status,
      daily_budget: campaign.meta.dailyBudgetCents,
      billing_event: campaign.meta.billingEvent,
      optimization_goal: pixelConfigured ? "LANDING_PAGE_VIEWS" : campaign.meta.optimizationGoal,
      targeting: {
        geo_locations: {
          countries: campaign.meta.countries,
        },
      },
    },
    ad: {
      name: `${campaign.metaCampaignName}_Static_01`,
      status: campaign.meta.status,
      creative: {
        primary_text: campaign.adCopy.primaryText,
        headline: campaign.adCopy.headline,
        description: campaign.adCopy.description,
        call_to_action: campaign.adCopy.cta,
        image_path: `/images/for/${campaign.slug}.png`,
        link_url: getIcpLandingUrl(campaign.slug, "meta"),
      },
    },
  }))
