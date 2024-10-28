import WishlistProductCard from '@components/product/wishlist-product-card';
import { useWishlistProductsQuery } from '@framework/product/get-wishlist-product';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import Alert from '@components/ui/alert';
import cn from 'classnames';
import Image from 'next/image';
import noResultsImage from '@public/assets/images/empty-wishlist.png'
import { useTranslation } from 'src/app/i18n/client';
interface ProductWishlistProps {
  className?: string;
  lang: string;
  productIds: string;
}

export default function ProductWishlistGrid({
  className = '',
  lang,
  productIds
}: ProductWishlistProps) {
  const limit = 35;
  const { t } = useTranslation(lang, 'common');
  const { data, isLoading, error } = useWishlistProductsQuery({
    lang: lang,
    id: productIds,
    limit: limit,
  });

  if (error || data?.length == 0) {
    return (
      <>
        <div className="text-center my-24 mb-20 lg:mb-56">
          <Image
            src={noResultsImage}
            alt={t('wishlist_empty')}
            width={250}
            height={250}
            className="mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-black">{t('wishlist_empty')}</h2>
        </div>
      </>
    );
  }

  return (
    <div className={cn(className)}>
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div className="flex flex-col">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-[64vh] text-center">
              <div className="loader"></div>
            </div>
          ) : (
            data?.map((product: any) => (
              <WishlistProductCard
                key={`product--key${product._id}`}
                product={product}
                lang={lang}
              />
            ))
          )}
        </div>
      )}
    </div>
  );

}
