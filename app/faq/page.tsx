'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { PageMetadata } from '@/components/ui/PageMetadata';
import { BreadcrumbSchema } from '@/components/ui/BreadcrumbSchema';

export default function FAQ() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <PageMetadata
        title="Frequently Asked Questions | R² AI"
        description="Common questions about R² AI's sales intelligence agents and deployment process."
        ogImage="/og-image.png"
        canonicalUrl="https://rsquaredai.com/faq"
      />
      <BreadcrumbSchema />
      
      {/* ===== HERO ===== */}
      <section
        data-header-theme="light"
        style={{
          minHeight: '60vh',
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
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            Frequently Asked Questions
          </h1>
        </div>
      </section>

      {/* ===== FAQ CONTENT ===== */}
      <section data-header-theme="light" style={{ padding: '120px 0', background: '#fff' }}>
        <Container size="lg" className="max-w-4xl mx-auto px-6">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {/* FAQ 1 */}
            <div style={{ padding: 40, background: '#f9fafb', borderRadius: 16 }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#025082', marginBottom: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Why not just use Gong / Clari / [existing tool]?
              </h3>
              <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.7, marginBottom: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Point solutions are excellent at solving narrow problems. The challenge is they don't talk to each other. Your CRO ends up reconciling five dashboards to understand what's actually happening.
              </p>
              <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.7, marginBottom: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                <strong>R² is different:</strong> Our agents are <strong>orchestrated</strong>—they share context, learn from each other, and deliver unified intelligence. Instead of five isolated tools, you get one command center.
              </p>
              <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.7, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Plus, we deploy inside your environment with your data model and governance, not as another SaaS dashboard.
              </p>
            </div>

            {/* FAQ 2 */}
            <div style={{ padding: 40, background: '#f9fafb', borderRadius: 16 }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#025082', marginBottom: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                How is this different from building our own agents with ChatGPT/Claude?
              </h3>
              <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.7, marginBottom: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Three key differences:
              </p>
              <ol style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.8, marginBottom: 16, paddingLeft: 24, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                <li style={{ marginBottom: 12 }}><strong>Enterprise architecture:</strong> Our agents are built for production with security, governance, audit trails, and scalability baked in</li>
                <li style={{ marginBottom: 12 }}><strong>Orchestration:</strong> Multiple agents working together, sharing context, and self-correcting</li>
                <li style={{ marginBottom: 12 }}><strong>Domain expertise:</strong> We've run these sales organizations—we know which patterns actually matter vs. which are just activity</li>
              </ol>
              <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.7, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Most internal AI projects stall because teams underestimate the gap between a demo and a production system.
              </p>
            </div>

            {/* FAQ 3 */}
            <div style={{ padding: 40, background: '#f9fafb', borderRadius: 16 }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#025082', marginBottom: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                What if our data is messy or incomplete?
              </h3>
              <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.7, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                That's the reality for most organizations. Our agents are designed to work with imperfect data and actually help clean it over time.
              </p>
              <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.7, marginTop: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                We identify data quality issues during discovery and build remediation into the deployment plan. Agents get smarter as your data improves.
              </p>
            </div>

            {/* FAQ 4 */}
            <div style={{ padding: 40, background: '#f9fafb', borderRadius: 16 }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#025082', marginBottom: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                How long before we see ROI?
              </h3>
              <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.7, marginBottom: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Tier 1 agents typically show measurable impact within 4-6 weeks of deployment:
              </p>
              <ul style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.8, marginBottom: 16, paddingLeft: 24, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                <li style={{ marginBottom: 12 }}>Reduced admin time for reps (immediately visible)</li>
                <li style={{ marginBottom: 12 }}>Improved CRM data quality (within 2-3 weeks)</li>
                <li style={{ marginBottom: 12 }}>Better forecast accuracy (within first quarter)</li>
              </ul>
              <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.7, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Tier 2 and 3 agents have longer time horizons (8-16 weeks) but deliver more strategic impact.
              </p>
            </div>

            {/* FAQ 5 */}
            <div style={{ padding: 40, background: '#f9fafb', borderRadius: 16 }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#025082', marginBottom: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Do we need to change our existing tools or processes?
              </h3>
              <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.7, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                No. Our agents integrate with your existing stack (Salesforce, HubSpot, Gong, etc.) and work within your current workflows.
              </p>
              <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.7, marginTop: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Your reps don't need to adopt new tools or change behaviors. The agents operate in the background, making existing processes more effective.
              </p>
            </div>

            {/* FAQ 6 */}
            <div style={{ padding: 40, background: '#f9fafb', borderRadius: 16 }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#025082', marginBottom: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                What happens after deployment?
              </h3>
              <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.7, marginBottom: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                We don't deploy and disappear. Post-deployment includes:
              </p>
              <ul style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.8, marginBottom: 16, paddingLeft: 24, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                <li style={{ marginBottom: 12 }}>Continuous performance monitoring</li>
                <li style={{ marginBottom: 12 }}>Regular optimization based on usage patterns</li>
                <li style={{ marginBottom: 12 }}>Ongoing support and training</li>
                <li style={{ marginBottom: 12 }}>Quarterly business reviews</li>
              </ul>
              <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.7, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Agents improve over time as they learn from your specific operating environment.
              </p>
            </div>

            {/* FAQ 7 */}
            <div style={{ padding: 40, background: '#f9fafb', borderRadius: 16 }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#025082', marginBottom: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                What size organization is this built for?
              </h3>
              <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.7, marginBottom: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Our sweet spot is mid-market to enterprise B2B organizations:
              </p>
              <ul style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.8, marginBottom: 16, paddingLeft: 24, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                <li style={{ marginBottom: 12 }}>$100M+ annual revenue</li>
                <li style={{ marginBottom: 12 }}>20+ quota-carrying reps</li>
                <li style={{ marginBottom: 12 }}>Complex sales motions (multiple products, longer cycles)</li>
                <li style={{ marginBottom: 12 }}>Existing tech stack (Salesforce, Dynamics, HubSpot, or similar)</li>
              </ul>
              <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.7, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Smaller organizations can benefit but may not justify the investment. Larger enterprises are ideal clients.
              </p>
            </div>

            {/* FAQ 8 */}
            <div style={{ padding: 40, background: '#f9fafb', borderRadius: 16 }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#025082', marginBottom: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                How do you handle security and data privacy?
              </h3>
              <ul style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.8, marginBottom: 16, paddingLeft: 24, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                <li style={{ marginBottom: 12 }}>Agents operate inside your environment (we don't extract or centralize data)</li>
                <li style={{ marginBottom: 12 }}>SOC 2, GDPR, and HIPAA compliant architecture</li>
                <li style={{ marginBottom: 12 }}>Full audit trail of every agent decision and action</li>
                <li style={{ marginBottom: 12 }}>You maintain complete control and governance</li>
              </ul>
              <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.7, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                We can work within your specific security requirements and compliance frameworks.
              </p>
            </div>

            {/* FAQ 9 */}
            <div style={{ padding: 40, background: '#f9fafb', borderRadius: 16 }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#025082', marginBottom: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                What does the discovery workshop involve?
              </h3>
              <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.7, marginBottom: 16, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                <strong>2-hour structured session with your revenue leadership:</strong>
              </p>
              <ul style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.8, marginBottom: 16, paddingLeft: 24, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                <li style={{ marginBottom: 12 }}>Map your current sales motion and identify friction points</li>
                <li style={{ marginBottom: 12 }}>Prioritize 3-5 highest-impact agent opportunities</li>
                <li style={{ marginBottom: 12 }}>Create deployment roadmap with timelines and expected outcomes</li>
                <li style={{ marginBottom: 12 }}>You walk away with actionable insights—even if you don't hire us</li>
              </ul>
              <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.7, fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                No sales pitch. No obligation. Just strategic value.
              </p>
            </div>
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
              Ready to Get Started?
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
