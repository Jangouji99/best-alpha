'use client';

import type { FC } from 'react';
import { useProductsByCollectionQuery } from '@framework/product/get-products-by-collection';
import ProductsGridBlock from '../products-grid-block';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';

interface ProductFeedProps {
  lang: string;
  className?: string;
  variant?: string;
}


const BestSellerGroceryProductFeed: FC<ProductFeedProps> = ({
  lang,
  className,
  variant,
}) => {
  const id = process.env.NEXT_PUBLIC_COLLECTION_ID_ONE ?? '0'
  const { data, isLoading, error } = useProductsByCollectionQuery({
    collectionId: id,
    lang: lang
  });

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
    <ProductsGridBlock
      className={className}
      collection={data}
      products={data?.products}
      loading={isLoading}
      error={error?.message}
      uniqueKey="best-sellers"
      variant={variant}
      lang={lang}
    />
  );
};
export default BestSellerGroceryProductFeed;
