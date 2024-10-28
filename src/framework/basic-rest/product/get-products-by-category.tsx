import { Product, QueryOptionsType } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { shuffle } from 'lodash';
import { LIMITS } from '@framework/utils/limits';
type PaginatedProduct = {
    data: Product[];
    all: number;
    paginatorInfo: any;
};
const fetchProductsByCategory = async (options: any) => {
    const { lang, search, slug, newQuery: { page, sort_by, category, tag } } = options;

    const { data } = await http.get(`${API_ENDPOINTS.PRODUCTS_BY_CATEGORY}/${slug}/products`, {
        params: {
            page: page,
            lang: lang,
            sort: sort_by,
            tags: tag,
            search: search,
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

const useProductsByCategoryQuery = (options: QueryOptionsType) => {
    return useInfiniteQuery<PaginatedProduct, Error>({
        queryKey: [API_ENDPOINTS.PRODUCTS_BY_CATEGORY, options],
        queryFn: ({ queryKey }) => fetchProductsByCategory(queryKey[1]),
        initialPageParam: 1,
        getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    });
};

export { useProductsByCategoryQuery, fetchProductsByCategory };