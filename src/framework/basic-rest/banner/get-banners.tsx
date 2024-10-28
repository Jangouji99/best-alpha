import { Banner } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useQuery } from "@tanstack/react-query";

export const fetchBanners = async ({ queryKey }: any) => {
    const { data } = await http.get(API_ENDPOINTS.BANNERS, {
        params: {
            limit: 2
        }
    }
    );

    return data.data.banners as Banner[];
};
export const useBannersQuery = () => {
    return useQuery<Banner[], Error>({
        queryKey: [API_ENDPOINTS.BANNERS],
        queryFn: fetchBanners,
    });
};