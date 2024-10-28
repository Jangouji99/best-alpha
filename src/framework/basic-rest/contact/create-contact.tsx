import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { ContactRequest, ContactResponse } from '@framework/types';
import { useMutation } from '@tanstack/react-query';
const fetchCreateContact = async (request: ContactRequest, lang: string) => {
    const { data } = await http.post(`${API_ENDPOINTS.CONTACT}?lang=${lang}`, request);
    return data
};

// useMutation hook to send quotation
const useCreateContact = () => {
    return useMutation<ContactResponse, Error, { request: ContactRequest; lang: string }>({
        mutationFn: ({ request, lang }) => fetchCreateContact(request, lang),
    });
};

export { useCreateContact, fetchCreateContact };
