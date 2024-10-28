'use client';

import ProductsCarousel from '@components/product/products-carousel';
import { LIMITS } from '@framework/utils/limits';
import Image from 'next/image';
import { Product } from '@framework/types';
import productIsEmpty from '@public/assets/images/product-is-empty.webp'
interface RelatedProductsProps {
  lang: string;
  data: Product[];
  isLoading: boolean;
  error?: string;
  carouselBreakpoint?: {} | any;
  className?: string;
  uniqueKey?: string;
}


const RelatedProductFeed: React.FC<RelatedProductsProps> = ({
  lang,
  data,
  isLoading,
  error,
  carouselBreakpoint,
  className,
  uniqueKey = 'related-product-popup',
}) => {

  // Check if relatedProducts is not empty
  const isNotEmpty = data?.length > 0;
  return (
    <ProductsCarousel
      sectionHeading="text-related-products"
      categorySlug="/search"
      className={className}
      products={data}
      loading={isLoading}
      error={error}
      limit={LIMITS.RELATED_PRODUCTS_LIMITS}
      uniqueKey={uniqueKey}
      carouselBreakpoint={carouselBreakpoint}
      lang={lang}
    />
  );
};

export default RelatedProductFeed;
