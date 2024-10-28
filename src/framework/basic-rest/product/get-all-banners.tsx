import { QueryOptionsType, Banner } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchImageBanners = async () => {
  const { data } = await http.get(API_ENDPOINTS.BANNERS);
  return data.data.banners as Banner[];
};
export const useImageBannersQuery = () => {
  return useQuery<Banner[], Error>({
    queryKey: [API_ENDPOINTS.BANNERS],
    queryFn: () => fetchImageBanners(),
  });
};