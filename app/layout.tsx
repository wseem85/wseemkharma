import { ubuntu } from '@/app/lib/fonts';
import './ui/global.css';
import Navbar from './ui/navbar';
import Footer from './ui/footer';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Wseem Kharma',
  description: 'A Portfolio Web App for Engineer Wseem Kharma.',
  metadataBase: new URL('https://wseemkharma.vercel.app'),
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
