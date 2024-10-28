import { useTagsQuery } from '@framework/tag/get-tags';
import { CategoryFilter } from './category-filter';
import SelectedFilters from './selected-filters';
import { TagsFilter } from './tags-filter';
export const ShopFilters: React.FC<{ lang: string, slug: string; }> = ({ lang, slug }) => {
  const { data, isLoading, error } = useTagsQuery({
    lang: lang, slug: slug
  });
  return (
    <div className="space-y-10">
      <SelectedFilters lang={lang} />
      <CategoryFilter lang={lang} categories={data?.data.categories || []} loading={isLoading} error={error} />
      <TagsFilter lang={lang} isLoading={isLoading} tags={data?.data.tags || []} />
      {/* <BrandFilter lang={lang} /> */}
    </div>
  );
};
