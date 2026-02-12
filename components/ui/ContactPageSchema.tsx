'use client';

import { useEffect } from 'react';

export function ContactPageSchema() {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": "https://rsquaredai.com/inquiry#webpage",
      "name": "Contact R² Ai  - Start Your AI Operational Journey",
      "description": "Reach out to R² Ai to build AI systems that run your business.",
      "url": "https://rsquaredai.com/inquiry",
      "mainEntity": {
        "@type": "Organization",
        "@id": "https://rsquaredai.com/#organization",
        "name": "R² Ai",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "sales",
          "url": "https://rsquaredai.com/inquiry",
          "availableLanguage": "English"
        }
      }
    };

    // Check if schema already exists
    const existingScript = document.querySelector('script[data-contact-schema]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-contact-schema', 'true');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[data-contact-schema]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return null;
}

