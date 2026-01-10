import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

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
  title: "Causality Engine - Ad Spend Attribution",
  description:
    "Your spend keeps growing, but attribution stays blurry. Causality connects the dots, trims waste, and accelerates journey.",
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
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
