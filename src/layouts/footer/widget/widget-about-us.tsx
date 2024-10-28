'use client';

import Link from 'next/link';
import Logo from '@components/ui/logo';
import Text from '@components/ui/text';
import Image from '@components/ui/image';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'src/app/i18n/client';
import { SocialMedia } from '@framework/types';
import { useRouter } from 'next/navigation';


interface AboutProps {
  lang: string;
  textAbout?: string;
  className?: string;
  socialMedia?: SocialMedia[]
}
const WidgetAbout: React.FC<AboutProps> = ({ lang, textAbout, socialMedia, className }) => {
  const { t } = useTranslation(lang, 'footer');
  const imageUrl = process.env.NEXT_PUBLIC_URL_SOCIAL_MEDIA
  const router = useRouter();
  function navigateToHomePage() {
    router.push(`/${lang}`);
  }

  return (
    <div className={`pb-10 sm:pb-0 ${className}`}>
      <div className="flex flex-col text-center sm:ltr:text-left sm:rtl:text-right max-w-[300px] mx-auto sm:ltr:ml-0 sm:rtl:mr-0 pb-6 sm:pb-5">
        <Logo
          onClick={navigateToHomePage}
          className="mx-auto mb-3 lg:mb-5 sm:ltr:ml-0 sm:rtl:mr-0"
        />
        <Text>{textAbout}</Text>
      </div>

      {socialMedia && (
        <ul className="flex flex-wrap justify-center mx-auto sm:justify-start">
          {socialMedia?.map((item) => (
            <li
              className="transition hover:opacity-80 last:ltr:mr-0 md:ltr:mr-5 md:mx-0 ltr:mr-4 last:rtl:ml-0 rtl:ml-4 md:rtl:ml-5"
              key={`social-list--key${item._id}`}
            >
              <Link href={item.url} legacyBehavior>
                <a target="_blank" rel="noreferrer">
                  <Image
                    src={`${imageUrl}${item.icon}`}
                    alt={item.name}
                    height={25}
                    width={25}
                    className="transform scale-85 md:scale-100 "
                  />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WidgetAbout;
