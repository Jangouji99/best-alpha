'use client';

import { useProductsByCollectionQuery } from '@framework/product/get-products-by-collection';
import SectionHeader from '@components/common/section-header';
import ProductCardAlpine from '@components/product/product-cards/product-card-alpine';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import Alert from '@components/ui/alert';
import ProductFlashSaleCoral from '@components/product/product-cards/product-flash-sale-coral';
import { useTranslation } from 'react-i18next';
import { Element } from 'react-scroll';
import { Collection } from '@framework/types';

interface ProductFeedProps {
  lang: string;
  className?: string;
}

export default function PopularProductWithBestDeals({
  lang,
  className = '',
}: ProductFeedProps) {
  const { t } = useTranslation('common');
  const id = process.env.NEXT_PUBLIC_COLLECTION_ID_TWO ?? '0'
  const { data, isLoading, error } = useProductsByCollectionQuery({
    collectionId: id,
    lang: lang,
  });
  const { products = [] } = data as Collection || {};
  // If loading, show multiple ProductCardLoaders
  if (isLoading) {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 ${className}`}>
        {[...Array(10)].map((_, index) => (
          <ProductCardLoader key={index} /> // Show the product card loader
        ))}
      </div>
    );
  }
  return (
    <div className={`-mt-2.5 mb-12 lg:mb-14 xl:mb-16 2xl:mb-20 ${className}`}>
      <SectionHeader
        sectionHeading={data?.translatedName}
        sectionSubHeading={data?.translatedDescription}
        headingPosition="center"
        lang={lang}
      />
      {/* @ts-ignore */}
      <Element
        name="grid"
        className="grid-cols-7 gap-3 md:grid lg:grid-cols-5 2xl:grid-cols-7 lg:gap-5 xl:gap-7"
      >
        <div className="md:sticky md:top-20 lg:top-24 md:h-[600px] lg:h-[690px] 3xl:h-auto col-span-3 lg:col-span-2 mb-3 md:mb-0">
          <div className="h-auto overflow-hidden border-2 border-brand rounded-md 3xl:h-full shadow-card">
            <h2 className="bg-brand text-center font-bold text-white font-manrope p-2.5 text-15px lg:text-base">
              {t('text-deals-of-the-week')}
            </h2>
            <ProductFlashSaleCoral
              product={products[0]?.productId!}
              date={Date.now() + 4000000 * 60}
              lang={lang}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 col-span-4 gap-3 lg:col-span-3 2xl:col-span-5 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 md:gap-4 2xl:gap-5">
          {error ? (
            <Alert message={error?.message} className="col-span-full" />
          ) : isLoading ? (
            Array.from({ length: products.length! }).map((_, idx) => (
              <ProductCardLoader
                key={`popular-product-${idx}`}
                uniqueKey={`popular-product-${idx}`}
              />
            ))
          ) : (
            products
              ?.slice(1, 11)
              ?.map((product: any) => (
                <ProductCardAlpine
                  key={`popular-product-${product.productId.id}`}
                  product={product.productId}
                  lang={lang}
                />
              ))
          )}
        </div>
      </Element>
    </div>
  );
}
