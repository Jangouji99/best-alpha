import { IoCheckmarkCircle } from 'react-icons/io5';
import OrderDetails from '@components/order/order-details';
import { useTranslation } from 'src/app/i18n/client';
import { useGetQuotationDetails } from '@framework/order/get-quotation-details';
import Image from 'next/image';
import { orderNotfound } from '@assets/placeholders';
export default function OrderInformation({ lang, _id }: { lang: string, _id: string }) {
  const { t } = useTranslation(lang, 'common');


  const { data, isLoading, error } = useGetQuotationDetails(_id, lang)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString); // Convert to Date object
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', // Full month name (e.g., 'April')
      day: 'numeric' // Day without leading zeros
    });
  };


  const dateStr = data?.createdAt; // Your input date string
  const formattedDate = formatDate(dateStr || "");

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-64vh  text-center">
        <div className='loader'></div>
      </div>
    )
  }

  if (!data?.items) {
    return (
      <div className="flex flex-col justify-center items-center h-64vh  text-center">
        <Image
          src={orderNotfound}
          alt="Order Not Found"
          className="w-1/5 mb-8"
        />
        <h2 className="text-2xl font-semibold text-gray-700">{t('text-not-found-title')}</h2>
        <p className="mt-4 text-lg text-gray-600">{t('text-not-found-subtitle')}</p>
      </div>
    );
  }


  const message = data.status === "pending"
    ? t('request_quotation_pending_message')
    : data.status === "accepted"
      ? t('request_quotation_accepted_message')
      : data.status === "completed"
        ? t('request_quotation_complete_message')
        : t('request_quotation_canceled_message');

  return (
    <div className="py-16 xl:px-32 2xl:px-44 3xl:px-56 lg:py-20">
      <div className="flex items-center justify-start px-4 py-4 mb-6 text-sm border rounded-md border-border-base bg-fill-secondary lg:px-5 text-brand-dark md:text-base lg:mb-8">
        <span className="flex items-center justify-center w-10 h-10 rounded-full ltr:mr-3 rtl:ml-3 lg:ltr:mr-4 lg:rtl:ml-4 bg-brand bg-opacity-20 shrink-0">
          <IoCheckmarkCircle className="w-5 h-5 text-brand" />
        </span>
        {message}
      </div>
      <ul className="flex flex-col border rounded-md border-border-base bg-fill-secondary md:flex-row mb-7 lg:mb-8 xl:mb-10">
        <li className="px-4 py-4 text-base font-semibold border-b border-dashed text-brand-dark lg:text-lg md:border-b-0 md:border-r border-border-two lg:px-6 xl:px-8 md:py-5 lg:py-6 last:border-0">
          <span className="block text-xs font-normal leading-5 uppercase text-brand-muted">
            {t('company-name')}:
          </span>
          {data?.companyInfo?.name}
        </li>
        <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-lg md:border-b-0 md:border-r lg:px-6 xl:px-8 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-brand-muted font-normal leading-5">
            {t('representative')}:
          </span>
          {data?.companyInfo?.representative}
        </li>
        <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-lg md:border-b-0 md:border-r lg:px-6 xl:px-8 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-brand-muted font-normal leading-5">
            {t('text-date')}:
          </span>
          {formattedDate}
        </li>
        <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-lg md:border-b-0 md:border-r lg:px-6 xl:px-8 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-brand-muted font-normal leading-5">
            {t('text-email')}:
          </span>
          {data?.companyInfo?.email}
        </li>
        <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-lg md:border-b-0 md:border-r lg:px-6 xl:px-8 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-brand-muted font-normal leading-5">
            {t('contact')}:
          </span>
          {data?.companyInfo?.contact}
        </li>
        <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-lg md:border-b-0 md:border-r lg:px-6 xl:px-8 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-brand-muted font-normal leading-5">
            {t('street-address')}:
          </span>
          {data?.companyInfo?.address?.address}
        </li>
      </ul>


      <OrderDetails lang={lang} quotationItems={data?.items || []} />
    </div>
  );
}
