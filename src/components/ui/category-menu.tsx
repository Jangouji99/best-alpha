import cn from 'classnames';
import Link from '@components/ui/link';
import { IoIosArrowForward } from 'react-icons/io';
import Image from '@components/ui/image';
import { useTranslation } from 'src/app/i18n/client';
import { Category } from '@framework/types';
import { t } from 'i18next';

function SidebarMenuItem({ className, item, depth = 0, lang }: any) {
  const { t } = useTranslation(lang, 'common');
  const { translatedName, subcategories, icon, slug } = item;
  return (
    <>
      <li
        className={`flex justify-between items-center transition ${className
          ? className
          : 'text-sm hover:text-brand px-3.5 2xl:px-4 py-2.5 border-b border-border-base last:border-b-0'
          }`}
      >

        <Link
          href={`/${lang}/categories/${slug}`}
          className={cn(
            'flex items-center w-full ltr:text-left rtl:text-right outline-none focus:outline-none focus:ring-0 focus:text-brand-dark',
          )}
        >
          {icon && (
            <div className="inline-flex w-8 shrink-0 3xl:h-auto">
              <Image
                src={icon ?? '/assets/placeholder/category-small.svg'}
                alt={translatedName || t('text-category-thumbnail')}
                width={25}
                height={25}
                style={{ width: 'auto' }}
              />
            </div>
          )}
          <span className="capitalize ltr:pl-2.5 rtl:pr-2.5 md:ltr:pl-4 md:rtl:pr-4 2xl:ltr:pl-3 2xl:rtl:pr-3 3xl:ltr:pl-4 3xl:rtl:pr-4">
            {translatedName}
          </span>
          {subcategories && (
            <span className="hidden ltr:ml-auto rtl:mr-auto md:inline-flex">
              <IoIosArrowForward className="text-15px text-brand-dark text-opacity-40" />
            </span>
          )}
        </Link>
        {Array.isArray(subcategories) ? (
          <div className="absolute top-0 z-10 invisible hidden w-full h-full border rounded-md opacity-0 md:block left-full bg-brand-light border-border-base">
            <ul key="content" className="text-xs py-1.5">
              {subcategories?.map((currentItem) => {
                const childDepth = depth + 1;
                return (
                  <SidebarMenuItem
                    key={`${currentItem.name}${currentItem.slug}`}
                    item={currentItem}
                    depth={childDepth}
                    className={cn(
                      'text-sm px-3 py-3 ltr:pr-3 rtl:pl-3 text-brand-muted hover:text-brand border-b border-border-base last:border-b-0 mb-0.5',
                    )}
                  />
                );
              })}
            </ul>
          </div>
        ) : null}
      </li>
    </>
  );
}

function SidebarMenu({ items, className, lang }: any) {
  return (
    <ul
      className={cn(
        'w-64 md:w-72 h-auto bg-brand-light border border-border-base rounded-md category-dropdown-menu pt-1.5',
        className,
      )}
    >
      <li
        className={`flex justify-between items-center transition ${className
          ? className
          : 'text-sm hover:text-brand px-3.5 2xl:px-4 py-2.5 border-b border-border-base last:border-b-0'
          }`}
      >
        <Link
          href={`/${lang}/products`}
          className={cn(
            'flex items-center w-full ltr:text-left rtl:text-right outline-none focus:outline-none focus:ring-0 focus:text-brand-dark',
          )}
        >
          <span className="capitalize ltr:pl-2.5 rtl:pr-2.5 md:ltr:pl-4 md:rtl:pr-4 2xl:ltr:pl-3 2xl:rtl:pr-3 3xl:ltr:pl-4 3xl:rtl:pr-4">
            {t('all-products')}
          </span>
        </Link>

      </li>
      {items?.map((item: Category) => (
        <SidebarMenuItem
          key={`${item.slug}-key-${item._id}`}
          item={item}
          lang={lang}
        />
      ))}
    </ul>
  );
}

export default SidebarMenu;
