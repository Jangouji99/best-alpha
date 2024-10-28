import { useTranslation } from 'src/app/i18n/client';
import Image from '@components/ui/image';
import noResultsImage from '@public/assets/images/is-empty.png'
const NoResultsFound: React.FC = ({ lang }: any) => {
    const { t } = useTranslation(lang, 'common');

    return (
        <div className="text-center my-24 mb-20 lg:mb-56">
            <Image
                src={noResultsImage}
                alt={t('noResultAlt')}
                width={350}
                height={350}
                className="mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold">{t('no-products-found-title')}</h2>
            <p className="text-lg text-gray-500">{t('no-products-found-description')}</p>
        </div>
    );
};

export default NoResultsFound;
