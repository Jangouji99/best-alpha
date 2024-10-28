import { CompanyProfile } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useQuery } from "@tanstack/react-query";

export const fetchCompanyProfile = async ({ lang }: { lang: string }) => {
    const { data } = await http.get(API_ENDPOINTS.COMPANY_PROFILE, {
        params: { lang }
    });

    return data.data.companyProfile;
};
export const useCompanyProfileQuery = ({ lang }: { lang: string }) => {
    return useQuery<CompanyProfile, Error>({
        queryKey: [API_ENDPOINTS.COMPANY_PROFILE, lang],
        queryFn: () => fetchCompanyProfile({ lang }),
    });
};