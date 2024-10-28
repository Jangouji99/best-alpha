'use client';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'src/app/i18n/client';
import { useIsMounted } from '@utils/use-is-mounted';
import { useCompany } from '@contexts/company/company-context';
import Heading from '@components/ui/heading';
import countries from '@public/api/countries.json'

const CheckoutDetails: React.FC<{ lang: string }> = ({ lang }) => {
  const { t } = useTranslation(lang, 'common');
  const mounted = useIsMounted();
  const { companyInfo, setCompanyInfo } = useCompany();

  // State to manage form data
  const [formData, setFormData] = useState({
    companyName: companyInfo.companyName || '',
    representative: companyInfo.representative || '',
    contact: companyInfo.contact || '',
    email: companyInfo.email || '',
    country: companyInfo.country || '',
    streetAddress: companyInfo.streetAddress || '',
    city: companyInfo.city || '',
    region: companyInfo.region || '',
    postalCode: companyInfo.postalCode || '',
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Update companyInfo in context when form data changes
  useEffect(() => {
    setCompanyInfo(formData);
  }, [formData, setCompanyInfo]);


  return (
    <>
      <div className="border rounded-md border-border-base text-brand-light p-9">

        <Heading className="text-base font-semibold leading-7 text-gray-900"> {t('company-information')}</Heading>
        <p className="mt-1 text-sm leading-6 text-gray-600">{t('company-subtitle')}</p>
        <div className=" mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3 lg:col-span-3 col-span-3">
            <label htmlFor="companyName" className="block text-sm font-medium leading-6 text-gray-900">
              {t('company-name')}
            </label>
            <div className="mt-2">
              <input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                type="text"
                autoComplete="given-name"
                className="text-heading outline-none w-full h-[52px] ltr:pl-5 rtl:pr-5 md:ltr:pl-6 md:rtl:pr-6 ltr:pr-14 rtl:pl-14 md:ltr:pr-16 md:rtl:pl-16 bg-brand-light text-brand-dark text-sm lg:text-15px rounded-md transition-all duration-200 focus:border-brand focus:ring-0 placeholder:text-brand-dark/50 border border-border-base"
              />
            </div>
          </div>
          <div className="sm:col-span-3 lg:col-span-3 col-span-3">
            <label htmlFor="representative" className="block text-sm font-medium leading-6 text-gray-900">
              {t('representative')}
            </label>
            <div className="mt-2">
              <input
                id="representative"
                name="representative"
                value={formData.representative}
                onChange={handleInputChange}
                type="text"
                autoComplete="given-name"
                className="text-heading outline-none w-full h-[52px] ltr:pl-5 rtl:pr-5 md:ltr:pl-6 md:rtl:pr-6 ltr:pr-14 rtl:pl-14 md:ltr:pr-16 md:rtl:pl-16 bg-brand-light text-brand-dark text-sm lg:text-15px rounded-md transition-all duration-200 focus:border-brand focus:ring-0 placeholder:text-brand-dark/50 border border-border-base"
              />
            </div>
          </div>

          <div className="sm:col-span-3 lg:col-span-3 col-span-3">
            <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
              {t('contact')}
            </label>
            <div className="mt-2">
              <input
                id="contact"
                name="contact"
                type="text"
                value={formData.contact}
                onChange={handleInputChange}
                autoComplete="phone"
                className="text-heading outline-none w-full h-[52px] ltr:pl-5 rtl:pr-5 md:ltr:pl-6 md:rtl:pr-6 ltr:pr-14 rtl:pl-14 md:ltr:pr-16 md:rtl:pl-16 bg-brand-light text-brand-dark text-sm lg:text-15px rounded-md transition-all duration-200 focus:border-brand focus:ring-0 placeholder:text-brand-dark/50 border border-border-base"
              />
            </div>
          </div>

          <div className="sm:col-span-3 lg:col-span-3 col-span-3">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              {t('email-address')}
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                autoComplete="email"
                className="text-heading outline-none w-full h-[52px] ltr:pl-5 rtl:pr-5 md:ltr:pl-6 md:rtl:pr-6 ltr:pr-14 rtl:pl-14 md:ltr:pr-16 md:rtl:pl-16 bg-brand-light text-brand-dark text-sm lg:text-15px rounded-md transition-all duration-200 focus:border-brand focus:ring-0 placeholder:text-brand-dark/50 border border-border-base"
              />
            </div>
          </div>

          <div className="sm:col-span-3 lg:col-span-3 col-span-3">
            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
              {t('country')}
            </label>
            <div className="mt-2">
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                autoComplete="country-name"
                className="text-heading outline-none w-full h-[52px] ltr:pl-5 rtl:pr-5 md:ltr:pl-6 md:rtl:pr-6 ltr:pr-14 rtl:pl-14 md:ltr:pr-16 md:rtl:pl-16 bg-brand-light text-brand-dark text-sm lg:text-15px rounded-md transition-all duration-200 focus:border-brand focus:ring-0 placeholder:text-brand-dark/50 border border-border-base"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-3 lg:col-span-3 col-span-3">
            <label htmlFor="streetAddress" className="block text-sm font-medium leading-6 text-gray-900">
              {t('street-address')}
            </label>
            <div className="mt-2">
              <input
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                type="text"
                autoComplete="streetAddress"
                className="text-heading outline-none w-full h-[52px] ltr:pl-5 rtl:pr-5 md:ltr:pl-6 md:rtl:pr-6 ltr:pr-14 rtl:pl-14 md:ltr:pr-16 md:rtl:pl-16 bg-brand-light text-brand-dark text-sm lg:text-15px rounded-md transition-all duration-200 focus:border-brand focus:ring-0 placeholder:text-brand-dark/50 border border-border-base"
              />
            </div>
          </div>

          <div className="sm:col-span-3 lg:col-span-2 col-span-3">
            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
              {t('city')}
            </label>
            <div className="mt-2">
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleInputChange}
                autoComplete="address-level2"
                className="text-heading outline-none w-full h-[52px] ltr:pl-5 rtl:pr-5 md:ltr:pl-6 md:rtl:pr-6 ltr:pr-14 rtl:pl-14 md:ltr:pr-16 md:rtl:pl-16 bg-brand-light text-brand-dark text-sm lg:text-15px rounded-md transition-all duration-200 focus:border-brand focus:ring-0 placeholder:text-brand-dark/50 border border-border-base"
              />
            </div>
          </div>

          <div className="sm:col-span-3 lg:col-span-2 col-span-3">
            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
              {t('state-province')}
            </label>
            <div className="mt-2">
              <input
                id="region"
                name="region"
                type="text"
                value={formData.region}
                onChange={handleInputChange}
                autoComplete="address-level1"
                className="text-heading outline-none w-full h-[52px] ltr:pl-5 rtl:pr-5 md:ltr:pl-6 md:rtl:pr-6 ltr:pr-14 rtl:pl-14 md:ltr:pr-16 md:rtl:pl-16 bg-brand-light text-brand-dark text-sm lg:text-15px rounded-md transition-all duration-200 focus:border-brand focus:ring-0 placeholder:text-brand-dark/50 border border-border-base"
              />
            </div>
          </div>

          <div className="sm:col-span-3 lg:col-span-2 col-span-3">
            <label htmlFor="postalCode" className="block text-sm font-medium leading-6 text-gray-900">
              {t('zip-postal-code')}
            </label>
            <div className="mt-2">
              <input
                id="postalCode"
                name="postalCode"
                type="text"
                value={formData.postalCode}
                onChange={handleInputChange}
                autoComplete="postalCode"
                className="text-heading outline-none w-full h-[52px] ltr:pl-5 rtl:pr-5 md:ltr:pl-6 md:rtl:pr-6 ltr:pr-14 rtl:pl-14 md:ltr:pr-16 md:rtl:pl-16 bg-brand-light text-brand-dark text-sm lg:text-15px rounded-md transition-all duration-200 focus:border-brand focus:ring-0 placeholder:text-brand-dark/50 border border-border-base"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutDetails;
