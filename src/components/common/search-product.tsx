import Image from '@components/ui/image';
import Link from '@components/ui/link';
import { ROUTES } from '@utils/routes';
import { searchProductPlaceholder } from '@assets/placeholders';
import { Product } from '@framework/types';

type SearchProductProps = {
  lang: string;
  item: Product;
};

const SearchProduct: React.FC<SearchProductProps> = ({ lang, item }) => {
  const imageUrl = process.env.NEXT_PUBLIC_URL_PRODUCT_IMG
  return (
    <Link
      href={`/${lang}${ROUTES.PRODUCT}/${item?.slug}`}
      className="flex items-center justify-start w-full h-auto group"
    >
      <div className="relative flex w-12 h-12 overflow-hidden rounded-md cursor-pointer shrink-0 ltr:mr-4 rtl:ml-4">
        <Image
          src={`${imageUrl}${item?.thumbnail?.desktop}` ?? searchProductPlaceholder}
          width={48}
          height={48}
          loading="eager"
          alt={item.translatedName || 'Product Image'}
          className="object-cover bg-fill-thumbnail"
          style={{ width: 'auto' }}
        />
      </div>
      <div className="flex flex-col w-full overflow-hidden">
        <h3 className="truncate text-brand-dark text-15px">{item.translatedName}</h3>
      </div>
    </Link>
  );
};

export default SearchProduct;
