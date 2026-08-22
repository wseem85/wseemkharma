import Image from 'next/image';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { articleDefinitions, articlesPerPage } from '@/app/lib/articles';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'articles' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/articles`,
      languages: { en: '/en/articles', ar: '/ar/articles' },
    },
  };
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: rawPage } = await searchParams;
  const t = await getTranslations('articles');
  const totalPages = Math.max(
    1,
    Math.ceil(articleDefinitions.length / articlesPerPage),
  );
  const requestedPage = Number.parseInt(rawPage ?? '1', 10);
  const page = Number.isFinite(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), totalPages)
    : 1;
  const visibleArticles = articleDefinitions.slice(
    (page - 1) * articlesPerPage,
    page * articlesPerPage,
  );

  return (
    <main className="relative top-[100px] mx-auto my-12 max-w-7xl px-4 pb-16 sm:my-16 sm:px-6 lg:my-20 lg:px-8">
      <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-red-groundlight">
          {t('eyebrow')}
        </p>
        <h1 className="head-text">{t('title')}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
          {t('description')}
        </p>
      </header>

      <div className="mb-6 flex items-center justify-between gap-4 text-sm text-gray-500">
        <span>{t('articlesCount', { count: articleDefinitions.length })}</span>
        <span>{t('page', { current: page, total: totalPages })}</span>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleArticles.map((article, index) => (
          <article
            key={article.id}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#151617] shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-red-ground/40"
          >
            <Link
              href={`/articles/${article.id}`}
              className="relative block aspect-[16/9] overflow-hidden bg-black/30"
              aria-label={t('items.' + article.id + '.title')}
            >
              <Image
                src={article.image}
                alt={t('items.' + article.id + '.title')}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
                priority={page === 1 && index < 2}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </Link>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-red-groundlight">
                {t('items.' + article.id + '.date')}
              </p>
              <h2 className="mt-3 text-xl font-bold leading-tight text-white sm:text-2xl">
                {t('items.' + article.id + '.title')}
              </h2>
              <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-400 sm:text-base">
                {t('items.' + article.id + '.excerpt')}
              </p>
              <Link
                href={`/articles/${article.id}`}
                className="mt-6 inline-flex w-fit items-center gap-3 rounded-lg bg-red-ground px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-groundlight"
              >
                {t('readArticle')} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <nav
          className="mt-10 flex items-center justify-center gap-3"
          aria-label={t('eyebrow')}
        >
          {page > 1 ? (
            <Link
              href={{
                pathname: '/articles',
                query: { page: String(page - 1) },
              }}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:border-red-ground/50 hover:text-white"
            >
              {t('previous')}
            </Link>
          ) : (
            <span className="cursor-not-allowed rounded-lg border border-white/5 px-4 py-2 text-sm text-gray-600">
              {t('previous')}
            </span>
          )}
          <span
            className="rounded-lg bg-red-ground px-4 py-2 text-sm font-semibold text-white"
            aria-current="page"
          >
            {page}
          </span>
          {page < totalPages ? (
            <Link
              href={{
                pathname: '/articles',
                query: { page: String(page + 1) },
              }}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:border-red-ground/50 hover:text-white"
            >
              {t('next')}
            </Link>
          ) : (
            <span className="cursor-not-allowed rounded-lg border border-white/5 px-4 py-2 text-sm text-gray-600">
              {t('next')}
            </span>
          )}
        </nav>
      )}
    </main>
  );
}
