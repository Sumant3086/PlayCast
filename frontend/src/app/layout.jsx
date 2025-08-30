import { ToastContainer } from "react-toastify";

import { manrope } from "@/constants/Fonts";
import MainLayout from "@/components/layout/MainLayout";

import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';



const appName = "PlayCast - Watch and Discover Movies & TV Shows Online";
const appDesc = "PlayCast: Watch and download the latest movies and TV series from around the world in high quality. Enjoy a vast library of diverse genres, with subtitles and dubbed options. PlayCast offers the ultimate streaming experience for movie and series enthusiasts.";

export const metadata = {
  title: appName,
  description: appDesc,
  url: process.env.NEXT_PUBLIC_BASE_URL,
  openGraph: {
    title: appName,
    description: appDesc,
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/images/header-banner-white.jpg`],
    type: "website",
    locale: "en_US",
    siteName: appName
  },
  alternate: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-snippet': -1,
    }
  },
  icons: {
    icon: [
      { url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/favicon-16x16.png`, sizes: '16x16', type: 'image/png' },
      { url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
      // { url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/favicon-64x64.png`, sizes: '64x64', type: 'image/png' },
      // { url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/favicon-128x128.png`, sizes: '128x128', type: 'image/png' },
      // { url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/favicon-512x512.png`, sizes: '512x512', type: 'image/png' },
    ],
    shortcut: [`${process.env.NEXT_PUBLIC_BASE_URL}/images/android-chrome-192x192.png`],
    apple: [
      { url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' },
    ],
    android: [
      { url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/android-chrome-192x192.png`, sizes: '192x192', type: 'image/png' },
      { url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/android-chrome-256x256.png`, sizes: '256x256', type: 'image/png' },
    ],
    safari: [
      { url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/safari-pinned-tab.svg`, color: '#000000' },
    ],
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.className} custom-scrollbar custom-scrollbar-md bg-c-black-08`}>
        <MainLayout>
          {children}
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick={true}
          />
        </MainLayout>
      </body>
    </html>
  );
}
