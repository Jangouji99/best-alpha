import { CategoriesQueryOptionsType, Category } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchCategoriesMenu = async ({ queryKey }: any) => {
  const options = queryKey[1];

  const { data } = await http.get(API_ENDPOINTS.CATEGORIES_MENU,
    {
      params: {
        lang: options.lang
      }
    }
  );

  return data.data.categories as Category[];
};

export const useCategoriesMenuQuery = (options: CategoriesQueryOptionsType) => {
  return useQuery<Category[], Error>({
    queryKey: [API_ENDPOINTS.CATEGORIES_MENU, options],
    queryFn: fetchCategoriesMenu,
  });
};
