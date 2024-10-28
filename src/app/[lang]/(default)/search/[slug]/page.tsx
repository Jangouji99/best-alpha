import { Suspense } from 'react';
import DownloadApps from '@components/common/download-apps';
import Divider from '@components/ui/divider';
import { Metadata } from 'next';
import SearchPageContent from './search-page-content';
type Props = {
  params: { lang: string; slug: string }
}
export const metadata: Metadata = {
  title: 'Search',
};

export default async function Page({ params: { lang, slug } }: Props) {

  function SearchBarFallback() {
    return <>Loading...</>;
  }

  return (
    <>
      <Divider />
      <Suspense fallback={<SearchBarFallback />}>
        <SearchPageContent lang={lang} search={slug} />
      </Suspense>
      <DownloadApps lang={lang} />
    </>
  );
}
