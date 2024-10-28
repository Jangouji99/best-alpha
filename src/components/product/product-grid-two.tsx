import { useState, type FC } from 'react';
import { usePathname } from 'next/navigation';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import ProductCardAlpine from '@components/product/product-cards/product-card-alpine';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import cn from 'classnames';
import { useProductsByCategoryQuery } from '@framework/product/get-products-by-category';
import { Product } from '@framework/types';
import { useTranslation } from 'src/app/i18n/client';
import useQueryParam from '@utils/use-query-params';

interface ProductGridProps {
  lang: string;
  categorySlug: string;
  className?: string;
}

export const ProductGridTwo: FC<ProductGridProps> = ({ className = '', lang, categorySlug }) => {
  const { t } = useTranslation(lang, 'common');
  const pathname = usePathname();
  const { getParams, query } = useQueryParam(pathname ?? '/');
  const newQuery: any = getParams(
    // @ts-ignore
    `${process.env.NEXT_PUBLIC_WEBSITE_URL}${query}`,
  );
  const {
    data,
    error,
    isLoading
  } = useProductsByCategoryQuery({
    slug: categorySlug,
    lang: lang,
    // @ts-ignore
    newQuery,
  });
  const products = Array.isArray(data) ? data : [];

  return (
    <>
      {/* <div
        className={cn(
          'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3 md:gap-4 2xl:gap-5',
          className,
        )}
      >
        {error ? (
          <div className="col-span-full">
            <Alert message={error?.message} />
          </div>
        ) : isLoading && products.length === 0 ? (
          Array.from({ length: 30 }).map((_, idx) => (
            <ProductCardLoader
              key={`product--key-${idx}`}
              uniqueKey={`product--key-${idx}`}
            />
          ))
        ) : (
          data?.map((product: Product) => (
            <ProductCardAlpine
              key={`product--key-${product.id}`}
              product={product}
              lang={lang}
            />
          ))
        )}
      </div> */}

      {/* <div className="pt-8 text-center xl:pt-10">
        <Button
          loading={true}
          disabled={products.length >= 20}
          onClick={handleLoadMore}
        >
          {t('button-load-more')}
        </Button>
      </div> */}
    </>
  );
};
