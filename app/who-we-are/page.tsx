'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function WhoWeAre() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* ===== HERO ===== */}
      <section
        data-header-theme="light"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '140px 48px 60px',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #e8f4fc 0%, #f0f9ff 40%, #ffffff 100%)',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 1200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 40,
          }}
        >
          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 700,
              color: '#025082',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            WE EMBODY THE DEFINITION OF CONVERGENCE.
          </h1>
          
          <p
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              color: '#1f2937',
              lineHeight: 1.6,
              maxWidth: 800,
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            Three generations. One mission: Make AI work for sales.
          </p>
          <p
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              color: '#4b5563',
              lineHeight: 1.7,
              maxWidth: 800,
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            Most AI startups are built by people the same age, selling to people like themselves. We're different—and that's our advantage.
          </p>
        </div>
      </section>

      {/* ===== THE FOUNDERS ===== */}
      <section data-header-theme="light" style={{ padding: '140px 0', background: '#ffffff' }}>
        <Container size="xl" className="max-w-5xl mx-auto px-6">
          <div style={{ marginBottom: 60 }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                color: '#025082',
                marginBottom: 48,
                lineHeight: 1.2,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              The Founders
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 100 }}>
            {/* Rich */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(200px, 300px) 1fr',
                gap: 48,
                alignItems: 'start',
              }}
              className="founder-card"
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                  background: '#f9fafb',
                }}
              >
                <img
                  src="/images/headshots/rich-headshot.jpeg"
                  alt="Rich - Co-Founder & CEO"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    fontWeight: 500,
                    color: '#1f2937',
                    marginBottom: 12,
                    lineHeight: 1.3,
                    fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }}
                >
                  Rich Rivara | CEO
                </h3>
                <p
                  style={{
                    fontSize: '1.1rem',
                    color: '#4b5563',
                    lineHeight: 1.7,
                    marginBottom: 16,
                    fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }}
                >
                  Rich bridges cutting-edge technology and boardroom reality. Decades of quota-carrying sales leadership, enterprise transformation, and C-suite revenue strategy. He's run the forecast call, explained variance to the board, and rebuilt revenue operations from the ground up.
                </p>
                <p
                  style={{
                    fontSize: '1rem',
                    color: '#6b7280',
                    lineHeight: 1.7,
                    fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }}
                >
                  He ensures R² solves real sales problems—not imaginary ones.
                </p>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: '#6b7280',
                    lineHeight: 1.7,
                    marginTop: 16,
                    fontStyle: 'italic',
                    fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }}
                >
                  <strong>Background:</strong> Strategic revenue leadership, enterprise-wide transformation, veteran sales operations
                </p>
              </div>
            </div>

            {/* Will */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(200px, 300px) 1fr',
                gap: 48,
                alignItems: 'start',
              }}
              className="founder-card"
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                  background: '#f9fafb',
                }}
              >
                <img
                  src="/images/headshots/will-headshot.jpeg"
                  alt="Will - Co-Founder & CTO"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    fontWeight: 500,
                    color: '#1f2937',
                    marginBottom: 12,
                    lineHeight: 1.3,
                    fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }}
                >
                  Will Godfrey | CTO
                </h3>
                <p
                  style={{
                    fontSize: '1.1rem',
                    color: '#4b5563',
                    lineHeight: 1.7,
                    marginBottom: 16,
                    fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }}
                >
                  Will architects the foundational infrastructure powering R²'s digital workforce. Former McKinsey engineer and system designer focused on security, robustness, and industrial-grade reliability. He's deployed enterprise systems at Fortune 500 scale with real compliance requirements.
                </p>
                <p
                  style={{
                    fontSize: '1rem',
                    color: '#6b7280',
                    lineHeight: 1.7,
                    fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }}
                >
                  He ensures every agent operates in a secure, high-performance ecosystem.
                </p>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: '#6b7280',
                    lineHeight: 1.7,
                    marginTop: 16,
                    fontStyle: 'italic',
                    fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }}
                >
                  <strong>Background:</strong> Enterprise system architecture, multi-agent orchestration, secure AI implementation
                </p>
              </div>
            </div>

            {/* Tyler */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(200px, 300px) 1fr',
                gap: 48,
                alignItems: 'start',
              }}
              className="founder-card"
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                  background: '#f9fafb',
                }}
              >
                <img
                  src="/images/headshots/tyler-headshot.jpeg"
                  alt="Tyler - Co-Founder & CPO"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    fontWeight: 500,
                    color: '#1f2937',
                    marginBottom: 12,
                    lineHeight: 1.3,
                    fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }}
                >
                  Tyler Preisser | CPO
                </h3>
                <p
                  style={{
                    fontSize: '1.1rem',
                    color: '#4b5563',
                    lineHeight: 1.7,
                    marginBottom: 16,
                    fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }}
                >
                  Tyler speaks AI as a native language. He specializes in the psychology of human-agent interaction and getting AI to do things others say can't be done. Tyler pushes the boundaries of agentic logic to bridge human intent and machine execution.
                </p>
                <p
                  style={{
                    fontSize: '1rem',
                    color: '#6b7280',
                    lineHeight: 1.7,
                    fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }}
                >
                  He ensures R²'s agents do things competitors' agents can't.
                </p>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: '#6b7280',
                    lineHeight: 1.7,
                    marginTop: 16,
                    fontStyle: 'italic',
                    fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }}
                >
                  <strong>Background:</strong> AI engineering, agentic system design, advanced orchestration logic
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== WHY THIS MATTERS ===== */}
      <section data-header-theme="light" style={{ padding: '120px 0', background: '#f9fafb' }}>
        <Container size="xl" className="max-w-5xl mx-auto px-6">
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#025082',
              marginBottom: 32,
              lineHeight: 1.2,
              textAlign: 'center',
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            Why This Matters
          </h2>
          <p
            style={{
              fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)',
              color: '#1f2937',
              lineHeight: 1.7,
              marginBottom: 24,
              fontWeight: 600,
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            Most AI companies are groupthink: Same age, same perspective, same blind spots.
          </p>
          <p
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              color: '#4b5563',
              lineHeight: 1.7,
              marginBottom: 24,
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            R² is different: We span three generations of technologists. We understand:
          </p>
          <ul
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
              color: '#4b5563',
              lineHeight: 1.8,
              marginBottom: 32,
              paddingLeft: 24,
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            <li style={{ marginBottom: 16 }}>Enterprise buyers and board-level concerns (Rich)</li>
            <li style={{ marginBottom: 16 }}>Mid-career managers and operational realities (Will)</li>
            <li style={{ marginBottom: 16 }}>Emerging technology and what's actually possible (Tyler)</li>
          </ul>
          <p
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              color: '#4b5563',
              lineHeight: 1.7,
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            This isn't diversity for its own sake. It's what makes us more effective at building agents that work for everyone in your organization—from front-line reps to the C-suite.
          </p>
        </Container>
      </section>

      {/* ===== CTA ===== */}
      <section data-header-theme="light" style={{ padding: '140px 0', background: '#fff' }}>
        <Container size="lg" className="max-w-3xl px-6">
          <div style={{ textAlign: 'center' }}>
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 600,
                color: '#111827',
                marginBottom: 20,
                lineHeight: 1.15,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              WANT TO WORK WITH FOUNDERS WHO'VE LEAD COMPANIES, MANAGED SALES ORGANIZATIONS & CARRIED QUOTA?
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }} className="sm:flex-row sm:justify-center">
              <Button size="lg" variant="primary" asChild>
                <Link href="/inquiry">Schedule Discovery Workshop</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
