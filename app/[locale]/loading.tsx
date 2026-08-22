import { getLocale } from 'next-intl/server';
import PageLoading from '../components/page-loading';

export default async function LocaleLoading() {
  const locale = await getLocale();
  return <PageLoading locale={locale} />;
}
