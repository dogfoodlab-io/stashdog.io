const React = require("react")

const GA_MEASUREMENT_ID = "G-3HMLS08VFZ"
const GOOGLE_ADS_ID = "AW-17868363896"

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    React.createElement("script", {
      key: "google-tag-src",
      async: true,
      src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
    }),
    React.createElement("script", {
      key: "google-tag-config",
      dangerouslySetInnerHTML: {
        __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
gtag('config', '${GOOGLE_ADS_ID}');`,
      },
    }),
  ])
}
