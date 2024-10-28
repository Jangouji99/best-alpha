'use client';

import ProductWishlistGrid from '@components/product/wishlist-product';
import { FavoriteItem } from '@framework/types';
import { useTranslation } from 'src/app/i18n/client';

export default function Wishlist({ lang }: { lang: string }) {
  const { t } = useTranslation(lang, 'common');
  const getAllFavoriteItemIds = (): string[] => {
    if (typeof window === 'undefined') {
      return [];
    }
    // Retrieve favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]') as FavoriteItem[];
    // Filter to include only saved items and return their itemId
    return favorites
      .filter((item) => item.isSaved)
      .map((item) => item.itemId);
  };
  // usage
  const favoriteItemIds = getAllFavoriteItemIds();


  return (
    <>
      <h2 className="text-base md:text-lg xl:text-[20px] font-semibold text-brand-dark  lg:pt-0">
        {t('text-account-wishlist')}
      </h2>
      <div className="flex flex-col pt-8 2xl:pt-12">
        <ProductWishlistGrid lang={lang} productIds={favoriteItemIds.toString()} />
      </div>
    </>
  );
}
