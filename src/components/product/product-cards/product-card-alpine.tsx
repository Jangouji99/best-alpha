import cn from 'classnames';
import Image from '@components/ui/image';
import { Product } from '@framework/types';
import { useModalAction } from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';
import { Eye } from '@components/icons/eye-icon';
import { useCart } from '@contexts/cart/cart.context';

import dynamic from 'next/dynamic';
import { useTranslation } from 'src/app/i18n/client';
import { ROUTES } from '@utils/routes';
import { useRouter } from 'next/navigation';
import { productGalleryPlaceholder } from '@assets/placeholders';
const AddToCart = dynamic(() => import('@components/product/add-to-cart'), {
  ssr: false,
});

interface ProductProps {
  lang: string;
  product: Product;
  className?: string;
}

function RenderPopupOrAddToCart({ props }: { props: Object }) {
  let { data, lang }: any = props;

  const { t } = useTranslation(lang, 'common');
  const { width } = useWindowSize();
  const { openModal } = useModalAction();
  const { isInCart, isInStock } = useCart();
  const iconSize = width! > 1024 ? '19' : '17';
  function handlePopupView(e: React.MouseEvent) {
    e.stopPropagation();
    openModal('PRODUCT_VIEW', data);
  }

  return (
    <>
      <button
        className="inline-flex items-center justify-center w-8 h-8 text-4xl rounded-full bg-brand lg:w-10 lg:h-10 text-brand-light focus:outline-none focus-visible:outline-none"
        aria-label="Count Button"
        onClick={handlePopupView}
      >
        <Eye width={iconSize} height={iconSize} opacity="1" />
      </button>
    </>
  );

}


const ProductCardAlpine: React.FC<ProductProps> = ({
  product,
  className,
  lang,
}) => {
  const { translatedName, thumbnail, units, categoryId } = product ?? {};
  const { t } = useTranslation(lang, 'common');
  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_URL_PRODUCT_IMG
  const imageUrl = thumbnail?.desktop ? `${baseUrl}${thumbnail?.desktop}` : productGalleryPlaceholder;

  function navigateToProductPage() {
    router.push(`/${lang}/${ROUTES.PRODUCT}/${product.slug}`);
  }


  return (
    <article
      className={cn(
        'flex flex-col group overflow-hidden rounded-md cursor-pointer transition-all duration-300 shadow-card hover:shadow-cardHover relative max-h-72',
        className,
      )}
      onClick={navigateToProductPage}
      title={translatedName}

    >
      <div className="relative shrink-0">
        <div className="overflow-hidden mx-auto w-full sm:w-[180px] h-[180px] md:w-[20 0px] md:h-[200px] transition duration-200 ease-in-out transform group-hover:scale-105 relative">
          <Image
            src={imageUrl}
            alt={translatedName || 'Product Image'}
            quality={100}
            fill
            priority
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            className="object-cover bg-fill-thumbnail"
          />
        </div>
        <div className="w-full h-full absolute top-0 pt-2.5 md:pt-3.5 px-3 md:px-4 lg:px-[18px] z-10 -mx-0.5 sm:-mx-1">

          <div className={`block product-count-button-position`}>
            <RenderPopupOrAddToCart props={{ data: product, lang: lang }} />
          </div>
        </div>
      </div>

      <div className="flex flex-col px-3 md:px-4 lg:px-[18px] pb-5 lg:pb-6 lg:pt-1.5 h-auto">
        <h2 className="text-brand-dark text-13px sm:text-sm lg:text-15px leading-5 sm:leading-6 mb-1.5">
          {translatedName}
        </h2>
        <div className="mt-auto text-13px sm:text-sm flex flex-row space-x-4  md-1"> {/* Added flex-row and space between */}
          {units.map((unit) => (
            <div key={unit.id} className="flex items-center space-x-1"> {/* Flex for inline alignment */}
              <span>{unit.quantity}</span> <span>{unit.unitName}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ProductCardAlpine;
