'use client';

import cn from 'classnames';
import { useCart } from '@contexts/cart/cart.context';
import Text from '@components/ui/text';
import Button from '@components/ui/button';
import { CheckoutItem } from '@components/checkout/checkout-card-item';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'src/app/i18n/client';
import { useIsMounted } from '@utils/use-is-mounted';
import { useEffect, useState } from 'react';
import SearchResultLoader from '@components/ui/loaders/search-result-loader';
import { useSendQuotation } from '@framework/order/send-quotation';
import { useCompany } from '@contexts/company/company-context';
import { OrderData, Product } from '@framework/types';
import LottieAnimate from '@components/loading/LottieAnimate';
import { useWishlistProductsQuery } from '@framework/product/get-wishlist-product';
import useWindowSize from '@utils/use-window-size';
import { toast } from 'react-toastify';
const CheckoutCard: React.FC<{ lang: string }> = ({ lang }) => {
  const { t } = useTranslation(lang, 'common');
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [toastLoader, setToastLoader] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  const { companyInfo } = useCompany();
  const { items, total, isEmpty } = useCart();
  const itemIds = items?.map((item) => item.productId);
  const { data } = useWishlistProductsQuery({
    lang,
    id: itemIds?.toString() || '',
  });
  const { width } = useWindowSize();

  // Update items in the cart with translatedName and thumbnail from the fetched data
  const updatedItems = items?.map((cartItem) => {
    const matchingData = data?.find((product: Product) => product._id === cartItem.productId);

    return {
      ...cartItem,
      translatedName: matchingData?.translatedName || cartItem.translatedName,
      thumbnail: matchingData?.thumbnail || cartItem.thumbnail,
    };
  });

  // Prepare orderData based on companyInfo and cart items
  const mappedItems = items?.map((item: any) => ({
    productId: item.productId,
    unitName: item.unit,
    quantity: item.quantity,
  })) || [];

  const orderData: OrderData = {
    companyInfo: {
      name: companyInfo?.companyName || '',
      address: {
        country: companyInfo?.country || '',
        city: companyInfo?.city || '',
        state: companyInfo?.region || '',
        zipCode: companyInfo?.postalCode || '',
        address: companyInfo?.streetAddress || '',
      },
      contact: companyInfo?.contact || '',
      email: companyInfo?.email || '',
      representative: companyInfo?.representative || '',
    },
    items: mappedItems,
  };

  // Use the useSendQuotation hook at the top level
  const { mutate: sendQuotation, data: quotation, isSuccess, error } = useSendQuotation();

  // Handler to trigger sending quotation
  const handleSendQuotation = () => {
    const isCompanyInfoValid = companyInfo && companyInfo.companyName && companyInfo.contact && companyInfo.email;
    if (!isCompanyInfoValid) {
      // Toast notification
      setToastLoader(true);
      setTimeout(() => {
        setToastLoader(false);
      }, 1500);

      // Add your toast notification here
      // @ts-ignore
      toast(t('company_info_missing'), {
        progressClassName: 'fancy-progress-bar',
        position: width! > 768 ? 'bottom-right' : 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundColor: '#ff4d4f', // Background color
          color: '#ffffff',           // Text color
        },
        progressStyle: {
          background: '#ffffff', // Progress bar color
        },
      });

      return;
    }

    setLoading(true);
    sendQuotation({ orderData, lang });
  };

  useEffect(() => {
    if (isSuccess && quotation) {
      // Save the quotation to local storage
      const existingQuotations = JSON.parse(localStorage.getItem('quotations') || '[]');
      existingQuotations.push(quotation);
      localStorage.setItem('quotations', JSON.stringify(existingQuotations));
      router.push(`/${lang}${ROUTES.ORDER}/${quotation._id}`);
    }
  }, [isSuccess, quotation, router, lang]);

  const mounted = useIsMounted();

  if (isLoading)
    return (
      <div className="py-16 xl:px-32 2xl:px-44 3xl:px-56 lg:py-20">
        <LottieAnimate />
      </div>
    );

  return (
    <>
      <div className="px-4 pt-4 border rounded-md border-border-base text-brand-light xl:py-6 xl:px-7">
        <div className="flex pb-2 text-sm font-semibold rounded-md text-heading">
          <span className="font-medium text-15px text-brand-dark capitalize">
            {t('items_for_quotation')}
          </span>
          <span className="font-medium ltr:ml-auto rtl:mr-auto shrink-0 text-15px text-brand-dark">
            {t('quantity')}
          </span>
        </div>
        {isLoading ? (
          <div className="w-full">
            <SearchResultLoader uniqueKey={`product-key`} />
          </div>
        ) : !isEmpty && mounted ? (
          updatedItems.map((item) => (
            <CheckoutItem item={item} key={item.id} />
          ))
        ) : (
          <p className="py-4 text-brand-danger text-opacity-70">
            {t('text-empty-cart')}
          </p>
        )}
        <Button
          variant="formButton"
          disabled={mounted && isEmpty}
          className={cn(
            'w-full mt-8 mb-5 rounded font-semibold px-4 py-3 transition-all',
            mounted && isEmpty
              ? 'opacity-40 cursor-not-allowed'
              : '!bg-brand !text-brand-light'
          )}
          onClick={handleSendQuotation}
        >
          {t('request_quotation')}
        </Button>
      </div>
      <Text className="mt-8">
        {t('request_quotation_one')}
      </Text>
      <Text className="mt-4">{t('request_quotation_two')}</Text>
    </>
  );
};

export default CheckoutCard;
