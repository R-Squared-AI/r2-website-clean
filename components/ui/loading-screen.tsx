'use client';

import { useState, useEffect } from 'react';

export function LoadingScreen() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isGone, setIsGone] = useState(false);

  useEffect(() => {
    const triggerExit = () => {
      setIsLoaded(true);
      // Brief pause to let the "loaded" state settle, then start exit
      setTimeout(() => setIsExiting(true), 100);
      // Remove from DOM after exit animation
      setTimeout(() => setIsGone(true), 1200);
    };

    const checkReady = () => {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          // Minimum 1s display so the logo animation completes
          setTimeout(triggerExit, 1000);
        });
      } else {
        setTimeout(triggerExit, 1400);
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
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // Exit: clip-path circle shrinks to reveal content underneath
        clipPath: isExiting ? 'circle(0% at 50% 50%)' : 'circle(150% at 50% 50%)',
        transition: isExiting ? 'clip-path 0.9s cubic-bezier(0.77, 0, 0.175, 1)' : 'none',
        pointerEvents: isExiting ? 'none' : 'auto',
      }}
    >
      {/* Logo — scales up from small with a satisfying overshoot */}
      <img
        src="/r2-logo-splash.webp"
        alt="R² Solutions"
        style={{
          height: 'clamp(80px, 18vw, 140px)',
          width: 'auto',
          animation: 'splashLogoIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        }}
      />

      {/* Loading ring — draws itself in, then spins */}
      <div
        style={{
          marginTop: 28,
          width: 36,
          height: 36,
          position: 'relative',
          animation: 'splashFadeUp 0.5s ease-out 0.4s both',
        }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          style={{ animation: 'splashSpin 1s linear infinite' }}
        >
          {/* Track ring */}
          <circle
            cx="18" cy="18" r="15"
            fill="none"
            stroke="rgba(3, 44, 200, 0.12)"
            strokeWidth="2.5"
          />
          {/* Animated arc */}
          <circle
            cx="18" cy="18" r="15"
            fill="none"
            stroke="#032CC8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="70 30"
            style={{
              animation: 'splashDash 1.4s ease-in-out infinite',
              transformOrigin: 'center',
            }}
          />
        </svg>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes splashLogoIn {
          0% { opacity: 0; transform: scale(0.6); }
          60% { opacity: 1; transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes splashFadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes splashSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes splashDash {
          0% { stroke-dasharray: 10 90; stroke-dashoffset: 0; }
          50% { stroke-dasharray: 70 30; stroke-dashoffset: -30; }
          100% { stroke-dasharray: 10 90; stroke-dashoffset: -94; }
        }
      `}} />
    </div>
  );
}
