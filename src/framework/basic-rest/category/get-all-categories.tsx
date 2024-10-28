import { CategoriesQueryOptionsType, Category } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchCategories = async ({ queryKey }: any) => {
  const options = queryKey[1];
  const { data } = await http.get(API_ENDPOINTS.CATEGORIES, {
    params: {
      lang: options.lang
    }
  });

  return data.data.categories as Category[];
};

export const useCategoriesQuery = (options: CategoriesQueryOptionsType) => {
  return useQuery<Category[], Error>({
    queryKey: [API_ENDPOINTS.CATEGORIES, options],
    queryFn: fetchCategories,
  });
};
