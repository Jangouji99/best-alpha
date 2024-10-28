import { ProductDetailsResponse } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query'; // Correct import for react-query v4+

export const fetchProduct = async (_slug: string, lang: string) => {
  const { data } = await http.get(
    `${API_ENDPOINTS.PRODUCTS_BY_SLUG}/${_slug}?isRelatedProducts=true&lang=${lang}`
  );
  return data;
};

export const useProductQuery = (slug: string, lang: string) => {
  return useQuery<ProductDetailsResponse, Error>({
    queryKey: [API_ENDPOINTS.PRODUCTS_BY_SLUG, slug, lang],
    queryFn: () => fetchProduct(slug, lang),
  });
};
