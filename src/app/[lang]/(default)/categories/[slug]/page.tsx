import DownloadApps from '@components/common/download-apps';
import PageHeroSection from '@components/ui/page-hero-section';
import { Metadata } from 'next';
import { Suspense } from 'react';
import CategoryPageContent from './category-page-content';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { CategoryResponse, CategorySeo } from '@framework/types';
import Divider from '@components/ui/divider';

type Props = {
  params: { lang: string; slug: string }
}

export async function generateMetadata(
  { params: { lang, slug } }: Props
): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_REST_API_ENDPOINT
  const imageUrl = process.env.NEXT_PUBLIC_URL_CATEGORY_IMG
  const publicUrl = process.env.NEXT_PUBLIC_WEBSITE_URL
  const response = await fetch(`${baseUrl}${API_ENDPOINTS.PRODUCTS_BY_CATEGORY}/${slug}?lang=${lang}$fields=seo`).then((res) => res.json()) as CategorySeo
  const { data: { category } } = response
  return {
    title: category?.seo?.metaTitle,
    description: category?.seo?.metaDescription,
    keywords: category?.seo?.keywords,
    openGraph: {
      title: category?.translatedName,
      description: category?.translatedDescription,
      url: `${publicUrl}/${lang}/categories/${slug}`,
      siteName: 'Best Alpha',
      images: [
        {
          url: `${imageUrl}${category?.image?.desktop || ''}`,
          width: 800,
          height: 600,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  }
}

export default async function Page({ params: { lang, slug } }: Props) {

  function SearchBarFallback() {
    return <>Loading...</>;
  }
  return (
    <>
      {/* <PageHeroSection heroTitle="text-all-grocery-items" lang={lang} /> */}
      <Divider />
      <Suspense fallback={<SearchBarFallback />}>
        <CategoryPageContent lang={lang} categorySlug={slug} />
      </Suspense>
      <DownloadApps lang={lang} />
    </>
  );
}
