import SectionHeader from '@components/common/section-header';
import ProductCardAlpine from '@components/product/product-cards/product-card-alpine';
import ProductCardOak from '@components/product/product-cards/product-card-oak';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import { Collection, Product } from '@framework/types';
import Alert from '@components/ui/alert';
import cn from 'classnames';

interface ProductsProps {
  lang: string;
  headingPosition?: 'left' | 'center';
  className?: string;
  collection?: Collection;
  products?: Product[];
  loading: boolean;
  error?: string;
  uniqueKey?: string;
  variant?: string;
}

const ProductsGridBlock: React.FC<ProductsProps> = ({
  headingPosition = 'center',
  className = 'mb-12 lg:mb-14 xl:mb-16',
  collection,
  products,
  loading,
  error,
  uniqueKey,
  variant = 'alpine',
  lang,
}) => {
  return (
    <div className={`${className}`}>
      <SectionHeader
        sectionHeading={collection?.translatedName}
        sectionSubHeading={collection?.translatedDescription}
        headingPosition={headingPosition}
        lang={lang}
      />
      <div
        className={cn(
          'grid',
          {
            'grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 md:gap-4 2xl:gap-5':
              variant === 'alpine',
          },
          {
            'grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 md:gap-4 2xl:gap-5':
              variant === 'oak',
          },
        )}
      >
        {error ? (
          <Alert message={error} className="col-span-full" />
        ) : loading && !products?.length ? (
          Array.from({ length: products?.length! }).map((_, idx) => (
            <ProductCardLoader
              key={`${uniqueKey}-${idx}`}
              uniqueKey={`${uniqueKey}-${idx}`}
            />
          ))
        ) : (
          products?.map((product: any) =>
            variant === 'oak' ? (
              <ProductCardOak
                key={`${uniqueKey}-${product.productId.id}`}
                product={product.productId}
                lang={lang}
              />
            ) : (
              <ProductCardAlpine
                key={`${uniqueKey}-${product.productId.id}`}
                product={product.productId}
                lang={lang}
              />
            ),
          )
        )}
      </div>
    </div>
  );
};

export default ProductsGridBlock;
