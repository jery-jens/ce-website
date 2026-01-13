import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import PageTransition from "./components/PageTransition";
import Header from "./components/Header";
import CookieBanner from "./components/CookieBanner";

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
  metadataBase: new URL("https://causalityengine.ai"),
  openGraph: {
    title: "Causality Engine — See what actually drives revenue",
    description:
      "Go beyond correlation. Causality Engine reveals the true incremental impact of your marketing so you can optimize what actually works.",
    url: "https://causalityengine.ai",
    siteName: "Causality Engine",
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Causality Engine - Marketing Attribution Software",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Causality Engine — See what actually drives revenue",
    description:
      "Go beyond correlation. Causality Engine reveals the true incremental impact of your marketing so you can optimize what actually works.",
    images: ["/opengraph.png"],
  },
};

// Schema.org JSON-LD
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Causality Engine",
  "alternateName": "Causality",
  "url": "https://causalityengine.ai",
  "logo": "https://causalityengine.ai/logo.png",
  "description": "Marketing attribution software for Shopify e-commerce brands, specializing in beauty and fashion retailers in the Netherlands.",
  "foundingDate": "2023-12-20",
  "founder": {
    "@type": "Person",
    "name": "Joris van Huët"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "NL"
  },
  "sameAs": [
    "https://www.wikidata.org/wiki/Q136681891",
    "https://www.linkedin.com/company/causalityengine/",
    "https://www.facebook.com/causalityengine"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Support",
    "email": "support@causalityengine.ai"
  }
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Causality Engine",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "Marketing Attribution Software",
  "operatingSystem": "Web",
  "description": "AI-powered marketing attribution platform that reveals true customer journey causality using causal inference and Shapley values.",
  "url": "https://causalityengine.ai",
  "offers": [
    {
      "@type": "Offer",
      "name": "Starter Plan",
      "price": "99",
      "priceCurrency": "EUR",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "99",
        "priceCurrency": "EUR",
        "billingDuration": "One-time",
        "referenceQuantity": {
          "@type": "QuantitativeValue",
          "value": "1"
        }
      }
    },
    {
      "@type": "Offer",
      "name": "Pro Plan",
      "price": "299",
      "priceCurrency": "EUR",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "299",
        "priceCurrency": "EUR",
        "unitCode": "MON",
        "referenceQuantity": {
          "@type": "QuantitativeValue",
          "value": "1",
          "unitCode": "MON"
        }
      }
    },
    {
      "@type": "Offer",
      "name": "Growth Plan",
      "price": "599",
      "priceCurrency": "EUR",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "599",
        "priceCurrency": "EUR",
        "unitCode": "MON",
        "referenceQuantity": {
          "@type": "QuantitativeValue",
          "value": "1",
          "unitCode": "MON"
        }
      }
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "12",
    "bestRating": "5",
    "worstRating": "1"
  },
  "featureList": [
    "Multi-touch attribution modeling",
    "Intelligence-adjusted attribution",
    "Customer journey mapping",
    "ROI analysis and optimization",
    "Shopify integration",
    "Google Analytics 4 integration",
    "Real-time alerts and leak detection",
    "Optimization queue with ranked actions",
    "Dashboard embeds and CSV export",
    "Cross-channel amplification reporting"
  ],
  "screenshot": "https://causalityengine.ai/dashboard.png",
  "softwareVersion": "1.0",
  "releaseNotes": "Initial release with full attribution capabilities",
  "author": {
    "@type": "Organization",
    "name": "Causality Engine",
    "url": "https://causalityengine.ai"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
        />

        {/* Consent defaults */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() { dataLayer.push(arguments); }
              gtag("consent", "default", {
                ad_personalization: "denied",
                ad_storage: "denied",
                ad_user_data: "denied",
                analytics_storage: "denied",
                functionality_storage: "denied",
                personalization_storage: "denied",
                security_storage: "granted",
                wait_for_update: 500,
              });
              gtag("set", "ads_data_redaction", true);
              gtag("set", "url_passthrough", false);
            `,
          }}
        />
      </head>
      <body
        className={`${interDisplay.variable} ${reckless.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://load.ss.causalityengine.ai/ns.html?id=GTM-NXQP84D9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <SmoothScroll>
          <Header />
          <PageTransition>{children}</PageTransition>
        </SmoothScroll>
        <CookieBanner />

        {/* Klaviyo */}
        <Script
          src="https://static.klaviyo.com/onsite/js/XdiBYC/klaviyo.js?company_id=XdiBYC"
          strategy="afterInteractive"
        />
        <Script
          id="klaviyo-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(){if(!window.klaviyo){window._klOnsite=window._klOnsite||[];try{window.klaviyo=new Proxy({},{get:function(n,i){return"push"===i?function(){var n;(n=window._klOnsite).push.apply(n,arguments)}:function(){for(var n=arguments.length,o=new Array(n),w=0;w<n;w++)o[w]=arguments[w];var t="function"==typeof o[o.length-1]?o.pop():void 0,e=new Promise((function(n){window._klOnsite.push([i].concat(o,[function(i){t&&t(i),n(i)}]))}));return e}}})}catch(n){window.klaviyo=window.klaviyo||[],window.klaviyo.push=function(){var n;(n=window._klOnsite).push.apply(n,arguments)}}}}();`,
          }}
        />

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(){"use strict";function l(e){for(var t=e,r=0,n=document.cookie.split(";");r<n.length;r++){var o=n[r].split("=");if(o[0].trim()===t)return o[1]}}function s(e){return localStorage.getItem(e)}function u(e){return window[e]}function A(e,t){e=document.querySelector(e);return t?null==e?void 0:e.getAttribute(t):null==e?void 0:e.textContent}var e=window,t=document,r="script",n="dataLayer",o="https://ss.causalityengine.ai",a="https://load.ss.causalityengine.ai",i="amaygmigbn",c="6ox4yrt1=BwZaLjkqVC82MzdRWSNARxhfVUdcQR0PUwEGHB4GFQgaGwIHCg4XBEADDg%3D%3D",g="stapeUserId",v="",E="",d=!1;try{var d=!!g&&(m=navigator.userAgent,!!(m=new RegExp("Version/([0-9._]+)(.Mobile)?.*Safari.").exec(m)))&&16.4<=parseFloat(m[1]),f="stapeUserId"===g,I=d&&!f?function(e,t,r){void 0===t&&(t="");var n={cookie:l,localStorage:s,jsVariable:u,cssSelector:A},t=Array.isArray(t)?t:[t];if(e&&n[e])for(var o=n[e],a=0,i=t;a<i.length;a++){var c=i[a],c=r?o(c,r):o(c);if(c)return c}else console.warn("invalid uid source",e)}(g,v,E):void 0;d=d&&(!!I||f)}catch(e){console.error(e)}var m=e,g=(m[n]=m[n]||[],m[n].push({"gtm.start":(new Date).getTime(),event:"gtm.js"}),t.getElementsByTagName(r)[0]),v=I?"&bi="+encodeURIComponent(I):"",E=t.createElement(r),f=(d&&(i=8<i.length?i.replace(/([a-z]{8}$)/,"kp$1"):"kp"+i),!d&&a?a:o);E.async=!0,E.src=f+"/"+i+".js?"+c+v,null!=(e=g.parentNode)&&e.insertBefore(E,g)}();`,
          }}
        />

        {/* Leadinfo tracking */}
        <Script
          id="leadinfo-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(l,e,a,d,i,n,f,o){if(!l[i]){l.GlobalLeadinfoNamespace=l.GlobalLeadinfoNamespace||[];l.GlobalLeadinfoNamespace.push(i);l[i]=function(){(l[i].q=l[i].q||[]).push(arguments)};l[i].t=l[i].t||n;l[i].q=l[i].q||[];o=e.createElement(a);f=e.getElementsByTagName(a)[0];o.async=1;o.src=d;f.parentNode.insertBefore(o,f);}}(window,document,'script','https://cdn.leadinfo.net/ping.js','leadinfo','LI-6950F05FC1B81'));`,
          }}
        />

        {/* Instantly tracking */}
        <Script
          id="vtag-ai-js"
          src="https://r2.leadsy.ai/tag.js"
          data-pid="7fkUIlGo1T9ppmFv"
          data-version="062024"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
