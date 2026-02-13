'use client';

import { useState, useEffect } from 'react';

export function LoadingScreen() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isGone, setIsGone] = useState(false);

  useEffect(() => {
    // Wait for document to be fully ready
    const checkReady = () => {
      // Check if document fonts are loaded
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          // Small minimum display time so the animation feels intentional
          setTimeout(() => {
            setIsLoaded(true);
            // Start exit animation
            setTimeout(() => setIsExiting(true), 50);
            // Remove from DOM after exit animation completes
            setTimeout(() => setIsGone(true), 1000);
          }, 800); // minimum 800ms display
        });
      } else {
        // Fallback for browsers without Font Loading API
        setTimeout(() => {
          setIsLoaded(true);
          setTimeout(() => setIsExiting(true), 50);
          setTimeout(() => setIsGone(true), 1000);
        }, 1200);
      }
    };

    if (document.readyState === 'complete') {
      checkReady();
    } else {
      window.addEventListener('load', checkReady);
      return () => window.removeEventListener('load', checkReady);
    }
  }, []);

  if (isGone) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#0A0A0F',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(1.05)' : 'scale(1)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        pointerEvents: isExiting ? 'none' : 'auto',
      }}
    >
      {/* Logo with fade-in + scale animation */}
      <img
        src="/r2-logo.webp"
        alt="R² Solutions"
        style={{
          height: 'clamp(60px, 12vw, 100px)',
          width: 'auto',
          animation: 'logoFadeIn 0.6s ease-out both',
        }}
      />

      {/* Circular spinner below logo */}
      <div
        style={{
          marginTop: 32,
          width: 32,
          height: 32,
          border: '2px solid rgba(255, 255, 255, 0.1)',
          borderTopColor: '#032CC8',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite, logoFadeIn 0.6s ease-out 0.3s both',
        }}
      />

      {/* Inline styles for animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes logoFadeIn {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}
