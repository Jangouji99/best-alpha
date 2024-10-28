import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { SubscribeRequest, SubscribeResponse } from '@framework/types';
import { useMutation } from '@tanstack/react-query';
const fetchCreateSubscribe = async (request: SubscribeRequest, lang: string) => {
    const { data } = await http.post(`${API_ENDPOINTS.CREATE_SUBSCRIBE}?lang=${lang}`, request);
    return data
};

// useMutation hook to send quotation
const useCreateSubscribe = () => {
    return useMutation<SubscribeResponse, Error, { request: SubscribeRequest; lang: string }>({
        mutationFn: ({ request, lang }) => fetchCreateSubscribe(request, lang),
    });
};

export { useCreateSubscribe, fetchCreateSubscribe };