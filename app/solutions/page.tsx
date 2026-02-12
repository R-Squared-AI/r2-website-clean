'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { PageMetadata } from '@/components/ui/PageMetadata';
import { BreadcrumbSchema } from '@/components/ui/BreadcrumbSchema';

export default function Solutions() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <PageMetadata
        title="Sales Intelligence Agents | R² AI"
        description="Production-grade AI agents for B2B sales organizations. Deployed inside your revenue organization."
        ogImage="/og-image.png"
        canonicalUrl="https://rsquaredai.com/solutions"
      />
      <BreadcrumbSchema />
      
      {/* ===== HERO ===== */}
      <section
        data-header-theme="light"
        style={{
          minHeight: '80vh',
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
          <h1
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 700,
              color: '#025082',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: 24,
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            Sales Intelligence Agents.
          </h1>
          <p
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              color: '#1f2937',
              lineHeight: 1.6,
              maxWidth: 800,
              marginBottom: 24,
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            Deployed inside your revenue organization.
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
            Each R² agent is designed to address a specific operational pressure point within B2B sales organizations. All agents integrate directly with your existing systems and deliver measurable impact within weeks.
          </p>
        </div>
      </section>

      {/* ===== TIER 1: FOUNDATIONAL AGENTS ===== */}
      <section data-header-theme="light" style={{ padding: '120px 0', background: '#fff' }}>
        <Container size="xl" className="max-w-6xl mx-auto px-6">
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#025082',
              marginBottom: 16,
              lineHeight: 1.2,
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            Tier 1: Foundational Agents (2-4 Weeks to Production)
          </h2>

          {/* Sales Call Intelligence */}
          <div style={{ marginBottom: 80, padding: 48, background: '#f9fafb', borderRadius: 24 }}>
            <h3
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: '#025082',
                marginBottom: 16,
                lineHeight: 1.2,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Sales Call Intelligence
            </h3>
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
              Sales conversations contain the truth. Most of it never reaches your ears or systems.
            </p>
            
            <h4
              style={{
                fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                fontWeight: 600,
                color: '#025082',
                marginTop: 32,
                marginBottom: 16,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Capabilities
            </h4>
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
              <li style={{ marginBottom: 12 }}>Transcribes internal and external sales calls automatically</li>
              <li style={{ marginBottom: 12 }}>Extracts commitments, risks, objections, and next steps</li>
              <li style={{ marginBottom: 12 }}>Updates CRM automatically and consistently</li>
              <li style={{ marginBottom: 12 }}>Creates a searchable intelligence layer across all conversations</li>
              <li style={{ marginBottom: 12 }}>Learns communication patterns at the rep level</li>
            </ul>

            <h4
              style={{
                fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                fontWeight: 600,
                color: '#025082',
                marginTop: 32,
                marginBottom: 16,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Expected Business Impact
            </h4>
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
              <li style={{ marginBottom: 12 }}>CRM reflects operational reality without manual data entry</li>
              <li style={{ marginBottom: 12 }}>Eliminate 5-8 hours/week of admin work per rep</li>
              <li style={{ marginBottom: 12 }}>Follow-through becomes systematic, not heroic</li>
              <li style={{ marginBottom: 12 }}>Never miss a commitment or follow-up again</li>
            </ul>

            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                color: '#6b7280',
                marginBottom: 24,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              <strong>Integrations:</strong> Salesforce, Dynamics, HubSpot, Gong, Chorus, Zoom, Teams
            </p>
            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                color: '#6b7280',
                marginBottom: 32,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              <strong>Time to Production:</strong> 2-3 weeks
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Button size="lg" variant="primary" asChild>
                <Link href="/inquiry">Request Demo</Link>
              </Button>
            </div>
          </div>

          {/* Quota Gap Analyzer */}
          <div style={{ marginBottom: 80, padding: 48, background: '#f9fafb', borderRadius: 24 }}>
            <h3
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: '#025082',
                marginBottom: 16,
                lineHeight: 1.2,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Quota Gap Analyzer
            </h3>
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
              Hope is not a forecast. Coverage gaps compound quietly until it's too late.
            </p>
            
            <h4
              style={{
                fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                fontWeight: 600,
                color: '#025082',
                marginTop: 32,
                marginBottom: 16,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Capabilities
            </h4>
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
              <li style={{ marginBottom: 12 }}>Tracks quota, pipeline, and coverage dynamically by rep, team, and segment</li>
              <li style={{ marginBottom: 12 }}>Identifies shortfalls early in the quarter (typically 3-4 weeks earlier than manual analysis)</li>
              <li style={{ marginBottom: 12 }}>Quantifies specific gaps and required actions to close them</li>
              <li style={{ marginBottom: 12 }}>Supports structured pipeline remediation conversations</li>
              <li style={{ marginBottom: 12 }}>Automates the "show me your plan to hit the number" conversation</li>
            </ul>

            <h4
              style={{
                fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                fontWeight: 600,
                color: '#025082',
                marginTop: 32,
                marginBottom: 16,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Expected Business Impact
            </h4>
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
              <li style={{ marginBottom: 12 }}>Improve forecast accuracy by 15-25% within first quarter</li>
              <li style={{ marginBottom: 12 }}>Earlier intervention on at-risk deals</li>
              <li style={{ marginBottom: 12 }}>Turn "hope" into math</li>
              <li style={{ marginBottom: 12 }}>Stronger pipeline discipline across the team</li>
            </ul>

            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                color: '#6b7280',
                marginBottom: 24,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              <strong>Integrations:</strong> Salesforce, HubSpot, Dynamics, custom CRMs
            </p>
            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                color: '#6b7280',
                marginBottom: 32,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              <strong>Time to Production:</strong> 3-4 weeks
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Button size="lg" variant="primary" asChild>
                <Link href="/inquiry">Request Demo</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== TIER 2: REVENUE ACCELERATION AGENTS ===== */}
      <section data-header-theme="light" style={{ padding: '120px 0', background: '#f9fafb' }}>
        <Container size="xl" className="max-w-6xl mx-auto px-6">
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#025082',
              marginBottom: 16,
              lineHeight: 1.2,
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            Tier 2: Revenue Acceleration Agents (4-8 Weeks to Production)
          </h2>

          {/* Cross-Sell Pipeline Builder */}
          <div style={{ marginBottom: 80, padding: 48, background: '#fff', borderRadius: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: '#025082',
                marginBottom: 16,
                lineHeight: 1.2,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Cross-Sell Pipeline Builder
            </h3>
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
              Expansion revenue exists inside your customer base. Most teams wait for referrals, our agents build the pipeline.
            </p>
            
            <h4
              style={{
                fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                fontWeight: 600,
                color: '#025082',
                marginTop: 32,
                marginBottom: 16,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Capabilities
            </h4>
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
              <li style={{ marginBottom: 12 }}>Analyzes customer usage data, sentiment signals, and product penetration patterns</li>
              <li style={{ marginBottom: 12 }}>Identifies expansion opportunities across your account base</li>
              <li style={{ marginBottom: 12 }}>Scores and prioritizes cross-sell opportunities by likelihood and value</li>
              <li style={{ marginBottom: 12 }}>Finds the right contacts and decision-makers</li>
              <li style={{ marginBottom: 12 }}>Prepares outreach messaging aligned to individual rep communication styles</li>
            </ul>

            <h4
              style={{
                fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                fontWeight: 600,
                color: '#025082',
                marginTop: 32,
                marginBottom: 16,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Expected Business Impact
            </h4>
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
              <li style={{ marginBottom: 12 }}>Generate 15-30% more pipeline from existing accounts</li>
              <li style={{ marginBottom: 12 }}>Reduce reliance on inbound referrals</li>
              <li style={{ marginBottom: 12 }}>Revenue growth without proportional headcount increase</li>
              <li style={{ marginBottom: 12 }}>Systematic expansion motion, not random acts of outreach</li>
            </ul>

            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                color: '#6b7280',
                marginBottom: 24,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              <strong>Integrations:</strong> Salesforce, HubSpot, Dynamics, product usage data, conversation intelligence
            </p>
            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                color: '#6b7280',
                marginBottom: 32,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              <strong>Time to Production:</strong> 4-6 weeks
            </p>

            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                color: '#6b7280',
                marginBottom: 24,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              <strong>Integrations:</strong> Salesforce, Dynamics, HubSpot, Gainsight, customer success platforms
            </p>
            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                color: '#6b7280',
                marginBottom: 32,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              <strong>Time to Production:</strong> 6-8 weeks
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Button size="lg" variant="primary" asChild>
                <Link href="/inquiry">Request Demo</Link>
              </Button>
            </div>
          </div>

          {/* Rep Performance Intelligence */}
          <div style={{ marginBottom: 80, padding: 48, background: '#fff', borderRadius: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: '#025082',
                marginBottom: 16,
                lineHeight: 1.2,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Rep Performance Intelligence
            </h3>
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
              Activity volume obscures execution quality. Our agent restores focus.
            </p>
            
            <h4
              style={{
                fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                fontWeight: 600,
                color: '#025082',
                marginTop: 32,
                marginBottom: 16,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Capabilities
            </h4>
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
              <li style={{ marginBottom: 12 }}>Analyzes behavior patterns versus actual outcomes</li>
              <li style={{ marginBottom: 12 }}>Detects stalled opportunities and identifies false progress indicators</li>
              <li style={{ marginBottom: 12 }}>Tracks close rates, cycle times, and conversion metrics by rep</li>
              <li style={{ marginBottom: 12 }}>Tracks sales calls over time - what bookings were promised at the beginning of a year/quarter/month and what was delivered</li>
              <li style={{ marginBottom: 12 }}>Identifies "waiting for legal" and other common stall tactics</li>
              <li style={{ marginBottom: 12 }}>Supports objective, data-driven coaching conversations</li>
            </ul>

            <h4
              style={{
                fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                fontWeight: 600,
                color: '#025082',
                marginTop: 32,
                marginBottom: 16,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Expected Business Impact
            </h4>
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
              <li style={{ marginBottom: 12 }}>Focus attention on deals that will actually close</li>
              <li style={{ marginBottom: 12 }}>Reduce time-to-productivity for new reps by 40%</li>
              <li style={{ marginBottom: 12 }}>Improve coaching effectiveness with objective data</li>
              <li style={{ marginBottom: 12 }}>Increase forecast accuracy by surfacing pattern deviations</li>
            </ul>

            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                color: '#6b7280',
                marginBottom: 24,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              <strong>Integrations:</strong> Salesforce, Dynamics, HubSpot, Gong, sales engagement platforms
            </p>
            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                color: '#6b7280',
                marginBottom: 32,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              <strong>Time to Production:</strong> 4-6 weeks
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Button size="lg" variant="primary" asChild>
                <Link href="/inquiry">Request Demo</Link>
              </Button>
            </div>
          </div>

          {/* Pipeline Commitment Intelligence */}
          <div style={{ marginBottom: 80, padding: 48, background: '#fff', borderRadius: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: '#025082',
                marginBottom: 16,
                lineHeight: 1.2,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Pipeline Commitment Intelligence
            </h3>
            
            <h4
              style={{
                fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                fontWeight: 600,
                color: '#025082',
                marginTop: 32,
                marginBottom: 16,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              BUSINESS CHALLENGE
            </h4>
            <p
              style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
                color: '#4b5563',
                lineHeight: 1.7,
                marginBottom: 24,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Revenue teams make quarterly and monthly commitments during pipeline reviews. These commitments rarely receive systematic tracking against actual delivery. This creates two problems: representatives who consistently over-commit face no accountability, and those who strategically under-commit (sandbagging) obscure true pipeline potential.
            </p>
            
            <h4
              style={{
                fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                fontWeight: 600,
                color: '#025082',
                marginTop: 32,
                marginBottom: 16,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              AGENT CAPABILITIES
            </h4>
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
              <li style={{ marginBottom: 12 }}>Continuous tracking of revenue commitments across quarterly, monthly, and weekly pipeline calls</li>
              <li style={{ marginBottom: 12 }}>Historical pattern analysis comparing committed vs. delivered bookings by representative</li>
              <li style={{ marginBottom: 12 }}>Identification of systematic over-commitment or under-commitment patterns</li>
              <li style={{ marginBottom: 12 }}>Credibility scoring based on historical commitment accuracy</li>
              <li style={{ marginBottom: 12 }}>Automated variance analysis with trend identification</li>
              <li style={{ marginBottom: 12 }}>Integration with CRM forecasting categories to detect gaming behavior</li>
            </ul>

            <h4
              style={{
                fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                fontWeight: 600,
                color: '#025082',
                marginTop: 32,
                marginBottom: 16,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              PERFORMANCE OUTCOMES
            </h4>
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
              <li style={{ marginBottom: 12 }}>Enhanced accountability for pipeline commitments</li>
              <li style={{ marginBottom: 12 }}>Early identification of representatives who systematically miss commitments</li>
              <li style={{ marginBottom: 12 }}>Detection of sandbagging patterns that obscure true pipeline health</li>
              <li style={{ marginBottom: 12 }}>Data-driven credibility assessment replacing subjective trust in forecasts</li>
              <li style={{ marginBottom: 12 }}>Improved executive confidence in pipeline reviews</li>
            </ul>

            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                color: '#6b7280',
                marginBottom: 24,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              <strong>Enterprise Integration:</strong> Salesforce, Dynamics, HubSpot, conversation intelligence platforms, video conferencing systems
            </p>
            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                color: '#6b7280',
                marginBottom: 32,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              <strong>Deployment Timeline:</strong> 5-7 weeks
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Button size="lg" variant="primary" asChild>
                <Link href="/inquiry">Request Demo</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== TIER 3: STRATEGIC SYSTEMS ===== */}
      <section data-header-theme="light" style={{ padding: '120px 0', background: '#fff' }}>
        <Container size="xl" className="max-w-6xl mx-auto px-6">
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#025082',
              marginBottom: 16,
              lineHeight: 1.2,
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            Tier 3: Strategic Systems (Custom Engagements)
          </h2>

          {/* CRO Command Center */}
          <div style={{ marginBottom: 80, padding: 48, background: '#f9fafb', borderRadius: 24 }}>
            <h3
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: '#025082',
                marginBottom: 16,
                lineHeight: 1.2,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              CRO Command Center
            </h3>
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
              Revenue leadership requires synthesized intelligence—not more dashboards to reconcile.
            </p>
            
            <h4
              style={{
                fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                fontWeight: 600,
                color: '#025082',
                marginTop: 32,
                marginBottom: 16,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Capabilities
            </h4>
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
              <li style={{ marginBottom: 12 }}>Real-time monitoring of opportunity health and rep execution across your entire organization</li>
              <li style={{ marginBottom: 12 }}>Automated analysis of pipeline and forecast calls with pattern detection</li>
              <li style={{ marginBottom: 12 }}>Early detection of risk and underperformance (typically 3-4 weeks earlier)</li>
              <li style={{ marginBottom: 12 }}>Unified view across fragmented sales intelligence tools</li>
              <li style={{ marginBottom: 12 }}>Surfaces what actually needs attention vs. the "picture of hope"</li>
              <li style={{ marginBottom: 12 }}>Historical tracking of revenue commitments vs. actual delivery across all time horizons</li>
              <li style={{ marginBottom: 12 }}>Pattern recognition for systematic over-commitment or sandbagging behavior</li>
            </ul>

            <h4
              style={{
                fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                fontWeight: 600,
                color: '#025082',
                marginTop: 32,
                marginBottom: 16,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Expected Business Impact
            </h4>
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
              <li style={{ marginBottom: 12 }}>Transform pipeline calls from theater into data-driven standups</li>
              <li style={{ marginBottom: 12 }}>Identify problems before they cost you the month or quarter</li>
              <li style={{ marginBottom: 12 }}>Consolidation of point solutions into one orchestrated command interface</li>
              <li style={{ marginBottom: 12 }}>Elimination of "commitment amnesia" where prior forecasts are forgotten</li>
              <li style={{ marginBottom: 12 }}>Accountability for representatives based on track record, not just current story</li>
            </ul>

            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                color: '#6b7280',
                marginBottom: 24,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              <strong>Integrations:</strong> Full sales stack integration (Salesforce, Gong, Outreach, Clari, etc.)
            </p>
            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                color: '#6b7280',
                marginBottom: 32,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              <strong>Time to Production:</strong> 8-12 weeks
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Button size="lg" variant="primary" asChild>
                <Link href="/inquiry">Request Demo</Link>
              </Button>
            </div>
          </div>

          {/* Workshop Solution Generator */}
          <div style={{ marginBottom: 80, padding: 48, background: '#f9fafb', borderRadius: 24 }}>
            <h3
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: '#025082',
                marginBottom: 16,
                lineHeight: 1.2,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Workshop Solution Generator
            </h3>
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
              Client workshops generate great ideas—we bring them to life in real time.
            </p>
            
            <h4
              style={{
                fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                fontWeight: 600,
                color: '#025082',
                marginTop: 32,
                marginBottom: 16,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Capabilities
            </h4>
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
              <li style={{ marginBottom: 12 }}>Captures strategic conversations in real-time during workshops and strategy sessions</li>
              <li style={{ marginBottom: 12 }}>Extracts key decisions, commitments, and action items automatically</li>
              <li style={{ marginBottom: 12 }}>Generates solution frameworks and next steps while still in the room</li>
              <li style={{ marginBottom: 12 }}>Creates accountability system for follow-through</li>
              <li style={{ marginBottom: 12 }}>Converts workshop insights into executable deliverables</li>
            </ul>

            <h4
              style={{
                fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                fontWeight: 600,
                color: '#025082',
                marginTop: 32,
                marginBottom: 16,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Expected Business Impact
            </h4>
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
              <li style={{ marginBottom: 12 }}>Turn workshop insights into actual execution, not just notes</li>
              <li style={{ marginBottom: 12 }}>Accelerate time from idea to implementation by 50%+</li>
              <li style={{ marginBottom: 12 }}>Ensure nothing falls through the cracks</li>
              <li style={{ marginBottom: 12 }}>Begin building solutions during the workshop itself</li>
            </ul>

            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                color: '#6b7280',
                marginBottom: 24,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              <strong>Integrations:</strong> Zoom, Teams, Slack, project management tools
            </p>
            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                color: '#6b7280',
                marginBottom: 32,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              <strong>Time to Production:</strong> Custom scoped based on workshop complexity
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Button size="lg" variant="primary" asChild>
                <Link href="/inquiry">Request Demo</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== HOW WE'RE DIFFERENT ===== */}
      <section data-header-theme="light" style={{ padding: '120px 0', background: '#f9fafb' }}>
        <Container size="xl" className="max-w-6xl mx-auto px-6">
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#025082',
              marginBottom: 48,
              textAlign: 'center',
              lineHeight: 1.2,
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            How We're Different
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginBottom: 48 }}>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#025082', marginBottom: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Traditional Consulting
              </h3>
              <ul style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.8, textAlign: 'left', paddingLeft: 20, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                <li>Recommendations & roadmaps</li>
                <li>6-12 month projects</li>
                <li>You need implementation partners</li>
                <li>Generalist approach</li>
                <li>Optimize for billable hours</li>
              </ul>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#025082', marginBottom: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                AI Vendors
              </h3>
              <ul style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.8, textAlign: 'left', paddingLeft: 20, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                <li>Product demos</li>
                <li>Self-service implementation</li>
                <li>You figure it out</li>
                <li>Narrow point solution</li>
                <li>Optimize for demos</li>
              </ul>
            </div>
            <div style={{ textAlign: 'center', background: '#ffffff', padding: 32, borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#025082', marginBottom: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                R Squared AI
              </h3>
              <ul style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.8, textAlign: 'left', paddingLeft: 20, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                <li>Deployed agents in production</li>
                <li>2-8 week delivery with embedded engineers</li>
                <li>Forward-deployed engineering</li>
                <li>Orchestrated intelligence across sales ops</li>
                <li>Optimize for outcomes in production</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== DON'T SEE YOUR USE CASE? ===== */}
      <section data-header-theme="light" style={{ padding: '120px 0', background: '#fff' }}>
        <Container size="xl" className="max-w-5xl mx-auto px-6">
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                color: '#025082',
                marginBottom: 24,
                lineHeight: 1.2,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Don't See Your Use Case?
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
              These are our core agent templates, but every sales organization has unique operational challenges.
            </p>
            <p
              style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                color: '#1f2937',
                lineHeight: 1.7,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Schedule a discovery workshop and we'll identify the 3-5 highest-impact agents for your specific situation—even if they're not listed here.
            </p>
            <div style={{ marginTop: 32 }}>
              <Button size="lg" variant="primary" asChild>
                <Link href="/inquiry">Schedule Discovery Workshop</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== HOW WE WORK ===== */}
      <section data-header-theme="light" style={{ padding: '120px 0', background: '#f9fafb' }}>
        <Container size="xl" className="max-w-5xl mx-auto px-6">
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#025082',
              marginBottom: 48,
              textAlign: 'center',
              lineHeight: 1.2,
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            How We Work
          </h2>
          <p
            style={{
              fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
              color: '#1f2937',
              lineHeight: 1.7,
              marginBottom: 48,
              textAlign: 'center',
              fontWeight: 600,
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            FROM DISCOVERY TO DEPLOYMENT IN WEEKS
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
            <div style={{ padding: 32, background: '#ffffff', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#025082', marginBottom: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Week 1: Discovery Workshop
              </h3>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.7, marginBottom: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Senior operators lead a structured session to map your sales motion and identify operational failure points. We prioritize agent deployment based on impact and feasibility.
              </p>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.7, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Our agents capture the conversation and begin building solution frameworks in real-time—turning the workshop into working prototypes, not just notes.
              </p>
            </div>
            <div style={{ padding: 32, background: '#ffffff', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#025082', marginBottom: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Weeks 2-6: Build & Deploy
              </h3>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.7, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Agents are built, integrated with your stack, and validated in your production environment with weekly checkpoints. You see progress every week, not at the end of a multi-month engagement.
              </p>
            </div>
            <div style={{ padding: 32, background: '#ffffff', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#025082', marginBottom: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Week 6+: Optimize & Scale
              </h3>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.7, marginBottom: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Agents go live. Performance is monitored continuously. Agents adapt as your operating conditions change. Your team gets hands-on training and full documentation.
              </p>
              <p style={{ fontSize: '1rem', color: '#1f2937', lineHeight: 1.7, fontWeight: 600, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                You get measurable results and full governance.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== INVESTMENT FRAMEWORK ===== */}
      <section data-header-theme="light" style={{ padding: '120px 0', background: '#fff' }}>
        <Container size="xl" className="max-w-5xl mx-auto px-6">
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#025082',
              marginBottom: 32,
              textAlign: 'center',
              lineHeight: 1.2,
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            Investment Framework
          </h2>
          <p
            style={{
              fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)',
              color: '#1f2937',
              lineHeight: 1.7,
              marginBottom: 32,
              textAlign: 'center',
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            Typical Engagement Ranges:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24, marginBottom: 32 }}>
            <div style={{ padding: 32, background: '#f9fafb', borderRadius: 16, border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#025082', marginBottom: 12, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Tier 1 Agents
              </h3>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.7, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                $100K-$200K (deployment + 3 month support)
              </p>
            </div>
            <div style={{ padding: 32, background: '#f9fafb', borderRadius: 16, border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#025082', marginBottom: 12, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Tier 2 Agents
              </h3>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.7, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                $200K-$350K (deployment + 6 month support)
              </p>
            </div>
            <div style={{ padding: 32, background: '#f9fafb', borderRadius: 16, border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#025082', marginBottom: 12, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Tier 3 Systems
              </h3>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.7, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Custom scoped based on complexity and organizational scale
              </p>
            </div>
          </div>
          <p
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              color: '#4b5563',
              lineHeight: 1.7,
              textAlign: 'center',
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            Discovery workshops are complimentary for qualified organizations.
          </p>
          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <Button size="lg" variant="primary" asChild>
              <Link href="/inquiry">Schedule Discovery Workshop</Link>
            </Button>
          </div>
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
              READY TO BRIDGE THE EXECUTION GAP?
            </h2>
            <p style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1rem)', color: '#6b7280', marginBottom: 56, lineHeight: 1.7, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
              Schedule a no-risk discovery workshop and we'll identify the highest-impact agents for your sales organization.
            </p>
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
