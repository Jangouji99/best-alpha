import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import { OrderData, Quotation } from '@framework/types';
import { useMutation } from '@tanstack/react-query';
const fetchSendQuotation = async (orderData: OrderData, lang: string) => {
    const { data } = await http.post(`${API_ENDPOINTS.SEND_QUOTATION}?lang=${lang}`, orderData);
    return data.data.quotation
};

// useMutation hook to send quotation
const useSendQuotation = () => {
    return useMutation<Quotation, Error, { orderData: OrderData; lang: string }>({
        mutationFn: ({ orderData, lang }) => fetchSendQuotation(orderData, lang),
    });
};

export { useSendQuotation, fetchSendQuotation };
