'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { PageMetadata } from '@/components/ui/PageMetadata';
import { ContactPageSchema } from '@/components/ui/ContactPageSchema';
import { BreadcrumbSchema } from '@/components/ui/BreadcrumbSchema';

const NAVY_BLUE = '#025082';
const ICE_BLUE_LIGHT = '#e8f4fc';
const ICE_BLUE_LIGHTER = '#f0f9ff';

export default function Inquiry() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    organization: '',
    role: '',
    annualRevenue: '',
    quotaCarryingReps: '',
    primaryCRM: '',
    challenge: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        organization: formData.organization,
        role: formData.role,
        annualRevenue: formData.annualRevenue,
        quotaCarryingReps: formData.quotaCarryingReps,
        primaryCRM: formData.primaryCRM,
        challenge: formData.challenge,
        timestamp: new Date().toISOString(),
      };

      const webhookUrl = process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL || '';
      
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: 'contact@rsquaredai.com',
            subject: `R² Contact: ${formData.fullName}`,
            text: `Name: ${formData.fullName}\nEmail: ${formData.email}\nOrganization: ${formData.organization}\nRole: ${formData.role}\nAnnual Revenue: ${formData.annualRevenue}\nQuota-Carrying Reps: ${formData.quotaCarryingReps}\nPrimary CRM: ${formData.primaryCRM}\nChallenge: ${formData.challenge}`,
            json: payload,
          }),
        });
      } else {
        console.log('Contact form submission:', payload);
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Track conversion event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submission', {
          event_category: 'Contact',
          event_label: 'Contact Form',
          value: 1,
        });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <PageMetadata
        title="Contact R² Ai — Start Your AI Operational Journey"
        description="Reach out to R² Ai to build AI systems that run your business."
        ogImage="/og-image.png"
        canonicalUrl="https://rsquaredai.com/inquiry"
      />
      <ContactPageSchema />
      <BreadcrumbSchema />
      {/* ===== CONTACT US HEADER ===== */}
      <section
        style={{
          padding: '140px 48px 40px',
          background: `linear-gradient(180deg, ${ICE_BLUE_LIGHT} 0%, ${ICE_BLUE_LIGHTER} 40%, #ffffff 100%)`,
        }}
      >
        <Container size="lg" className="max-w-3xl mx-auto">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: 700,
                color: NAVY_BLUE,
                marginBottom: 32,
                lineHeight: 1.2,
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              Get in touch with R Squared
            </h1>
          </div>
        </Container>
      </section>

      {/* ===== THE CONCIERGE FORM ===== */}
      <section style={{ padding: '0 48px 80px' }}>
        <Container size="lg" className="max-w-2xl mx-auto">
          <div
            style={{
              background: '#ffffff',
              borderRadius: 24,
              padding: '48px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            }}
          >
            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: NAVY_BLUE,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: NAVY_BLUE,
                    marginBottom: 16,
                    fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }}
                >
                  Thank You!
                </h3>
                <p
                  style={{
                    fontSize: '1.1rem',
                    color: '#1f2937',
                    marginBottom: 32,
                    fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  }}
                >
                  We&apos;ll be in touch within 24 hours.
                </p>
                <Button onClick={() => setIsSubmitted(false)} variant="secondary">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                <div>
                  <label
                    htmlFor="fullName"
                    style={{
                      display: 'block',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: NAVY_BLUE,
                      marginBottom: 8,
                      fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: 12,
                      border: '1px solid #e5e7eb',
                      fontSize: '1rem',
                      fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = NAVY_BLUE)}
                    onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    style={{
                      display: 'block',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: NAVY_BLUE,
                      marginBottom: 8,
                      fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: 12,
                      border: '1px solid #e5e7eb',
                      fontSize: '1rem',
                      fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = NAVY_BLUE)}
                    onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
                  />
                </div>

                <div>
                  <label
                    htmlFor="organization"
                    style={{
                      display: 'block',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: NAVY_BLUE,
                      marginBottom: 8,
                      fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    }}
                  >
                    Organization *
                  </label>
                  <input
                    type="text"
                    id="organization"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: 12,
                      border: '1px solid #e5e7eb',
                      fontSize: '1rem',
                      fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = NAVY_BLUE)}
                    onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
                  />
                </div>

                <div>
                  <label
                    htmlFor="role"
                    style={{
                      display: 'block',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: NAVY_BLUE,
                      marginBottom: 8,
                      fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    }}
                  >
                    Role *
                  </label>
                  <input
                    type="text"
                    id="role"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: 12,
                      border: '1px solid #e5e7eb',
                      fontSize: '1rem',
                      fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = NAVY_BLUE)}
                    onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
                  />
                </div>

                <div>
                  <label
                    htmlFor="annualRevenue"
                    style={{
                      display: 'block',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: NAVY_BLUE,
                      marginBottom: 8,
                      fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    }}
                  >
                    Annual Revenue (optional)
                  </label>
                  <input
                    type="text"
                    id="annualRevenue"
                    value={formData.annualRevenue}
                    onChange={(e) => setFormData({ ...formData, annualRevenue: e.target.value })}
                    placeholder="$100M+"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: 12,
                      border: '1px solid #e5e7eb',
                      fontSize: '1rem',
                      fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = NAVY_BLUE)}
                    onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
                  />
                </div>

                <div>
                  <label
                    htmlFor="quotaCarryingReps"
                    style={{
                      display: 'block',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: NAVY_BLUE,
                      marginBottom: 8,
                      fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    }}
                  >
                    Number of Quota-Carrying Reps (optional)
                  </label>
                  <input
                    type="text"
                    id="quotaCarryingReps"
                    value={formData.quotaCarryingReps}
                    onChange={(e) => setFormData({ ...formData, quotaCarryingReps: e.target.value })}
                    placeholder="20+"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: 12,
                      border: '1px solid #e5e7eb',
                      fontSize: '1rem',
                      fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = NAVY_BLUE)}
                    onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
                  />
                </div>

                <div>
                  <label
                    htmlFor="primaryCRM"
                    style={{
                      display: 'block',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: NAVY_BLUE,
                      marginBottom: 8,
                      fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    }}
                  >
                    Primary CRM System *
                  </label>
                  <select
                    id="primaryCRM"
                    required
                    value={formData.primaryCRM}
                    onChange={(e) => setFormData({ ...formData, primaryCRM: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: 12,
                      border: '1px solid #e5e7eb',
                      fontSize: '1rem',
                      fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                      transition: 'border-color 0.2s',
                      background: '#fff',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = NAVY_BLUE)}
                    onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
                  >
                    <option value="">Select CRM</option>
                    <option value="Salesforce">Salesforce</option>
                    <option value="HubSpot">HubSpot</option>
                    <option value="Dynamics">Microsoft Dynamics</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="challenge"
                    style={{
                      display: 'block',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: NAVY_BLUE,
                      marginBottom: 8,
                      fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    }}
                  >
                    What's your biggest sales operations challenge? *
                  </label>
                  <textarea
                    id="challenge"
                    required
                    rows={6}
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: 12,
                      border: '1px solid #e5e7eb',
                      fontSize: '1rem',
                      fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                      resize: 'vertical',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = NAVY_BLUE)}
                    onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  disabled={isSubmitting}
                  style={{ width: '100%' }}
                >
                  {isSubmitting ? 'Submitting...' : 'Schedule Discovery Workshop'}
                </Button>
              </form>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}
