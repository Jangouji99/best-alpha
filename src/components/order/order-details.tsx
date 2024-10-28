
import { QuotationItem } from '@framework/types';
import Image from '@components/ui/image';
import Heading from '@components/ui/heading';
import { useTranslation } from 'src/app/i18n/client';
import { productGalleryPlaceholder } from '@assets/placeholders';


const OrderItemCard = ({ product, lang }: { product: QuotationItem, lang: string }) => {
  const { t } = useTranslation(lang, 'common');
  const baseUrl = process.env.NEXT_PUBLIC_URL_PRODUCT_IMG
  const imageUrl = product?.productId?.thumbnail?.desktop ? `${baseUrl}${product?.productId?.thumbnail?.desktop}` : productGalleryPlaceholder
  return (
    <tr className="font-normal border-b border-border-base last:border-b-0" key={product._id}>
      <td className="p-4">
        <div className="relative grid grid-cols-12 py-2 pb-0 text-[12px] md:text-[14px]">
          <div className="self-center col-span-2">
            <Image
              src={imageUrl}
              alt={product?.productId?.translatedName || 'Product Image'}
              width="60"
              height="60"
              quality={100}
              className="object-cover"
              style={{ width: 'auto' }}
            />
          </div>
          <div className="self-center col-span-7">
            <h2 className="text-brand-dark"> {product?.productId?.translatedName || t('product-deleted')} </h2>
            <p className="text-brand ">{product?.unitName}</p>
          </div>
        </div>
      </td>
      <td className="p-4">x {product?.quantity}</td>
    </tr>
  );
};

const OrderDetails: React.FC<{ className?: string; lang: string; quotationItems: QuotationItem[]; }> = ({
  className = 'pt-10 lg:pt-12',
  lang,
  quotationItems
}) => {
  const { t } = useTranslation(lang, 'common');

  return (
    <div className={className}>
      <Heading variant="heading" className="mb-6 xl:mb-7">
        {t('text-order-details')}:
      </Heading>
      <table className="w-full text-sm font-semibold text-brand-dark lg:text-base">
        <thead>
          <tr>
            <th className="w-1/2 p-4 bg-fill-secondary ltr:text-left rtl:text-right ltr:first:rounded-tl-md rtl:first:rounded-tr-md">
              {t('text-product')}
            </th>
            <th className="w-1/2 p-4 bg-fill-secondary ltr:text-left rtl:text-right ltr:last:rounded-tr-md rtl:last:rounded-tl-md">
              {t('quantity')}
            </th>
          </tr>
        </thead>
        <tbody>
          {quotationItems.map((quotationItem) => (
            <OrderItemCard key={quotationItem._id} product={quotationItem} lang={lang} />
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default OrderDetails;
