import Image from 'next/image';
import Link from '@components/ui/link';
import cn from 'classnames';
import { siteSettings } from '@settings/site-settings';
import siteLogo from 'public/assets/images/logo/best_alpha.png';

const Logo: React.FC<React.AnchorHTMLAttributes<{}> & { lang?: string }> = ({
  className,
  href = '/',
  lang,
  ...props
}) => {
  return (
    <Link
      href={`/${lang}`}
      className={cn(
        'inline-block focus:outline-none md:max-w-[230px] max-w-[150px] w-full',
        className,
      )}
      {...props}
    >
      <Image
        src={siteLogo}
        alt={siteSettings.logo.alt}
        loading="eager"
      />
    </Link>
  );
};

export default Logo;
