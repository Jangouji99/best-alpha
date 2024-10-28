import { ProductUnit } from '@framework/types';
import isEmpty from 'lodash/isEmpty';
interface CartItem {
  id: string | number;
  productId: string| number;
  translatedName: string;
  slug: string;
  thumbnail: {
    desktop: string;
    mobile: string;
  };
  stock?: number;
  quantity?: number;
  [key: string]: unknown;
}

export function generateCartItem(item: CartItem, productUnit: ProductUnit) {
  
  
  const { id, translatedName, slug, thumbnail, quantity, units } = item;
  if (!isEmpty(productUnit)) {
    return {
      id: `${id}.${productUnit.id}`,
      productId: id,
      translatedName: `${translatedName} - ${productUnit.quantity} ${productUnit.unitName}`,
      slug,
      units,
      stock: productUnit.quantity,
      thumbnail: thumbnail,
      unit:`${productUnit.quantity}  ${productUnit.unitName}`,
    };
  }
  return {
    id,
    translatedName,
    slug,
    units,
    thumbnail: thumbnail,
    stock: quantity
  };
}
