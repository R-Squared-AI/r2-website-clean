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
