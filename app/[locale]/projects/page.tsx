import Projects from '../../projects/page';
import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const pages = await getTranslations({locale, namespace: 'pages'});
  const projects = await getTranslations({locale, namespace: 'projects'});
  return {
    title: pages('selectedWork'),
    description: projects('intro'),
  };
}

export default Projects;
