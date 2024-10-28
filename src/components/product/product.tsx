'use client';

import { useState, useEffect } from 'react';
import Button from '@components/ui/button';
import Counter from '@components/ui/counter';
import { useParams } from 'next/navigation';
import { ROUTES } from '@utils/routes';
import useWindowSize from '@utils/use-window-size';
import Text from '@components/ui/text';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem } from '@utils/generate-cart-item';
import ProductAttributes from '@components/product/product-attributes';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import Image from '@components/ui/image';
import CartIcon from '@components/icons/cart-icon';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import TagLabel from '@components/ui/tag-label';
import LabelIcon from '@components/icons/label-icon';
import { IoArrowRedoOutline } from 'react-icons/io5';
import SocialShareBox from '@components/ui/social-share-box';
import { useTranslation } from 'src/app/i18n/client';
import { FavoriteItem, Product } from '@framework/types';
import Heading from '@components/ui/heading';
import { productGalleryPlaceholder } from '@assets/placeholders';
import ProductDetailsLoader from '@components/ui/loaders/product-details-loader';
interface ProductSingleDetailsProps {
  lang: string;
  data?: Product;
  isLoading: any
}

const ProductSingleDetails: React.FC<ProductSingleDetailsProps> = ({ lang, data, isLoading }) => {

  const { t } = useTranslation(lang, 'common');
  const pathname = useParams();
  const { width } = useWindowSize();
  const itemId = data?._id
  const { addItemToCart, isInCart, getItemFromCart, isInStock } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [attributeUnit, setAttributeUnit] = useState<{ [key: string]: string }>({});
  const [favorite, setFavorite] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(1);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [addToWishlistLoader, setAddToWishlistLoader] =
    useState<boolean>(false);
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);
  const productUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${lang}/products/${data?.slug}`;

  // Check if the item is already saved in the local storage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isItemFavorite = savedFavorites.some((item: FavoriteItem) => item.itemId === itemId && item.isSaved);
    setFavorite(isItemFavorite);
  }, [itemId]);

  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };
  if (isLoading) {
    return (
      <ProductDetailsLoader />
    )
  }



  const isSelected = !isEmpty(data?.units) ? !isEmpty(attributeUnit) : true;
  let selectedUnit: any = {};
  if (isSelected) {
    selectedUnit = attributeUnit['unit']
  }


  const units = data?.units;

  const item = generateCartItem(data, selectedUnit);
  // const outOfStock = isInCart(item.id) && !isInStock(item.id);

  function addToCart() {
    if (!isSelected) return;
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);

    addItemToCart(item, selectedQuantity);
    toast('Added to the bag', {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }



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

  const imageUrl = data?.thumbnail?.desktop ? `${productUrl}${data?.thumbnail?.desktop}` : productGalleryPlaceholder;


  return (
    <div className="pt-6 pb-2 md:pt-7">
      <div className="grid-cols-10 lg:grid gap-7 2xl:gap-8">
        <div className="col-span-5 mb-6 overflow-hidden xl:col-span-6 md:mb-8 lg:mb-0">
          {!!data?.images?.length ? (
            <ThumbnailCarousel
              gallery={data?.images}
              thumbnailClassName="xl:w-[700px] 2xl:w-[900px]"
              galleryClassName="xl:w-[150px] 2xl:w-[170px]"
              lang={lang}
            />
          ) : (
            <div className="flex items-center justify-center w-auto">
              <Image
                src={imageUrl}
                alt={data?.translatedName!}
                width={900}
                height={680}
                style={{ width: 'auto' }}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col col-span-5 shrink-0 xl:col-span-4 xl:ltr:pl-2 xl:rtl:pr-2">
          <div className="pb-3 lg:pb-5">
            <div className="md:mb-2.5 block -mt-1.5">
              <h2 className="text-lg font-medium transition-colors duration-300 text-brand-dark md:text-xl xl:text-2xl">
                {data?.translatedName}
              </h2>
            </div>

          </div>
          {!isEmpty(units) && (
            <ProductAttributes
              key={`popup-attribute-key${units}`}
              units={units}
              attributeUnit={attributeUnit}
              setAttributes={setAttributeUnit}
            />
          )}

          <div className="pb-2">
            {/* check that item isInCart and place the available quantity or the item quantity */}
            {isEmpty(data?.units) && (
              <>
                {Number(quantity) > 0 ? (
                  <span className="text-sm font-medium text-yellow">
                    {t('text-only') +
                      ' ' +
                      quantity +
                      ' ' +
                      t('text-left-item')}
                  </span>
                ) : (
                  <div className="text-base text-red-500 whitespace-nowrap">
                    {t('text-out-stock')}
                  </div>
                )}
              </>
            )}

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
          {data?.translatedTags && (
            <ul className="pt-5 xl:pt-6">
              <li className="relative inline-flex items-center justify-center text-sm md:text-15px text-brand-dark text-opacity-80 ltr:mr-2 rtl:ml-2 top-1">
                <LabelIcon className="ltr:mr-2 rtl:ml-2" /> {t('text-tags')}:
              </li>
              {data?.translatedTags?.map((item: any) => (
                <li className="inline-block p-[3px]" key={`tag-${item.id}`}>
                  <TagLabel data={item} lang={lang} />
                </li>
              ))}
            </ul>
          )}
          <div className="text-sm sm:text-15px mt-5 text-brand-muted leading-[2em] space-y-4 lg:space-y-5 xl:space-y-7">
            <Heading className="lg:mb-3.5">
              {t('text-product-details')}:
            </Heading>
            <Text variant="small">{data?.translatedDescription} </Text>
          </div>
        </div>

      </div>
      {/* <ProductDetailsTab lang={lang} description={data?.translatedDescription} /> */}
    </div>
  );
};

export default ProductSingleDetails;
