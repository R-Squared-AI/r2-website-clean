import localFont from 'next/font/local';
import { Roboto_Mono, Inter } from 'next/font/google';

// R2 Custom Font - Regular (for headers and big/branded sections)
export const r2Font = localFont({
  src: './R2Font.ttf',
  variable: '--font-r2',
  display: 'block',
  weight: '400',
});

// R2 Custom Font - Bold (for bold headers)
export const r2FontBold = localFont({
  src: './R2FontBold.ttf',
  variable: '--font-r2-bold',
  display: 'block',
  weight: '700',
});

// Roboto Mono - Primary font for body text and everything else
export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'block',
  weight: ['400', '500', '700'],
});

// Inter - For blueprint-style headers (Semi-bold)
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'block',
  weight: ['400', '500', '600', '700'],
});
