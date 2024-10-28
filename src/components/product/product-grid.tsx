import { useEffect, useState, type FC } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import ProductCardAlpine from '@components/product/product-cards/product-card-alpine';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import cn from 'classnames';
import { useProductsQuery } from '@framework/product/get-all-products';
import { LIMITS } from '@framework/utils/limits';
import { Product } from '@framework/types';
import { useTranslation } from 'src/app/i18n/client';
import useQueryParam from '@utils/use-query-params';
import SearchTopBar from '@components/search/search-top-bar';

interface ProductGridProps {
  lang: string;
  products: Product[];
  className?: string;
}

export const ProductGrid: FC<ProductGridProps> = ({ className = '', lang, products }) => {
  const { t } = useTranslation(lang, 'common');

  return (
    <div
      className={cn(
        'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3 md:gap-4 2xl:gap-5',
        className,
      )}
    >
      {products?.map((product) => (
        <ProductCardAlpine
          key={`product--key-${product.id}`}
          product={product}
          lang={lang}
        />
      ))}

      {/* end of error state */}
    </div>
  );
};
