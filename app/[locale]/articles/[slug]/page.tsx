import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { articleDefinitions } from '@/app/lib/articles';

type ArticlePageProps = { params: Promise<{ locale: string; slug: string }> };

const codeExamplePattern =
  /(?:[A-Za-z_$][\w$]*\s*=\s*)?(?:socket|connect|sendto|send|bind|listen|accept|recvfrom)\([^.;]+\);?/;
const markedCodePattern = /^\[\[code\]\]([\s\S]+)\[\[\/code\]\]$/;

function ArticleParagraph({ text }: { text: string }) {
  const markedCode = text.match(markedCodePattern);
  if (markedCode) {
    return (
      <pre className="article-code" dir="ltr">
        <code>{markedCode[1]}</code>
      </pre>
    );
  }

  const match = text.match(codeExamplePattern);
  if (!match || match.index === undefined) {
    return <p>{text}</p>;
  }

  const before = text.slice(0, match.index).replace(/[：:]\s*$/, '');
  const after = text.slice(match.index + match[0].length).trim();

  return (
    <>
      {before && <p>{before}</p>}
      <pre className="article-code" dir="ltr">
        <code>{match[0]}</code>
      </pre>
      {after && <p>{after}</p>}
    </>
  );
}

export function generateStaticParams() {
  return articleDefinitions.map(({ id }) => ({ slug: id }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = articleDefinitions.find((item) => item.id === slug);
  if (!article) return {};
  const t = await getTranslations({
    locale,
    namespace: `articles.items.${slug}`,
  });
  return {
    title: t('title'),
    description: t('excerpt'),
    alternates: {
      canonical: `/${locale}/articles/${slug}`,
      languages: {
        en: `/en/articles/${slug}`,
        ar: `/ar/articles/${slug}`,
      },
    },
    openGraph: {
      type: 'article',
      url: `/${locale}/articles/${slug}`,
      title: t('title'),
      description: t('excerpt'),
      images: [article.image],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params;
  const article = articleDefinitions.find((item) => item.id === slug);
  if (!article) notFound();
  const articleT = await getTranslations({
    locale,
    namespace: `articles.items.${slug}`,
  });
  const articlesT = await getTranslations({ locale, namespace: 'articles' });
  const content = articleT.raw('content') as string[];

  return (
    <main className="relative top-[100px] mx-auto my-12 max-w-4xl px-4 pb-16 sm:my-16 sm:px-6 lg:my-20">
      <article>
        <Link
          href="/articles"
          className="mb-8 inline-flex items-center gap-3 text-sm font-semibold text-gray-400 transition hover:text-white"
        >
          <span aria-hidden="true">←</span>
          {articlesT('backToArticles')}
        </Link>
        <header className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-red-groundlight">
            {articlesT('eyebrow')}
          </p>
          <h1 className="head-text">{articleT('title')}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
            {articleT('excerpt')}
          </p>
          <p className="mt-4 text-sm text-gray-500">
            {articlesT('published', { date: articleT('date') })}
          </p>
        </header>
        <div className="relative mb-10 aspect-[16/8] overflow-hidden rounded-2xl border border-white/10 bg-black/30">
          <Image
            src={article.image}
            alt=""
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
            priority
          />
        </div>
        <div className="article-content mx-auto max-w-3xl text-base leading-8 text-gray-300 sm:text-lg">
          {content.map((paragraph, index) => (
            <ArticleParagraph key={`${index}-${paragraph}`} text={paragraph} />
          ))}
        </div>
      </article>
    </main>
  );
}
