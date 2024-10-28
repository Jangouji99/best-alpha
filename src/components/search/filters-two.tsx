
import SelectedFilters from './selected-filters';
import { CategoryFilter } from './category-filter';

export const ShopFiltersTwo: React.FC<{ lang: string }> = ({ lang }) => {
  return (
    <div className="space-y-10">
      <SelectedFilters lang={lang} />
      {/* <CategoryFilter lang={lang} /> */}
      {/* <DietaryFilter lang={lang} />
      <BrandFilter lang={lang} /> */}
    </div>
  );
};
