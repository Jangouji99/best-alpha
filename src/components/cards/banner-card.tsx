'use client';

import Link from '@components/ui/link';
import Image from 'next/image';
import useWindowSize from '@utils/use-window-size';
import cn from 'classnames';

interface BannerProps {
  lang: string;
  banner: any;
  variant?: 'rounded' | 'default';
  effectActive?: boolean;
  className?: string;
  classNameInner?: string;
}

function getImage(deviceWidth: number, imgObj: any) {
  return deviceWidth < 480 ? imgObj?.mobile : imgObj?.desktop;
}

const BannerCard: React.FC<BannerProps> = ({
  lang,
  banner,
  className,
  variant = 'default',
  effectActive = true,
  classNameInner,
}) => {
  const { width } = useWindowSize();

  const imageWidth = width! < 480 ? 450 : 1190; // Width for mobile and desktop
  const imageHeight = width! < 480 ? 465 : 500; // Height for mobile and desktop


  const { slug, title, image } = banner;
  const selectedImage = getImage(width!, image);
  const imageUrl = `${process.env.NEXT_PUBLIC_URL_IMG_BANNER}${selectedImage}`
  function handleNavigatePage(type: string, slug: string) {

  }
  return (
    <div className={cn('mx-auto', className)}>
      <Link
        href={banner.type != "blank" ? `${lang}/${banner?.type}/${banner?.slug}` : ``}
        className={cn(
          'h-full group flex justify-center relative overflow-hidden',
          classNameInner,
        )}
      >
        <Image
          src={imageUrl}
          width={imageWidth}
          height={imageHeight}
          alt={banner.altText}
          quality={100}
          priority
          className={cn('bg-fill-thumbnail object-cover rounded-xl w-full', {
            'rounded-md': variant === 'rounded',
          })}
        />
        {effectActive && (
          <div className="absolute top-0 block w-1/2 h-full transform -skew-x-12 ltr:-left-full rtl:-right-full z-5 bg-gradient-to-r from-transparent to-white opacity-30 group-hover:animate-shine" />
        )}
      </Link>

    </div>
  );
};

export default BannerCard;
