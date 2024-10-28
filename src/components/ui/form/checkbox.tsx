import React from 'react';
import { useTranslation } from 'src/app/i18n/client';

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  lang: string;
  label?: string | any;
}
export const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ lang, label, ...rest }, ref) => {
    const { t } = useTranslation(lang);
    return (
      <label className="group flex items-center justify-between text-brand-dark text-sm md:text-15px cursor-pointer transition-all hover:text-opacity-80 border-b border-border-base py-3.5 last:border-b-0 last:pb-0 first:pt-0">
        <span className="ltr:mr-3.5 rtl:ml-3.5 -mt-0.5">
          {label ? t(label) : label}
        </span>
        <input
          type="checkbox"
          className="form-checkbox text-brand w-[22px] h-[22px] border-2 border-border-four rounded-full cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-brand focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-brand hover:checked:bg-brand"
          ref={ref}
          {...rest}
        />
      </label>
    );
  },
);

CheckBox.displayName = 'CheckBox';
