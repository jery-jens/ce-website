import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import PageTransition from "./components/PageTransition";
import Header from "./components/Header";

const interDisplay = localFont({
  src: [
    {
      path: "../public/fonts/InterDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/InterDisplay-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-inter-display",
});

const reckless = localFont({
  src: [
    {
      path: "../public/fonts/RecklessStandardS-TRIAL-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-reckless",
});

export const metadata: Metadata = {
  title: {
    default: "Causality Engine — See what actually drives revenue",
    template: "%s",
  },
  description:
    "Go beyond correlation. Causality Engine reveals the true incremental impact of your marketing so you can optimize what actually works.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interDisplay.variable} ${reckless.variable} antialiased`}
      >
        <SmoothScroll>
          <Header />
          <PageTransition>{children}</PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
