import { CartItem } from '@contexts/cart/cart.utils';
import Image from '@components/ui/image';
import { generateCartItemName } from '@utils/generate-cart-item-name';
import usePrice from '@framework/product/use-price';

export const CheckoutItem: React.FC<{ item: CartItem }> = ({ item }) => {

  const imageUrl = process.env.NEXT_PUBLIC_URL_PRODUCT_IMG
  return (
    <div className="flex items-center py-4 border-b border-border-base ">
      <div className="flex w-16 h-16 border rounded-md border-border-base shrink-0">
        <Image
          src={`${imageUrl}${item.thumbnail.desktop}`}
          alt={'item image'}
          className="rounded-md ltr:mr-5 rtl:ml-5"
          width={64}
          height={64}
          style={{ width: 'auto' }}
        />
      </div>
      <h6 className="font-normal text-15px text-brand-dark ltr:pl-3 rtl:pr-3">
        {item.translatedName} - {item.unit}
      </h6>
      <div className="flex font-normal ltr:ml-auto rtl:mr-auto text-15px text-brand-dark ltr:pl-2 rtl:pr-2 shrink-0">
        {`X ${item.quantity}`}
      </div>
    </div>
  );
};
