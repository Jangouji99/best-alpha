import { Suspense } from 'react';
import DownloadApps from '@components/common/download-apps';
import Divider from '@components/ui/divider';
import { Metadata } from 'next';
import AllProductsPageContent from './all-products-page-content';

export const metadata: Metadata = {
  title: 'Best Alpha Limited - Quality Beverages, Condiments, Grains, and More',
  description: 'Explore the extensive range of products at Best Alpha Limited. From refreshing beverages and flavorful condiments to wholesome grains and frozen meat, find everything you need in one place. Shop now and enjoy the best quality products!',
  keywords: 'Best Alpha Limited, beverages, condiments, grains, frozen meat, quality products, online shopping, food products, grocery items'
};

export default async function Page({
  params: { lang, searchParams },
}: {
  params: {
    lang: string;
    searchParams: string
  };
}) {


  function SearchBarFallback() {
    return <>Loading...</>;
  }

  return (
    <>
      <Divider />
      <Suspense fallback={<SearchBarFallback />}>
        <AllProductsPageContent lang={lang} />
      </Suspense>
      <DownloadApps lang={lang} />
    </>
  );
}
