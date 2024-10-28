import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchSearchedProducts = async ({ queryKey }: any) => {
  const options = queryKey[1];
  const { data } = await http.get(API_ENDPOINTS.SEARCH, {
    params: {
      lang: options.lang,
      search: options.text
    }
  });

  return data.data.products
};
export const useSearchQuery = (options: QueryOptionsType) => {
  return useQuery({
    queryKey: [API_ENDPOINTS.SEARCH, options],
    queryFn: fetchSearchedProducts,
  });
};
