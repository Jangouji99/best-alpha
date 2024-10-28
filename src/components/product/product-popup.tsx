import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import isEmpty from 'lodash/isEmpty';
import { ROUTES } from '@utils/routes';
import Button from '@components/ui/button';
import Counter from '@components/ui/counter';
import { useCart } from '@contexts/cart/cart.context';
import ProductAttributes from '@components/product/product-attributes';
import { generateCartItem } from '@utils/generate-cart-item';
import { useTranslation } from 'src/app/i18n/client';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import Image from '@components/ui/image';
import CartIcon from '@components/icons/cart-icon';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import TagLabel from '@components/ui/tag-label';
import LabelIcon from '@components/icons/label-icon';
import { IoArrowRedoOutline } from 'react-icons/io5';
import RelatedProductFeed from '@components/product/feeds/related-product-feed';
import SocialShareBox from '@components/ui/social-share-box';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';
import {
  useModalAction,
  useModalState,
} from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import VariationPrice from './variation-price';
import isEqual from 'lodash/isEqual';
import { productGalleryPlaceholder } from '@assets/placeholders';
import { useProductQuery } from '@framework/product/get-product';
import { FavoriteItem } from '@framework/types';
const breakpoints = {
  '1536': {
    slidesPerView: 6,
  },
  '1280': {
    slidesPerView: 5,
  },
  '1024': {
    slidesPerView: 4,
  },
  '640': {
    slidesPerView: 3,
  },
  '360': {
    slidesPerView: 2,
  },
  '0': {
    slidesPerView: 1,
  },
};

export default function ProductPopup({ lang }: { lang: string }) {
  const { t } = useTranslation(lang, 'common');
  const { data } = useModalState();
  const { data: modalData } = useModalState();
  const { data: product, isLoading, error } = useProductQuery(data.slug, lang)
  const itemId = product?.data?.product?._id
  const { width } = useWindowSize();
  const { closeModal } = useModalAction();
  const router = useRouter();
  const { addItemToCart, isInCart, getItemFromCart, isInStock } = useCart();

  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [attributeUnit, setAttributeUnit] = useState<{ [key: string]: string }>({});
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [addToWishlistLoader, setAddToWishlistLoader] =
    useState<boolean>(false);
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);

  const { slug, images, translatedName, thumbnail, units, translatedDescription, translatedTags, quantity } = data;
  const productUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${lang}${ROUTES.PRODUCT}/${slug}`;
  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };


  // Reset attributeUnit when modalData or modal is opened
  useEffect(() => {
    if (modalData) {
      setAttributeUnit({});
    }
  }, [modalData]);



  const isSelected = !isEmpty(units) ? !isEmpty(attributeUnit) : true;
  let selectedUnit: any = {};
  if (isSelected) {
    selectedUnit = attributeUnit['unit']
  }


  const item = generateCartItem(data, selectedUnit);
  const outOfStock = isInCart(item.id) && !isInStock(item.id);

  function addToCart() {
    if (!isSelected) return;
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);

    addItemToCart(item, selectedQuantity);
    // @ts-ignore
    toast(t('text-added-bag'), {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }


  // Check if the item is already saved in the local storage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isItemFavorite = savedFavorites.some((item: FavoriteItem) => item.itemId === itemId && item.isSaved);
    setFavorite(isItemFavorite);
  }, [itemId]);

  function addToWishlist() {
    setAddToWishlistLoader(true);
    const newFavoriteStatus = !favorite;
    setFavorite(newFavoriteStatus);

    // Get the current list of favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    // Update the favorite status for the item
    if (newFavoriteStatus) {
      // Add to favorites if not already added
      favorites.push({ itemId, isSaved: true });
    } else {
      // Remove from favorites if already added
      favorites = favorites.filter((item: FavoriteItem) => item.itemId !== itemId);
    }

    // Save the updated favorites list to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Toast notification
    const toastStatus: string =
      newFavoriteStatus === true ? t('text-added-favorite') : t('text-remove-favorite');
    setTimeout(() => {
      setAddToWishlistLoader(false);
    }, 1500);
    toast(toastStatus, {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }



  function navigateToProductPage() {
    closeModal();
    router.push(`/${lang}/${ROUTES.PRODUCT}/${slug}`);
  }

  useEffect(() => setSelectedQuantity(1), [data._id]);

  const baseUrl = process.env.NEXT_PUBLIC_URL_PRODUCT_IMG
  const imageUrl = thumbnail?.desktop ? `${baseUrl}${thumbnail?.desktop}` : productGalleryPlaceholder

  return (
    <div className="md:w-[600px] lg:w-[940px] xl:w-[1180px] 2xl:w-[1360px] mx-auto p-1 lg:p-0 xl:p-3 bg-brand-light rounded-md">
      <CloseButton onClick={closeModal} />
      <div className="overflow-hidden">
        <div className="px-4 pt-4 md:px-6 lg:p-8 2xl:p-10 mb-9 lg:mb-2 md:pt-7 2xl:pt-10">
          <div className="items-start justify-between lg:flex">
            <div className="items-center justify-center mb-6 overflow-hidden xl:flex md:mb-8 lg:mb-0">
              {!!images?.length ? (
                <ThumbnailCarousel gallery={images} lang={lang} />
              ) : (
                <div className="flex items-center justify-center w-auto">
                  <Image
                    src={imageUrl}
                    alt={translatedName}
                    width={650}
                    height={590}
                    style={{ width: 'auto' }}
                  />
                </div>
              )}
            </div>

            <div className="shrink-0 flex flex-col lg:ltr:pl-5 lg:rtl:pr-5 xl:ltr:pl-8 xl:rtl:pr-8 2xl:ltr:pl-10 2xl:rtl:pr-10 lg:w-[430px] xl:w-[470px] 2xl:w-[480px]">
              <div className="pb-5">
                <div
                  className="mb-2 md:mb-2.5 block -mt-1.5"
                  onClick={navigateToProductPage}
                  role="button"
                >
                  <h2 className="text-lg font-medium transition-colors duration-300 text-brand-dark md:text-xl xl:text-2xl hover:text-brand">
                    {translatedName}
                  </h2>

                </div>

              </div>
              {!isEmpty(units) && (
                <ProductAttributes
                  key={`popup-attribute-key-${units[0]._id}`}
                  units={units}
                  attributeUnit={attributeUnit}
                  setAttributes={setAttributeUnit}
                />
              )}


              <div className="pb-2">
                {/* check that item isInCart and place the available quantity or the item quantity */}
                {/* {isEmpty(units) && (
                  <>
                    {Number(quantity) > 0 || !outOfStock ? (
                      <span className="text-sm font-medium text-yellow">
                        {t('text-only') +
                          ' ' +
                          quantity +
                          ' ' +
                          t('text-left-item')}
                      </span>
                    ) : (
                      <div className="text-base text-brand-danger whitespace-nowrap">
                        {t('text-out-stock')}
                      </div>
                    )}
                  </>
                )} */}

                {!isEmpty(selectedUnit) && (
                  <span className="text-sm font-medium text-yellow">
                    {selectedUnit?.is_disable ||
                      selectedUnit.quantity === 0
                      ? t('text-out-stock')
                      : `${t('text-only') +
                      ' ' +
                      selectedUnit.quantity +
                      ' ' +
                      t('text-left-item')
                      }`}
                  </span>
                )}
              </div>

              <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
                <Counter
                  variant="single"
                  value={selectedQuantity}
                  onIncrement={() => setSelectedQuantity((prev) => prev + 1)}
                  onDecrement={() =>
                    setSelectedQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
                  }
                  disabled={
                    isInCart(item.id)
                      ? getItemFromCart(item.id).quantity + selectedQuantity >=
                      Number(item.stock)
                      : selectedQuantity >= Number(item.stock)
                  }
                  lang={lang}
                />
                <Button
                  onClick={addToCart}
                  className="w-full px-1.5"
                  disabled={!isSelected}
                  loading={addToCartLoader}
                >
                  <CartIcon color="#ffffff" className="ltr:mr-3 rtl:ml-3" />
                  {t('text-add-to-cart')}
                </Button>
                <div className="grid grid-cols-2 gap-2.5">
                  <Button
                    variant="border"
                    onClick={addToWishlist}
                    loading={addToWishlistLoader}
                    className={`group hover:text-brand ${favorite === true && 'text-brand'
                      }`}
                  >
                    {favorite === true ? (
                      <IoIosHeart className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all text-brand" />
                    ) : (
                      <IoIosHeartEmpty className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all group-hover:text-brand" />
                    )}

                    {t('text-wishlist')}
                  </Button>
                  <div className="relative group">
                    <Button
                      variant="border"
                      className={`w-full hover:text-brand ${shareButtonStatus === true && 'text-brand'
                        }`}
                      onClick={handleChange}
                    >
                      <IoArrowRedoOutline className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all group-hover:text-brand" />
                      {t('text-share')}
                    </Button>
                    <SocialShareBox
                      className={`absolute z-10 ltr:right-0 rtl:left-0 w-[300px] md:min-w-[400px] transition-all duration-300 ${shareButtonStatus === true
                        ? 'visible opacity-100 top-full'
                        : 'opacity-0 invisible top-[130%]'
                        }`}
                      shareUrl={productUrl}
                      lang={lang}
                    />
                  </div>
                </div>
              </div>
              {translatedTags && (
                <ul className="pt-5 xl:pt-6">
                  <li className="relative inline-flex items-center justify-center text-sm md:text-15px text-brand-dark text-opacity-80 ltr:mr-2 rtl:ml-2 top-1">
                    <LabelIcon className="ltr:mr-2 rtl:ml-2" /> {t('text-tags')}
                    :
                  </li>
                  {translatedTags?.map((item: any, index: number) => (
                    <li className="inline-block p-[3px]" key={`tag-${index}`}>
                      <TagLabel data={item} lang={lang} />
                    </li>
                  ))}
                </ul>
              )}

              <div className="pt-6 xl:pt-8">
                <Heading className="mb-3 lg:mb-3.5">
                  {t('text-product-details')}:
                </Heading>
                <Text variant="small">
                  {translatedDescription.split(' ').slice(0, 40).join(' ')}
                  {'...'}
                  <span
                    onClick={navigateToProductPage}
                    role="button"
                    className="text-brand ltr:ml-0.5 rtl:mr-0.5"
                  >
                    {t('text-read-more')}
                  </span>
                </Text>
              </div>
            </div>
          </div>
        </div>
        <RelatedProductFeed
          data={product?.data.relatedProducts || []}
          carouselBreakpoint={breakpoints}
          className="mb-0.5 md:mb-2 lg:mb-3.5 xl:mb-4 2xl:mb-6"
          lang={lang}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
