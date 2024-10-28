
import Image from '@components/ui/image';
import { QuotationItem } from '@framework/types';

export const OrderDetailsContent: React.FC<{ item: QuotationItem }> = ({ item }) => {
  const imageUrl = process.env.NEXT_PUBLIC_URL_PRODUCT_IMG
  return (
    <div className="relative grid grid-cols-12 py-2 pb-0 border-b border-solid border-border-base text-[12px] md:text-[14px]">
      <div className="self-center col-span-2">
        <Image
          src={`${imageUrl}${item?.productId?.thumbnail?.desktop}`}
          alt={item?.productId?.translatedName || 'Product Image'}
          width="60"
          height="60"
          quality={100}
          className="object-cover"
          style={{ width: 'auto' }}
        />
      </div>
      <div className="self-center col-span-7">
        <h2 className="text-brand-dark">{item?.productId.translatedName}</h2>
      </div>
      <div className="self-center col-span-3 text-center md:ltr:text-left md:rtl:text-right text-center">
        {typeof item.quantity === 'number' && <p>x {item.quantity}</p>}
      </div>
      {/* <div className="self-center col-span-2">
        {typeof item.price === 'number' && <p>{price}</p>}
      </div> */}
    </div>
  );
};
