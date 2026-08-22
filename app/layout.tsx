import { ubuntu } from '../app/lib/fonts';
import './ui/global.css';
import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { Analytics } from '@vercel/analytics/react';
import enMessages from '../messages/en.json';
export const metadata: Metadata = {
  title: {
    default: enMessages.metadata.title,
    template: '%s | Wseem Kharma',
  },
  description: enMessages.metadata.description,
  keywords: enMessages.metadata.keywords,
  authors: [{ name: 'Wseem Kharma' }],
  creator: 'Wseem Kharma',
  publisher: 'Wseem Kharma',
  metadataBase: new URL('https://wseemkharma.vercel.app'),
  openGraph: {
    type: 'website',
    siteName: 'Wseem Kharma',
    title: enMessages.metadata.title,
    description: enMessages.metadata.description,
    images: ['/assets/herobg.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: enMessages.metadata.title,
    description: enMessages.metadata.description,
    images: ['/assets/herobg.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    // Facebook App Links (to force external browser opening)
    'al:android:url': 'https://wseemkharma.vercel.app',
    'al:android:package': 'com.android.chrome', // Tells Facebook to open in Chrome
    'al:android:app_name': 'Chrome',
    'al:web:url': 'https://wseemkharma.vercel.app',
    'al:ios:url': 'https://wseemkharma.vercel.app',
    'al:ios:app_store_id': '585027354', // Chrome's App Store ID (optional)
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/favicon.ico?v=2" // Change version number when updating
        />
      </head>
      <body className={`${ubuntu.className} antialiased`}>
        <NextIntlClientProvider locale="en" messages={enMessages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
