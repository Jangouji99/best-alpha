import { IoClose } from 'react-icons/io5';
import options from '@public/api/options.json'
import { useTranslation } from 'src/app/i18n/client';
interface Props {
  lang: string;
  itemKey: string;
  itemValue: string;
  onClick: () => void;
}

export const FilteredItem = ({ lang, itemKey, itemValue, onClick }: Props) => {
  const { t } = useTranslation(lang, 'common');
  // Find the corresponding option name based on the itemValue
  const option = options.find((option) => option.value === itemValue);
  const displayValue = itemKey === 'sort_by' && option ? option.name : itemValue;
  return (
    <div
      className="group flex shrink-0 m-1 items-center border border-border-base rounded-lg text-13px px-2.5 py-1.5 capitalize text-brand-dark cursor-pointer transition duration-200 ease-in-out hover:border-brand"
      onClick={onClick}
    >
      {t(displayValue)}
      <IoClose className="text-sm text-body ltr:ml-2 rtl:mr-2 shrink-0 ltr:-mr-0.5 rtl:-ml-0.5 mt-0.5 transition duration-200 ease-in-out group-hover:text-heading" />
    </div>
  );
};
