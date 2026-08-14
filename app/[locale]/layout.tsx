import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navbar from '../ui/navbar';
import Footer from '../ui/footer';
import { routing } from '../../i18n/routing';
import LocaleDocument from '../components/locale-document';
import { cairo } from '@/app/lib/fonts';

const siteUrl = 'https://wseemkharma.vercel.app';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = routing.locales.includes(locale as 'en' | 'ar')
    ? (locale as 'en' | 'ar')
    : routing.defaultLocale;
  const t = await getTranslations({
    locale: validLocale,
    namespace: 'metadata',
  });
  const keywords = t.raw('keywords') as string[];
  const localeTag = validLocale === 'ar' ? 'ar_SA' : 'en_US';

  return {
    metadataBase: new URL(siteUrl),
    verification: {
      google: 'vZUmA_hcaaKgD7RPvOx0w8UANA4VrXCJaAv5-_J8JrE',
    },
    title: {
      default: t('title'),
      template: `%s | Wseem Kharma`,
    },
    description: t('description'),
    keywords,
    authors: [{ name: 'Wseem Kharma' }],
    creator: 'Wseem Kharma',
    publisher: 'Wseem Kharma',
    alternates: {
      canonical: `/${validLocale}`,
      languages: {
        en: '/en',
        ar: '/ar',
        'x-default': '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: localeTag,
      url: `/${validLocale}`,
      siteName: 'Wseem Kharma',
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/opengraph-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
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
