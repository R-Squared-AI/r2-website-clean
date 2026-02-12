import { NextRequest, NextResponse } from 'next/server';

// Beehiiv API configuration
// You'll need to add these to your .env.local file:
// BEEHIIV_API_KEY=your_api_key_here
// BEEHIIV_PUBLICATION_ID=pub_xxxxx

export async function POST(request: NextRequest) {
  try {
    const { email, utmSource, utmMedium, utmCampaign } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.BEEHIIV_API_KEY;
    const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

    if (!apiKey || !publicationId) {
      console.error('Missing Beehiiv configuration');
      return NextResponse.json(
        { error: 'Newsletter service not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: utmSource || 'website',
          utm_medium: utmMedium || 'organic',
          utm_campaign: utmCampaign || 'squared_away_signup',
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Beehiiv API error:', errorData);

      // Handle already subscribed case gracefully
      if (response.status === 409 || errorData?.message?.includes('already')) {
        return NextResponse.json(
          { success: true, message: 'You\'re already subscribed!' },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed!',
      data
    });

  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
