const React = require("react")

const CPP_URLS = {
  GATSBY_APP_STORE_CPP_MOVING_BOXES_URL: process.env.GATSBY_APP_STORE_CPP_MOVING_BOXES_URL,
  GATSBY_APP_STORE_CPP_RESELLERS_URL: process.env.GATSBY_APP_STORE_CPP_RESELLERS_URL,
  GATSBY_APP_STORE_CPP_CONTRACTORS_URL: process.env.GATSBY_APP_STORE_CPP_CONTRACTORS_URL,
  GATSBY_APP_STORE_CPP_LANDLORDS_URL: process.env.GATSBY_APP_STORE_CPP_LANDLORDS_URL,
  GATSBY_APP_STORE_CPP_EVENT_BUSINESSES_URL: process.env.GATSBY_APP_STORE_CPP_EVENT_BUSINESSES_URL,
  GATSBY_APP_STORE_CPP_COLLECTORS_URL: process.env.GATSBY_APP_STORE_CPP_COLLECTORS_URL,
}

const configuredCppUrls = Object.entries(CPP_URLS).reduce((urls, [key, value]) => {
  if (value) urls[key] = value
  return urls
}, {})

exports.onRenderBody = ({ setHeadComponents }) => {
  const headComponents = []

  if (Object.keys(configuredCppUrls).length > 0) {
    headComponents.push(
      React.createElement("script", {
        key: "stashdog-cpp-urls",
        dangerouslySetInnerHTML: {
          __html: `window.__STASHDOG_CPP_URLS__ = ${JSON.stringify(configuredCppUrls)};`,
        },
      })
    )
  }

  setHeadComponents(headComponents)
}
