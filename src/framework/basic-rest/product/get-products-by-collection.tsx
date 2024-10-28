import { Collection } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';



const fetchProductsByCollection = async ({ collectionId, lang }: {
    collectionId: string;
    lang: string;
}) => {
    const { data } = await http.get(`${API_ENDPOINTS.PRODUCTS_BY_COLLECTIONS}/${collectionId}`, { params: { lang: lang } });
    return data.data.collection;
};

const useProductsByCollectionQuery = ({ collectionId, lang }: {
    collectionId: string;
    lang: string;
}) => {
    return useQuery<Collection, Error>({
        queryKey: [API_ENDPOINTS.PRODUCTS_BY_COLLECTIONS, collectionId, lang],
        queryFn: () => fetchProductsByCollection({ collectionId, lang }),
    });
};

export { useProductsByCollectionQuery, fetchProductsByCollection };