require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
})

module.exports = {
  trailingSlash: 'always',
  siteMetadata: {
    title: "StashDog - Smart Home Inventory Management",
    description: "Never lose track of your stuff again. StashDog helps you organize, find, and manage everything you own with AI-powered inventory management.",
    siteUrl: "https://stashdog.io",
    author: "Dogfood Lab LLC",
  },
  developMiddleware: app => {
    const { createProxyMiddleware } = require('http-proxy-middleware')

    console.log('[PROXY] Storage proxy enabled: /storage -> http://localhost:54321')

    app.use(
      '/storage',
      createProxyMiddleware({
        target: 'http://127.0.0.1:54321',
        changeOrigin: true,
        secure: false,
        logLevel: 'silent',
        onError: (err, req, res) => {
          console.error('[PROXY] Error:', err.message, 'for', req.url)
        }
      })
    )
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        excludes: [
          "/public/collections/*",
          "/public/items/*",
        ],
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "StashDog - Smart Home Inventory",
        short_name: "StashDog",
        start_url: "/",
        background_color: "#1a1a1a",
        theme_color: "#fcd900",
        display: "minimal-ui",
        icon: "static/round-logo-goggles.png",
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://stashdog.io",
        sitemap: "https://stashdog.io/sitemap-index.xml",
        policy: [{ userAgent: "*", allow: "/" }]
      },
    },
  ],
}