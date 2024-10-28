import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchWishlistProducts = async ({ queryKey }: any) => {
  const options = queryKey[1];
  const { data } = await http.get(API_ENDPOINTS.WISHLIST, {
    params: {
      lang: options.lang,
      productIds: options.id,
      limit: options.limit
    }
  }
  );
  return data.data.products;
};
export const useWishlistProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_ENDPOINTS.WISHLIST, options],
    queryFn: fetchWishlistProducts,
  });
};
