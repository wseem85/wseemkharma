import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import Navbar from '../ui/navbar';
import Footer from '../ui/footer';
import {routing} from '../../i18n/routing';
import LocaleDocument from '../components/locale-document';
import {cairo} from '@/app/lib/fonts';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;
  if (!routing.locales.includes(locale as 'en' | 'ar')) notFound();
  const messages = await getMessages();
  const currentLocale = await getLocale();

  return (
    <NextIntlClientProvider messages={messages}>
      <LocaleDocument locale={currentLocale} />
      <div
        lang={currentLocale}
        dir={currentLocale === 'ar' ? 'rtl' : 'ltr'}
        className={currentLocale === 'ar' ? cairo.className : undefined}
      >
        <Navbar />
        {children}
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
