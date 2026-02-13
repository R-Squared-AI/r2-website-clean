import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { ConditionalHeader } from "@/components/layout/ConditionalHeader";
import { r2Font, r2FontBold, robotoMono, inter } from "./fonts";
// Note: Lenis smooth scroll disabled - it breaks CSS position:sticky
// import { SmoothScrollProvider } from "@/components/ui/smooth-scroll-provider";

const siteUrl = "https://rsquaredai.com";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover', // Critical for iOS notch/Dynamic Island support
  themeColor: '#0A0A0A',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "R² AI | Production-Grade AI Agents for Sales Intelligence & Revenue Operations",
    template: "%s | R² AI",
  },
  description:
    "R² AI builds production-grade AI agents that automate CRM hygiene, surface pipeline opportunities, and deliver measurable revenue lift in 6-8 weeks. Built by operators who've carried quota. Not consultants.",
  keywords: [
    // Brand name variations
    "R² AI",
    "R squared AI",
    "R2 AI",
    "R² Solutions",
    "R2 Solutions",
    "R Squared AI",
    "rsquaredai",
    // Core services - high intent
    "AI agents",
    "AI agents for sales",
    "sales intelligence",
    "revenue operations",
    "CRM automation",
    "pipeline intelligence",
    "AI consulting",
    "enterprise AI",
    "production-grade AI",
    "agentic AI",
    // Platform integrations
    "Salesforce AI",
    "Salesforce AI agents",
    "HubSpot AI",
    "Microsoft Dynamics AI",
    // Industry-specific
    "private equity AI",
    "insurance AI",
    "manufacturing AI",
    "AI for sales teams",
    // Value propositions
    "sales enablement",
    "deal health scoring",
    "expansion revenue",
    "cross-sell intelligence",
    "AI sales automation",
    "revenue intelligence",
    "sales AI deployment",
  ],
  authors: [{ name: "R² AI, Inc.", url: siteUrl }],
  creator: "R² AI",
  publisher: "R² AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    other: [
      { rel: "mask-icon", url: "/favicon-light.svg", color: "#032CC8" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "R² AI",
    title: "R² AI | AI Agents That Carry Quota Alongside Your Reps",
    description:
      "Production-grade AI agents that listen to sales activity, update your CRM, and surface pipeline opportunities. Deployed in 6-8 weeks. Not slidewares — working systems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "R² AI - Sales Intelligence Orchestrated - Production-grade AI agents for revenue teams",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "R² AI | AI Agents That Carry Quota Alongside Your Reps",
    description:
      "Production-grade AI agents for sales intelligence. Deployed in 6-8 weeks. Built by operators, not consultants.",
    images: ["/og-image.png"],
    creator: "@rsquaredai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add these when you have them:
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
};

// Comprehensive JSON-LD Structured Data for SEO and AI Discoverability
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // Organization Schema with Founders
    {
      "@type": "Organization",
      "@id": "https://rsquaredai.com/#organization",
      "name": "R² AI",
      "legalName": "R Squared AI, Inc.",
      "alternateName": ["R Squared AI", "R2 AI", "R² Solutions", "R2 Solutions", "rsquaredai", "R-Squared AI"],
      "url": "https://rsquaredai.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://rsquaredai.com/r2-logo.png",
        "width": 512,
        "height": 512
      },
      "image": "https://rsquaredai.com/og-image.png",
      "description": "R² AI builds production-grade AI agents for sales intelligence and revenue operations. We deploy working systems in 6-8 weeks that automate CRM hygiene, surface pipeline opportunities, and deliver measurable revenue lift for private equity portfolio companies, insurance, and manufacturing firms.",
      "foundingDate": "2025",
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "minValue": 2,
        "maxValue": 10
      },
      "founder": [
        {
          "@type": "Person",
          "@id": "https://rsquaredai.com/#rich-rivara",
          "name": "Rich Rivara",
          "jobTitle": "Chief Executive Officer",
          "url": "https://www.linkedin.com/in/rich-rivara-388ba82/",
          "sameAs": ["https://www.linkedin.com/in/rich-rivara-388ba82/"],
          "knowsAbout": ["Revenue Operations", "Enterprise Sales", "Sales Leadership", "AI Agents", "Private Equity", "SaaS Scaling"],
          "description": "20+ years scaling revenue operations across enterprise tech. Former executive at Appirio (acquired for $500M) and BridgeNext. Built sales organizations from $0 to 8-figure ARR."
        },
        {
          "@type": "Person",
          "@id": "https://rsquaredai.com/#will-godfrey",
          "name": "Will Godfrey",
          "jobTitle": "Chief Technology Officer",
          "url": "https://www.linkedin.com/in/willgodfrey/",
          "sameAs": ["https://www.linkedin.com/in/willgodfrey/"],
          "knowsAbout": ["Enterprise Architecture", "System Design", "AI Engineering", "McKinsey", "Google Workspace", "Technical Integration"],
          "description": "Former McKinsey technologist who architected enterprise systems for Fortune 500 companies. Led Google Workspace rollout for City of Boston (30,000+ users)."
        },
        {
          "@type": "Person",
          "@id": "https://rsquaredai.com/#tyler-preisser",
          "name": "Tyler Preisser",
          "jobTitle": "Chief Product Officer",
          "url": "https://www.linkedin.com/in/tyler-preisser-803605233/",
          "sameAs": ["https://www.linkedin.com/in/tyler-preisser-803605233/"],
          "knowsAbout": ["AI Engineering", "Agentic AI", "Product Design", "Automation", "Back Office AI", "Enterprise Deployment"],
          "description": "AI-native product leader. Former VP of Operations who automated an entire back office using agentic AI — actual production systems processing thousands of workflows daily."
        }
      ],
      "sameAs": [
        "https://www.linkedin.com/company/r-squared-ai",
        "https://twitter.com/rsquaredai"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "sales",
        "url": "https://form.typeform.com/to/XPforiEB",
        "availableLanguage": "English"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "knowsAbout": [
        "Artificial Intelligence",
        "AI Agents",
        "Sales Intelligence",
        "Revenue Operations",
        "CRM Automation",
        "Pipeline Intelligence",
        "Salesforce Integration",
        "Enterprise AI Deployment",
        "Private Equity Portfolio Operations",
        "Insurance Technology",
        "Manufacturing AI",
        "Agentic AI",
        "Sales Enablement",
        "Deal Health Scoring",
        "Expansion Revenue",
        "Cross-Sell Intelligence"
      ],
      "slogan": "AI that carries quota alongside your reps.",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "R² AI Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Expansion & Cross-Sell Intelligence",
              "description": "AI agents analyze usage patterns, contract timelines, and engagement signals to surface 15-30% more pipeline from existing customers."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Pipeline Intelligence",
              "description": "Real-time deal health scoring powered by conversation analysis, engagement tracking, and win/loss patterns."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Sales Enablement & CRM Automation",
              "description": "Automatic call logging, contact updates, and activity capture. AI handles CRM hygiene so reps can sell."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Audit-Ready AI Compliance",
              "description": "Full audit trails on every AI action. Explainable decisions your compliance team can review. No black boxes."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Stack Enhancement & Integration",
              "description": "Intelligence layer on top of Salesforce, Dynamics, HubSpot, ERP, email, and conversation platforms. No rip-and-replace."
            }
          }
        ]
      }
    },
    // WebSite Schema
    {
      "@type": "WebSite",
      "@id": "https://rsquaredai.com/#website",
      "name": "R² AI",
      "alternateName": "R Squared AI",
      "url": "https://rsquaredai.com",
      "description": "Production-grade AI agents for sales intelligence and revenue operations.",
      "publisher": {
        "@id": "https://rsquaredai.com/#organization"
      },
      "inLanguage": "en-US"
    },
    // WebPage Schema
    {
      "@type": "WebPage",
      "@id": "https://rsquaredai.com/#webpage",
      "url": "https://rsquaredai.com",
      "name": "R² AI | Sales Intelligence Orchestrated",
      "description": "Production-grade AI agents that listen to your sales activity, update your CRM, and surface pipeline opportunities and risk.",
      "isPartOf": {
        "@id": "https://rsquaredai.com/#website"
      },
      "about": {
        "@id": "https://rsquaredai.com/#organization"
      },
      "datePublished": "2025-01-01",
      "dateModified": "2026-02-09",
      "inLanguage": "en-US"
    },
    // FAQPage Schema
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What does R² AI do?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "R² AI builds production-grade AI agents for sales intelligence and revenue operations. Our agents connect Salesforce, ERP, email, and conversation data into a single intelligence layer, automating CRM hygiene, surfacing pipeline opportunities, and delivering measurable revenue lift in 6-8 weeks."
          }
        },
        {
          "@type": "Question",
          "name": "How is R² AI different from McKinsey or BCG?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We're builders, not advisors. Our founding team has carried quota, architected enterprise systems, and deployed AI agents running production workloads. We deliver working systems, not slideware. Every engagement produces deployed, production-grade AI agents — not PowerPoint recommendations."
          }
        },
        {
          "@type": "Question",
          "name": "How long does it take to deploy R² AI agents?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "From discovery to deployed agents in 6-8 weeks. We follow a rapid deployment methodology: Discovery and Design, then Build and Deploy, then Continuous Optimization with agents that learn from usage patterns."
          }
        },
        {
          "@type": "Question",
          "name": "What industries does R² AI serve?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "R² AI serves three primary industries: Private equity portfolio companies needing fast operational wins, insurance companies looking to enable producers, and manufacturing firms with long cycles and complex product tracking needs."
          }
        },
        {
          "@type": "Question",
          "name": "What CRM systems does R² AI integrate with?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "R² AI integrates with Salesforce, Microsoft Dynamics, and HubSpot, along with ERP systems, email platforms, and conversation intelligence tools. We layer intelligence on top of your existing stack — no migrations or rip-and-replace required."
          }
        },
        {
          "@type": "Question",
          "name": "Is R² AI enterprise-grade and audit-ready?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. R² AI is regulatory ready with full audit trails on every AI decision. Every AI action is explainable and reviewable by compliance teams. No black boxes. Your legal and procurement teams will have zero objections."
          }
        }
      ]
    }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Character encoding and viewport */}
        <meta charSet="UTF-8" />
        <meta httpEquiv="content-language" content="en-US" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#0A0A0A" />

        {/* Preload critical fonts */}
        <link rel="preload" href="/R2Font.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/R2FontBold.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />

        {/* Apple-specific meta tags for iMessage/Safari link previews */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="R² AI" />

        {/* Additional Open Graph tags for LinkedIn optimization */}
        <meta property="og:site_name" content="R² AI" />
        <meta property="og:locale" content="en_US" />
        <meta name="author" content="R² AI, Inc." />

        {/* Favicon - Adapts to light/dark mode */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-light.svg" type="image/svg+xml" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon-dark.svg" type="image/svg+xml" media="(prefers-color-scheme: dark)" />

        {/* Performance hints - Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//form.typeform.com" />
        <link rel="dns-prefetch" href="//www.linkedin.com" />
        <link rel="dns-prefetch" href="//subscribe-forms.beehiiv.com" />

        {/* Preload critical assets */}
        <link rel="preload" as="image" href="/og-image.png" />
        <link rel="preload" as="image" href="/r2-logo.webp" type="image/webp" />

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${r2Font.variable} ${r2FontBold.variable} ${robotoMono.variable} ${inter.variable}`}
      >
        {/* Loading splash — raw HTML, renders on first paint before any JS */}
        <div
          id="splash"
          dangerouslySetInnerHTML={{ __html: `
            <style>
              #splash{position:fixed;inset:0;z-index:99999;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:clip-path .5s cubic-bezier(.77,0,.175,1)}
              #splash.exit{clip-path:circle(0% at 50% 50%);pointer-events:none}
              #splash-logo{height:clamp(70px,16vw,120px);width:auto}
              #splash-ring{margin-top:24px;width:32px;height:32px;animation:splashSpin .9s linear infinite}
              @keyframes splashSpin{to{transform:rotate(360deg)}}
              @keyframes splashDash{0%{stroke-dasharray:10 90;stroke-dashoffset:0}50%{stroke-dasharray:70 30;stroke-dashoffset:-30}100%{stroke-dasharray:10 90;stroke-dashoffset:-94}}
            </style>
            <img id="splash-logo" src="data:image/webp;base64,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" alt="R²" />
            <svg id="splash-ring" width="32" height="32" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(3,44,200,0.1)" stroke-width="2.5"/>
              <circle cx="18" cy="18" r="15" fill="none" stroke="#032CC8" stroke-width="2.5" stroke-linecap="round" style="animation:splashDash 1.4s ease-in-out infinite;transform-origin:center"/>
            </svg>
            <script>
              (function(){
                var s=document.getElementById('splash');
                function exit(){s.classList.add('exit');setTimeout(function(){s.remove()},600)}
                var t=setTimeout(exit,1200);
                function tryExit(){if(document.fonts&&document.fonts.ready){document.fonts.ready.then(function(){clearTimeout(t);exit()})}}
                if(document.readyState==='complete'){tryExit()}else{window.addEventListener('load',tryExit)}
              })();
            </script>
          `}}
        />

        {/* Beehiiv Attribution Tracking */}
        <Script
          src="https://subscribe-forms.beehiiv.com/attribution.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://subscribe-forms.beehiiv.com/embed.js"
          strategy="afterInteractive"
        />

        {/* UTM Attribution Tracking */}
        <Script id="utm-tracking" strategy="afterInteractive">
          {`
            (function() {
              function initUTMTracking() {
                var urlParams = new URLSearchParams(window.location.search);
                var utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'ref', 'gclid', 'fbclid'];
                var trackingData = {};
                var hasTracking = false;

                utmParams.forEach(function(param) {
                  var value = urlParams.get(param);
                  if (value) {
                    trackingData[param] = value;
                    hasTracking = true;
                  }
                });

                if (hasTracking) {
                  var existingData = JSON.parse(localStorage.getItem('r2_attribution') || '{}');
                  var mergedData = Object.assign({}, existingData, trackingData, { timestamp: Date.now() });
                  localStorage.setItem('r2_attribution', JSON.stringify(mergedData));
                }

                if (!localStorage.getItem('r2_landing_page')) {
                  localStorage.setItem('r2_landing_page', window.location.href);
                  localStorage.setItem('r2_landing_timestamp', Date.now().toString());
                }

                if (document.referrer && !localStorage.getItem('r2_referrer')) {
                  localStorage.setItem('r2_referrer', document.referrer);
                }
              }

              window.getAttributionData = function() {
                return {
                  utm: JSON.parse(localStorage.getItem('r2_attribution') || '{}'),
                  landingPage: localStorage.getItem('r2_landing_page'),
                  landingTimestamp: localStorage.getItem('r2_landing_timestamp'),
                  referrer: localStorage.getItem('r2_referrer'),
                  currentPage: window.location.href
                };
              };

              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initUTMTracking);
              } else {
                initUTMTracking();
              }
            })();
          `}
        </Script>

        <ConditionalHeader />
        {/* Children rendered directly in body for sticky positioning to work */}
        {children}
      </body>
    </html>
  );
}
