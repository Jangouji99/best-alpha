'use client';

import DownloadApps from '@components/common/download-apps';
import RelatedProductFeed from '@components/product/feeds/related-product-feed';
import ProductSingleDetails from '@components/product/product';
import Breadcrumb from '@components/ui/breadcrumb';
import Container from '@components/ui/container';
import Divider from '@components/ui/divider';
import { useProductQuery } from '@framework/product/get-product';



export default function SingleProductsContent({ lang, slug }: { lang: string; slug: string }) {
  const { data, isLoading, error } = useProductQuery(slug, lang)

  return (
    <>
      <Divider />
      <div className="pt-6 lg:pt-7">
        <Container>
          <Breadcrumb lang={lang} />
          <ProductSingleDetails lang={lang} data={data?.data.product} isLoading={isLoading} />
        </Container>
      </div>

      <RelatedProductFeed
        uniqueKey="related-products"
        lang={lang}
        data={data?.data.relatedProducts || []}
        isLoading={isLoading}
      />
      {/* <PopcornJerkyProductFeed lang={lang} /> */}
      <DownloadApps lang={lang} />
    </>
  );
}
