import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import { Quotation } from '@framework/types';
const fetchGetQuotations = async (id: string, lang: string) => {
    const { data } = await http.get(`${API_ENDPOINTS.GET_QUOTATION}${id}`, { params: { lang: lang } });


    return data.data.quotations as Quotation[]
};

const useGetQuotations = (_id: string, lang: string) => {
    return useQuery<Quotation[], Error>({
        queryKey: [API_ENDPOINTS.GET_QUOTATION, _id, lang],
        queryFn: () => fetchGetQuotations(_id, lang),
    });
};

export { useGetQuotations, fetchGetQuotations };
