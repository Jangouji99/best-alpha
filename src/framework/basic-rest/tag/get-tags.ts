import { FilterResponse, Dietary, QueryOptionsType } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchTags = async (options: any) => {
  const { lang, slug} = options;
  
  const { data } = await http.get(`${API_ENDPOINTS.FILTER}${slug}`,
     {
      params:{
        lang: lang
      }
    });
    
  return data;
};
export const useTagsQuery = (options: QueryOptionsType) => {
  return useQuery<FilterResponse, Error>({
    queryKey: [API_ENDPOINTS.FILTER, options],
    queryFn:  ({ queryKey }) => fetchTags(queryKey[1]),
  });
};
