import { ubuntu } from '@/app/lib/fonts';
import './ui/global.css';
import Navbar from './ui/navbar';
import Footer from './ui/footer';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Wseem Kharma',
  description: 'A Portfolio Web App for Engineer Wseem Kharma.',
  metadataBase: new URL('https://wseemkharma.vercel.app'),
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
        <>
          <Navbar />
          {children}
          <Footer />
        </>
      </body>
    </html>
  );
}
