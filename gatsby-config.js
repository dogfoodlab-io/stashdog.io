module.exports = {
  siteMetadata: {
    title: "StashDog - Smart Home Inventory Management",
    description: "Never lose track of your stuff again. StashDog helps you organize, find, and manage everything you own with AI-powered inventory management.",
    siteUrl: "https://stashdog.app",
    author: "Dogfood Lab LLC",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
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
        host: "https://stashdog.app",
        sitemap: "https://stashdog.app/sitemap-index.xml",
        policy: [{ userAgent: "*", allow: "/" }]
      },
    },
  ],
}