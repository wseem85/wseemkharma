'use client';

import {useEffect} from 'react';
import {useLocale} from 'next-intl';
import {usePathname} from '@/i18n/navigation';

export default function LocaleDocument({locale}: {locale: string}) {
  const currentLocale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, currentLocale]);

  return null;
}
