import React, { useEffect, useState } from 'react';
import { CheckBox } from '@components/ui/form/checkbox';
import { usePathname, useSearchParams } from 'next/navigation';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { Disclosure } from '@headlessui/react';
import Heading from '@components/ui/heading';
import { useTranslation } from 'src/app/i18n/client';
import useQueryParam from '@utils/use-query-params';

export const TagsFilter = ({ lang, isLoading, tags }: { lang: string; isLoading: boolean; tags: string[]; }) => {
  const { t } = useTranslation(lang, 'common');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { updateQueryparams } = useQueryParam(pathname ?? '/');
  const [formState, setFormState] = useState<string[]>([]);

  const hasQueryKey = searchParams?.get('tag');

  useEffect(() => {
    updateQueryparams('tag', formState.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  useEffect(() => {
    setFormState(hasQueryKey?.split(',') ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasQueryKey]);



  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    setFormState(
      formState.includes(value)
        ? formState.filter((item) => item !== value)
        : [...formState, value],
    );
  }

  if (tags?.length == 0) {
    return (
      <div></div>
    );
  }

  return (
    <div className="block">
      <Heading className="mb-5 mt-1">{t('text-tags')}</Heading>
      <div className="flex flex-col p-5 border rounded-md border-border-base">
        {tags
          ?.slice(0, 10)
          ?.map((item: any, index: number) => (
            <CheckBox
              key={`${item}-key-${index}`} // Use index as fallback if no id is available
              label={item}
              name={item} // Convert name to lowercase and replace spaces
              checked={formState.includes(item)}
              value={item}
              onChange={handleItemClick}
              lang={lang}
            />
          ))}
        {tags!.length > 3 && (
          <div className="w-full">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Panel className="pt-4 pb-2">
                    {tags
                      ?.slice(10, tags.length)
                      .map((item: any, index: number) => (
                        <CheckBox
                          key={`${item}-key-${index + 3}`} // Adjust key to avoid duplicates
                          label={item}
                          name={item}
                          checked={formState.includes(item)}
                          value={item}
                          onChange={handleItemClick}
                          lang={lang}
                        />
                      ))}
                  </Disclosure.Panel>
                  <Disclosure.Button className="flex justify-center items-center w-full px-4 pt-3.5 pb-1 text-sm font-medium text-center text-brand focus:outline-none">
                    {open ? (
                      <>
                        <span className="inline-block ltr:pr-1 rtl:pl-1">
                          {t('text-see-less')}
                        </span>
                        <IoIosArrowUp className="text-brand-dark text-opacity-60 text-15px" />
                      </>
                    ) : (
                      <>
                        <span className="inline-block ltr:pr-1 rtl:pl-1">
                          {t('text-see-more')}
                        </span>
                        <IoIosArrowDown className="text-brand-dark text-opacity-60 text-15px" />
                      </>
                    )}
                  </Disclosure.Button>
                </>
              )}
            </Disclosure>
          </div>
        )}
      </div>
    </div>
  );
};
