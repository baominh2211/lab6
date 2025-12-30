import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import AppWrapper from '@/app/AppWrapper';
import { DocContent } from '@/components/docs';
import { docSections, docArticles, getArticlesBySection, getDocArticle, getDocSection } from '@/data/docs';

interface PageProps {
  params: Promise<{ section: string; slug: string }>;
}

export async function generateStaticParams() {
  const paths: { section: string; slug: string }[] = [];
  
  for (const section of docSections) {
    const articles = getArticlesBySection(section.id);
    for (const article of articles) {
      paths.push({
        section: section.slug,
        slug: article.slug,
      });
    }
  }
  
  return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section: sectionSlug, slug } = await params;
  const article = getDocArticle(sectionSlug, slug);
  const section = getDocSection(sectionSlug);
  
  if (!article || !section) {
    return { title: 'Not Found' };
  }

  return {
    title: `${article.title} | ${section.title}`,
    description: article.description,
    keywords: article.tags,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt,
      tags: article.tags,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { section: sectionSlug, slug } = await params;
  const section = getDocSection(sectionSlug);
  const article = getDocArticle(sectionSlug, slug);

  if (!section || !article) {
    notFound();
  }

  // Get prev/next articles for navigation
  const sectionArticles = getArticlesBySection(section.id);
  const currentIndex = sectionArticles.findIndex((a) => a.id === article.id);
  
  let prevArticle = null;
  let nextArticle = null;

  if (currentIndex > 0) {
    const prev = sectionArticles[currentIndex - 1];
    prevArticle = {
      slug: prev.slug,
      title: prev.title,
      sectionSlug: section.slug,
    };
  } else {
    // Look for last article in previous section
    const sectionIndex = docSections.findIndex((s) => s.id === section.id);
    if (sectionIndex > 0) {
      const prevSection = docSections[sectionIndex - 1];
      const prevSectionArticles = getArticlesBySection(prevSection.id);
      if (prevSectionArticles.length > 0) {
        const lastArticle = prevSectionArticles[prevSectionArticles.length - 1];
        prevArticle = {
          slug: lastArticle.slug,
          title: lastArticle.title,
          sectionSlug: prevSection.slug,
        };
      }
    }
  }

  if (currentIndex < sectionArticles.length - 1) {
    const next = sectionArticles[currentIndex + 1];
    nextArticle = {
      slug: next.slug,
      title: next.title,
      sectionSlug: section.slug,
    };
  } else {
    // Look for first article in next section
    const sectionIndex = docSections.findIndex((s) => s.id === section.id);
    if (sectionIndex < docSections.length - 1) {
      const nextSection = docSections[sectionIndex + 1];
      const nextSectionArticles = getArticlesBySection(nextSection.id);
      if (nextSectionArticles.length > 0) {
        const firstArticle = nextSectionArticles[0];
        nextArticle = {
          slug: firstArticle.slug,
          title: firstArticle.title,
          sectionSlug: nextSection.slug,
        };
      }
    }
  }

  return (
    <AppWrapper>
      <DocContent
        article={article}
        section={section}
        prevArticle={prevArticle}
        nextArticle={nextArticle}
      />
    </AppWrapper>
  );
}
