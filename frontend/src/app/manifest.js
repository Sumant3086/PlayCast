export default function manifest() {
  return {
    name: 'PlayCast',
    short_name: "PlayCast",
    description: "Watch and download the latest movies and TV series in high quality with PlayCast.",
    start_url: '/',
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    display: 'standalone',
    background_color: '#141414',
    theme_color: '#0F0F0F',
    icons: [
      {
        "src": "/images/android-chrome-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "/images/android-chrome-256x256.png",
        "sizes": "256x256",
        "type": "image/png"
      },
      {
        "src": "/images/favicon-16x16.png",
        "sizes": "16x16",
        "type": "image/png"
      },
      {
        "src": "/images/favicon-32x32.png",
        "sizes": "32x32",
        "type": "image/png"
      },
      {
        "src": "/images/apple-touch-icon.png",
        "sizes": "180x180",
        "type": "image/png"
      },
    ],
    shortcuts: [
      {
        name: "Watch Latest Movies",
        url: "/movies",
        icons: [{ src: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" }]
      },
      {
        name: "Browse TV Series",
        url: "/series",
        icons: [{ src: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" }]
      }
    ],
    related_applications: [],
    prefer_related_applications: false
  }
}