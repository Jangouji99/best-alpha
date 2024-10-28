import { useState } from 'react';
import Link from '@components/ui/link';
import { siteSettings } from '@settings/site-settings';
import Scrollbar from '@components/ui/scrollbar';
import { IoIosArrowDown } from 'react-icons/io';
import Logo from '@components/ui/logo';
import { useUI } from '@contexts/ui.context';
import cn from 'classnames';
import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoYoutube,
  IoClose,
} from 'react-icons/io5';
import { useTranslation } from 'src/app/i18n/client';
import { useCategoriesMenuQuery } from '@framework/category/get-all-categories-menu';
import { useCompanyProfileQuery } from '@framework/company/get-company-profile';
import Image from '@components/ui/image';
import { ROUTES } from '@utils/routes';
import { isEmpty } from 'lodash';

export default function MobileMenu({ lang }: { lang: string }) {
  const [activeMenus, setActiveMenus] = useState<any>([]);
  const {
    data,
    isLoading: loading,
    error,
  } = useCategoriesMenuQuery({ lang: lang });
  const { data: company } = useCompanyProfileQuery({ lang: lang });
  const { closeSidebar } = useUI();
  const { t } = useTranslation(lang, 'menu');
  const { t: tran } = useTranslation(lang, 'footer');
  const handleArrowClick = (menuName: string) => {
    let newActiveMenus = [...activeMenus];
    if (newActiveMenus.includes(menuName)) {
      var index = newActiveMenus.indexOf(menuName);
      if (index > -1) {
        newActiveMenus.splice(index, 1);
      }
    } else {
      newActiveMenus.push(menuName);
    }
    setActiveMenus(newActiveMenus);
  };
  const imageUrl = process.env.NEXT_PUBLIC_URL_SOCIAL_MEDIA
  const ListMenu = ({
    dept,
    data,
    hasSubMenu,
    menuName,
    menuIndex,
    className = '',
  }: any) =>
    data.translatedName && (
      <li className={`transition-colors duration-200 ${className}`}>

        <div className="relative flex items-center justify-between">
          <Link
            href={`/${lang}/categories/${data.slug}`}
            className="relative w-full py-4 transition duration-300 ease-in-out menu-item ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7 ltr:pr-4 rtl:pl-4 text-brand-dark"
          >
            <span className="block w-full" onClick={closeSidebar}>
              {t(`${data.translatedName}`)}
            </span>
          </Link>
          {!isEmpty(hasSubMenu) && (
            <div
              className="cursor-pointer w-full h-8 text-[17px] px-5 shrink-0 flex items-center justify-end text-brand-dark text-opacity-80 absolute ltr:right-0 rtl:left-0 top-1/2 transform -translate-y-1/2"
              onClick={() => handleArrowClick(menuName)}
            >
              <IoIosArrowDown
                className={`transition duration-200 ease-in-out transform ${activeMenus.includes(menuName) ? '-rotate-180' : 'rotate-0'
                  }`}
              />
            </div>
          )}
        </div>
        {hasSubMenu && (
          <SubMenu
            dept={dept}
            data={data.subcategories}
            toggle={activeMenus.includes(menuName)}
            menuIndex={menuIndex}
          />
        )}
      </li>
    );

  const SubMenu = ({ dept, data, toggle, menuIndex }: any) => {
    if (!toggle) {
      return null;
    }

    dept = dept + 1;

    return (
      <ul className={cn('mobile-sub-menu', dept > 2 && 'ltr:-ml-4 rtl:-mr-4')}>

        {data?.map((menu: any, index: number) => {
          const menuName: string = `sidebar-submenu-${dept}-${menuIndex}-${index}`;
          return (
            <ListMenu
              dept={dept}
              data={menu}
              hasSubMenu={menu.subMenu}
              menuName={menuName}
              key={menuName}
              menuIndex={index}
              className={cn(
                dept > 1 && 'ltr:pl-4 rtl:pr-4',
                dept > 2 && 'ltr:pl-8 rtl:pr-8',
              )}
            />
          );
        })}

      </ul>
    );
  };

  return (
    <>
      <div className="flex flex-col justify-between w-full h-full">
        <div className="w-full border-b border-border-base flex justify-between items-center relative ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7 shrink-0 py-0.5">
          <div role="button" onClick={closeSidebar} className="inline-flex">
            <Logo />
          </div>

          <button
            className="flex items-center justify-center px-4 py-5 text-2xl transition-opacity md:px-5 lg:py-8 focus:outline-none hover:opacity-60"
            onClick={closeSidebar}
            aria-label="close"
          >
            <IoClose className="text-brand-dark mt-0.5" />
          </button>
        </div>

        <Scrollbar className="flex-grow mb-auto menu-scrollbar">
          <div className="flex flex-col px-0 py-6 text-brand-dark h-[calc(100vh_-_150px)]">
            <ul className="mobile-menu">
              <li className={`transition-colors duration-200 `}>
                <div className="relative flex items-center justify-between">
                  <Link
                    href={`/${lang}${ROUTES.ALL_PRODUCTS}`}
                    className="relative w-full py-4 transition duration-300 ease-in-out menu-item ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7 ltr:pr-4 rtl:pl-4 text-brand-dark"
                  >
                    <span className="block w-full" onClick={closeSidebar}>
                      {t('all-products')}
                    </span>
                  </Link>
                </div>
              </li>
              {data?.map((menu, index) => {
                const dept: number = 1;
                const menuName: string = `sidebar-menu-${dept}-${index}`;

                return (
                  <ListMenu
                    dept={dept}
                    data={menu}
                    hasSubMenu={menu.subcategories}
                    menuName={menuName}
                    key={menuName}
                    menuIndex={index}
                  />
                );
              })}
              <li className={`transition-colors duration-200 `}>
                <div className="relative flex items-center justify-between">
                  <Link
                    href={`/${lang}/about-us`}
                    className="relative w-full py-4 transition duration-300 ease-in-out menu-item ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7 ltr:pr-4 rtl:pl-4 text-brand-dark"
                  >
                    <span className="block w-full" onClick={closeSidebar}>
                      {tran('link-about-us')}
                    </span>
                  </Link>
                </div>
              </li>
              <li className={`transition-colors duration-200 `}>
                <div className="relative flex items-center justify-between">
                  <Link
                    href={`/${lang}/contact-us`}
                    className="relative w-full py-4 transition duration-300 ease-in-out menu-item ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7 ltr:pr-4 rtl:pl-4 text-brand-dark"
                  >
                    <span className="block w-full" onClick={closeSidebar}>
                      {tran('link-contact-us')}
                    </span>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </Scrollbar>

        <div className="flex items-center justify-center py-5 -mx-3 border-t text-brand-light border-border-base px-7 shrink-0">
          {company?.socialMedia?.map((item, index) => (
            <Link
              href={item.url}
              className={`text-heading mx-3 transition duration-300 ease-in text-brand-dark text-opacity-60 hover:text-brand`}
              key={index}
            >
              <span className="sr-only">{t(`${item.name}`)}</span>
              <a target="_blank" rel="noreferrer">
                <Image
                  src={`${imageUrl}${item.icon}`}
                  alt={item.name}
                  height={25}
                  width={25}
                  className="transform scale-85 md:scale-100"
                />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
