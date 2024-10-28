import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import { QuotationDetails } from '@framework/types';
const fetchGetQuotationDetails = async (id: string, lang: string) => {
    const { data } = await http.get(`${API_ENDPOINTS.SEND_QUOTATION}/${id}`, { params: { lang: lang } });
    return data.data.quotation
};

// useMutation hook to send quotation
const useGetQuotationDetails = (_id: string, lang: string) => {
    return useQuery<QuotationDetails, Error>({
        queryKey: [API_ENDPOINTS.SEND_QUOTATION, _id, lang],
        queryFn: () => fetchGetQuotationDetails(_id, lang),
    });
};

export { useGetQuotationDetails, fetchGetQuotationDetails };
