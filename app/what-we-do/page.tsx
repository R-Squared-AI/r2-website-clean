'use client';

import { Container } from '@/components/ui/Container';
import { PageMetadata } from '@/components/ui/PageMetadata';
import { BreadcrumbSchema } from '@/components/ui/BreadcrumbSchema';

export default function WhatWeDo() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <PageMetadata
        title="AI Workflow & Execution Architecture | R² AI"
        description="Learn how R² AI builds and deploys AI systems that automate business outcomes."
        ogImage="/og-image.png"
        canonicalUrl="https://rsquaredai.com/what-we-do"
      />
      <BreadcrumbSchema />
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
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 700,
              color: '#025082',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0,
              marginBottom: 32,
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            BRIDGING SALES STRATEGY AND AI EXECUTION.
          </h1>
          <p
            style={{
              fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)',
              color: '#1f2937',
              lineHeight: 1.7,
              maxWidth: 800,
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            We convert your sales challenges into production-ready AI agents. No roadmaps. No six-month discovery phases. Just working agents that integrate with your existing stack and deliver measurable impact.
          </p>
        </div>
      </section>

      {/* ===== WHAT WE DO - SERVICES COLLAGE (4 tiles, no CTA, no subheader) ===== */}
      <section data-header-theme="light" style={{ padding: '120px 0', background: '#fff', overflow: 'visible' }}>
        <div style={{ width: '100%', maxWidth: '100%', paddingLeft: 'clamp(24px, 5vw, 48px)', paddingRight: 'clamp(24px, 5vw, 48px)', margin: '0 auto', boxSizing: 'border-box' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gridTemplateRows: 'repeat(4, minmax(180px, 1fr))',
              gap: 20,
              width: '100%',
              minHeight: 560,
            }}
            className="services-collage"
          >
            <style dangerouslySetInnerHTML={{ __html: `
              @media (max-width: 1024px) {
                .services-collage {
                  grid-template-columns: repeat(6, 1fr) !important;
                  grid-template-rows: repeat(4, minmax(160px, 1fr)) !important;
                  gap: 16px !important;
                }
                .services-collage > div:nth-child(1) { grid-column: 1 / 7 !important; grid-row: 1 / 2 !important; }
                .services-collage > div:nth-child(2) { grid-column: 1 / 7 !important; grid-row: 2 / 3 !important; }
                .services-collage > div:nth-child(3) { grid-column: 1 / 7 !important; grid-row: 3 / 4 !important; }
                .services-collage > div:nth-child(4) { grid-column: 1 / 7 !important; grid-row: 4 / 5 !important; }
              }
              @media (max-width: 640px) {
                .services-collage {
                  grid-template-columns: 1fr !important;
                  grid-template-rows: repeat(4, minmax(220px, auto)) !important;
                  gap: 16px !important;
                }
                .services-collage > div { grid-column: 1 !important; grid-row: auto !important; }
              }
            `}} />
            <div style={{ gridColumn: '1 / 9', gridRow: '1 / 3', borderRadius: 24, padding: 'clamp(24px, 3vw, 48px)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(140deg, rgba(0,0,0,0.55), rgba(0,0,0,0.35)), url(/images/yellow-glow-road.png)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{ fontSize: 'clamp(1.35rem, 2.2vw, 1.85rem)', fontWeight: 700, color: '#fff', marginBottom: 12, lineHeight: 1.2, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>AI DISCOVERY & DESIGN WORKSHOP</h3>
                <p style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)', color: 'rgba(255,255,255,0.95)', lineHeight: 1.55, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>We start with a 2-hour working session where we map your current processes, identify where AI can help, and design the solution together. You walk away with a clear roadmap of what we'll build and how it will work.</p>
              </div>
            </div>
            <div style={{ gridColumn: '9 / 13', gridRow: '1 / 2', borderRadius: 24, padding: 'clamp(20px, 2.5vw, 36px)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(140deg, rgba(0,0,0,0.55), rgba(0,0,0,0.35)), url(/images/r2-billboard.png)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)', fontWeight: 700, color: '#fff', marginBottom: 8, lineHeight: 1.2, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>AGENT & WORKFLOW IMPLEMENTATION</h3>
                <p style={{ fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)', color: 'rgba(255,255,255,0.95)', lineHeight: 1.5, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>We build your AI agents and workflows using our templatized platform. Faster delivery, solutions that work in production.</p>
              </div>
            </div>
            <div style={{ gridColumn: '9 / 13', gridRow: '2 / 3', borderRadius: 24, padding: 'clamp(20px, 2.5vw, 36px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(140deg, rgba(0,0,0,0.55), rgba(0,0,0,0.35)), url(/images/business-specific-ai.png)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', fontWeight: 700, color: '#fff', lineHeight: 1.2, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>TEMPLATIZED AI OPERATIONS PLATFORM</h3>
                <p style={{ fontSize: 'clamp(0.8rem, 1vw, 0.9rem)', color: 'rgba(255,255,255,0.95)', lineHeight: 1.45, marginTop: 8, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>Accelerates delivery and ensures your solution follows proven best practices.</p>
              </div>
            </div>
            <div style={{ gridColumn: '1 / 13', gridRow: '3 / 5', borderRadius: 24, padding: 'clamp(28px, 3vw, 44px)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(140deg, rgba(0,0,0,0.55), rgba(0,0,0,0.35)), url(/images/industry-specific-ai.png)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{ fontSize: 'clamp(1.35rem, 2.2vw, 1.85rem)', fontWeight: 700, color: '#fff', marginBottom: 12, lineHeight: 1.2, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>ONGOING TUNING & SUPPORT</h3>
                <p style={{ fontSize: 'clamp(1rem, 1.25vw, 1.1rem)', color: 'rgba(255,255,255,0.95)', lineHeight: 1.6, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>After deployment, we monitor performance and make adjustments based on real usage. Your AI agents get smarter over time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUR OPERATING MODEL ===== */}
      <section data-header-theme="light" style={{ padding: '140px 0', background: '#ffffff' }}>
        <Container size="xl" className="max-w-5xl mx-auto px-6">
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#025082',
              marginBottom: 48,
              lineHeight: 1.2,
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            Our Operating Model
          </h2>
          
          <div style={{ marginBottom: 64 }}>
            <h3
              style={{
                fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                fontWeight: 600,
                color: '#025082',
                marginBottom: 20,
                lineHeight: 1.3,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              FORWARD-DEPLOYED ENGINEERING
            </h3>
            <p
              style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                color: '#4b5563',
                lineHeight: 1.7,
                marginBottom: 24,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              We don't sell software and disappear. We embed with your team:
            </p>
            <ul
              style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                color: '#4b5563',
                lineHeight: 1.8,
                paddingLeft: 24,
                marginBottom: 32,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              <li style={{ marginBottom: 12 }}>Senior operators lead each engagement</li>
              <li style={{ marginBottom: 12 }}>Engineers build alongside your stakeholders</li>
              <li style={{ marginBottom: 12 }}>Agents are deployed directly into production systems</li>
              <li style={{ marginBottom: 12 }}>Governance and performance are continuously reviewed</li>
            </ul>
            <p
              style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                color: '#1f2937',
                lineHeight: 1.7,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              This model ensures strategy, execution, and accountability remain tightly coupled throughout deployment and optimization.
            </p>
          </div>

          <div style={{ marginBottom: 64 }}>
            <h3
              style={{
                fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                fontWeight: 600,
                color: '#025082',
                marginBottom: 20,
                lineHeight: 1.3,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              KINETIC SOLUTIONING
            </h3>
            <p
              style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                color: '#4b5563',
                lineHeight: 1.7,
                marginBottom: 24,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              We eliminate execution delays through real-time engineering. Our methodology converts strategic dialogue into production-grade prototypes during the discovery workshop itself.
            </p>
            <p
              style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                color: '#1f2937',
                lineHeight: 1.7,
                marginBottom: 16,
                fontWeight: 600,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              While others are still writing the statement of work, we're already building your solution.
            </p>
            <p
              style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                color: '#4b5563',
                lineHeight: 1.7,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              <strong>Integration:</strong> We work inside your existing tools—Salesforce, HubSpot, Gong, whatever you use. Your team keeps their workflows. They just get more done.
            </p>
          </div>
        </Container>
      </section>

      {/* ===== AGENT ORCHESTRATION PLATFORM ===== */}
      <section data-header-theme="light" style={{ padding: '140px 0', background: '#f8fafc' }}>
        <Container size="xl" className="max-w-5xl mx-auto px-6">
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#025082',
              marginBottom: 32,
              lineHeight: 1.2,
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            AGENT ORCHESTRATION PLATFORM
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              color: '#4b5563',
              lineHeight: 1.7,
              marginBottom: 32,
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            Our proprietary platform creates agent hierarchies that communicate, compete, and self-correct:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 32 }}>
            <div style={{ padding: 24, background: '#ffffff', borderRadius: 16, border: '1px solid #e5e7eb' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#025082', marginBottom: 12, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Adversarial Excellence
              </h4>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.6, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Internal logic pits agents against one another to ensure the most efficient solution reaches production
              </p>
            </div>
            <div style={{ padding: 24, background: '#ffffff', borderRadius: 16, border: '1px solid #e5e7eb' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#025082', marginBottom: 12, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Unified Governance
              </h4>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.6, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Total transparency into agent logic, decisions, and performance—no black boxes
              </p>
            </div>
            <div style={{ padding: 24, background: '#ffffff', borderRadius: 16, border: '1px solid #e5e7eb' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#025082', marginBottom: 12, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Self-Correcting Systems
              </h4>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.6, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Agents that learn from mistakes and improve continuously without manual intervention
              </p>
            </div>
            <div style={{ padding: 24, background: '#ffffff', borderRadius: 16, border: '1px solid #e5e7eb' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#025082', marginBottom: 12, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Centralized Command
              </h4>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.6, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                You get a refined interface to monitor and govern your digital workforce
              </p>
            </div>
          </div>
          <p
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              color: '#1f2937',
              lineHeight: 1.7,
              fontWeight: 600,
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            This delivers control, visibility, and scalability—turning strategic intent into kinetic action.
          </p>
        </Container>
      </section>

      {/* ===== ENTERPRISE ARCHITECTURE ===== */}
      <section data-header-theme="light" style={{ padding: '140px 0', background: '#ffffff' }}>
        <Container size="xl" className="max-w-5xl mx-auto px-6">
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#025082',
              marginBottom: 32,
              lineHeight: 1.2,
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            ENTERPRISE ARCHITECTURE
          </h2>
          <p
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              color: '#4b5563',
              lineHeight: 1.7,
              marginBottom: 32,
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            We respect your reality:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#025082', marginBottom: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Security-first design
              </h3>
              <ul style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.7, paddingLeft: 20, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                <li style={{ marginBottom: 8 }}>Agents operate inside your environment</li>
                <li style={{ marginBottom: 8 }}>No data extraction or centralization</li>
                <li style={{ marginBottom: 8 }}>SOC 2, GDPR, HIPAA compliant architecture</li>
                <li style={{ marginBottom: 8 }}>Full audit trails</li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#025082', marginBottom: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Integration without disruption
              </h3>
              <ul style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.7, paddingLeft: 20, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                <li style={{ marginBottom: 8 }}>Works with your existing tech stack</li>
                <li style={{ marginBottom: 8 }}>No rip-and-replace</li>
                <li style={{ marginBottom: 8 }}>Deployment in days, not months</li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#025082', marginBottom: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                White-glove delivery
              </h3>
              <ul style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.7, paddingLeft: 20, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                <li style={{ marginBottom: 8 }}>Embedded engineering support</li>
                <li style={{ marginBottom: 8 }}>Hands-on training for your team</li>
                <li style={{ marginBottom: 8 }}>Ongoing optimization based on real usage</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== WHY THIS MATTERS ===== */}
      <section data-header-theme="light" style={{ padding: '140px 0', background: '#f8fafc' }}>
        <Container size="xl" className="max-w-5xl mx-auto px-6">
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#025082',
              marginBottom: 32,
              lineHeight: 1.2,
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
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            Most AI fails in sales because it's built by people who've never sold.
          </p>
          <p
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              color: '#4b5563',
              lineHeight: 1.7,
              marginBottom: 24,
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            The difference between activity and progress. Between a pipeline call and a forecast call. Between what reps say and what the data shows. These distinctions matter—and most AI vendors don't understand them.
          </p>
          <p
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              color: '#025082',
              lineHeight: 1.7,
              fontWeight: 600,
              marginBottom: 24,
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            R² does. Because we've lived it.
          </p>
          <p
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              color: '#4b5563',
              lineHeight: 1.7,
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            Our agents work because they're designed by practitioners who understand the operational reality of carrying quota, running forecast calls, and explaining variance to the board.
          </p>
        </Container>
      </section>
    </div>
  );
}
