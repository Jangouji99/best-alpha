import { QueryOptionsType, Product } from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import shuffle from 'lodash/shuffle';
import { useInfiniteQuery } from '@tanstack/react-query';
import { LIMITS } from '@framework/utils/limits';

type PaginatedProduct = {
  data: Product[];
  all: number;
  paginatorInfo: any;
};

const fetchProducts = async (options: any) => {

  const { lang, search, newQuery: { page, sort_by, category, tag } } = options;

  const { data } = await http.get(API_ENDPOINTS.PRODUCTS, {
    params: {
      page: page,
      lang: lang,
      sort: sort_by,
      search: search,
      tags: tag,
      categorySlugs: category,
      limit: LIMITS.PRODUCTS_LIMITS
    }
  });

  return {
    data: shuffle(data.data.products) as Product[],
    all: data.all,
    paginatorInfo: {
      nextPageUrl: '',
    },
  };
};

const useProductsQuery = (options: QueryOptionsType) => {

  return useInfiniteQuery<PaginatedProduct, Error>({
    queryKey: [API_ENDPOINTS.PRODUCTS, options],
    queryFn: ({ queryKey }) => fetchProducts(queryKey[1]),
    initialPageParam: 1,
    getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    retry: false
  });
};

export { useProductsQuery, fetchProducts };
