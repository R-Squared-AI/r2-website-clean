'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  name: string;
  url: string;
}

const breadcrumbMap: Record<string, BreadcrumbItem[]> = {
  '/': [
    { name: 'Home', url: 'https://rsquaredai.com/' },
  ],
  '/what-we-do': [
    { name: 'Home', url: 'https://rsquaredai.com/' },
    { name: 'What We Do', url: 'https://rsquaredai.com/what-we-do' },
  ],
  '/who-we-are': [
    { name: 'Home', url: 'https://rsquaredai.com/' },
    { name: 'Who We Are', url: 'https://rsquaredai.com/who-we-are' },
  ],
  '/inquiry': [
    { name: 'Home', url: 'https://rsquaredai.com/' },
    { name: 'Contact Us', url: 'https://rsquaredai.com/inquiry' },
  ],
};

export function BreadcrumbSchema() {
  const pathname = usePathname();

  useEffect(() => {
    const items = breadcrumbMap[pathname] || breadcrumbMap['/'];
    
    if (items.length <= 1) {
      // Don't add breadcrumbs for homepage
      return;
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url,
      })),
    };

    // Check if schema already exists
    const existingScript = document.querySelector('script[data-breadcrumb-schema]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-breadcrumb-schema', 'true');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[data-breadcrumb-schema]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [pathname]);

  return null;
}

