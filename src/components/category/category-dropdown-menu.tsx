import Alert from '@components/ui/alert';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import cn from 'classnames';
import CategoryMenu from '@components/ui/category-menu';

interface CategoryDropdownProps {
  className?: string;
  lang: string;
}

export default function CategoryDropdownMenu({
  className,
  lang
}: CategoryDropdownProps) {
  const {
    data,
    isLoading: loading,
    error,
  } = useCategoriesQuery({ lang: lang });
  return (
    <div className={cn('absolute z-30', className)}>
      <div className="max-h-full overflow-hidden">
        {error ? (
          <div className="2xl:ltr:pr-4 2xl:rtl:pl-4">
            <Alert message={error.message} />
          </div>
        ) : loading ? (
          Array.from({ length: 15 }).map((_, idx) => (
            <CategoryListCardLoader
              key={`category-list-${idx}`}
              uniqueKey="category-list-card-loader"
            />
          ))
        ) : (
          <CategoryMenu items={data} lang={lang} />
        )}
      </div>
    </div>
  );
}
