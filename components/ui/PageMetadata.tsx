'use client';

import { useEffect } from 'react';

interface PageMetadataProps {
  title: string;
  description: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export function PageMetadata({
  title,
  description,
  ogImage = '/og-image.png',
  canonicalUrl,
}: PageMetadataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rsquaredai.com';
  // Ensure OG image is always absolute URL
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage.startsWith('/') ? ogImage : '/' + ogImage}`;
  const fullCanonicalUrl = canonicalUrl || `${siteUrl}${typeof window !== 'undefined' ? window.location.pathname : ''}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Description
    updateMetaTag('description', description);

    // Open Graph
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:url', fullCanonicalUrl, 'property');
    updateMetaTag('og:image', fullOgImage, 'property');

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', fullOgImage);
    updateMetaTag('twitter:creator', '@rsquaredai');

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonicalUrl);
  }, [title, description, ogImage, fullCanonicalUrl, fullOgImage]);

  return null;
}

