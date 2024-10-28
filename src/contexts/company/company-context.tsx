import { createContext, useContext, useState, ReactNode } from 'react';

interface CompanyInfo {
    companyName: string;
    representative: string;
    contact: string;
    email: string;
    country: string;
    streetAddress: string;
    city: string;
    region: string;
    postalCode: string;
}

interface CompanyContextType {
    companyInfo: CompanyInfo;
    setCompanyInfo: (info: CompanyInfo) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const useCompany = () => {
    const context = useContext(CompanyContext);
    if (!context) {
        throw new Error('useCompany must be used within a CompanyProvider');
    }
    return context;
};

export const CompanyProvider = ({ children }: { children: ReactNode }) => {
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
        companyName: '',
        representative: '',
        contact: '',
        email: '',
        country: 'China',
        streetAddress: '',
        city: '',
        region: '',
        postalCode: ''
    });

    return (
        <CompanyContext.Provider value={{ companyInfo, setCompanyInfo }}>
            {children}
        </CompanyContext.Provider>
    );
};
