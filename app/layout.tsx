import { inter, ubuntu } from '@/app/lib/fonts';
import './ui/global.css';
import Navbar from './ui/navbar';
import Footer from './ui/footer';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
