'use client';

import BannerCard from '@components/cards/banner-card';
import useWindowSize from '@utils/use-window-size';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from '@components/ui/carousel/slider';
import { error } from 'console';
import { useBannersQuery } from '@framework/banner/get-banners';
import BannerLoader from '@components/ui/loaders/banner-loader';


interface BannerProps {
  lang: string;
  className?: string;
  girdClassName?: string;
}

const BannerHeroGrid: React.FC<BannerProps> = ({
  lang,
  className = 'mb-3 md:mb-4 lg:mb-5 xl:mb-6',
  girdClassName = '2xl:gap-5',
}) => {
  const { data, isLoading, error } = useBannersQuery()

  const { width } = useWindowSize();

  if (isLoading) {
    return (
      <div className={`heightFull ${className}`}>
        <BannerLoader /> {/* Show loader while fetching banners */}
      </div>
    );
  }

  return (
    <div className={`heightFull ${className}`}>
      {width! < 480 ? (
        <Carousel
          prevActivateId="banner-carousel-button-prev"
          nextActivateId="banner-carousel-button-next"
          lang={lang}
        >
          {data?.map((banner: any) => (
            <SwiperSlide key={`banner-key-${banner._id}`}>
              <BannerCard banner={banner} effectActive={true} lang={lang} />
            </SwiperSlide>
          ))}
        </Carousel>
      ) : (
        <div
          className={`grid gap-4 2xl:gap-5 3xl:gap-7 grid-cols-12 ${girdClassName}`}
        >
          {data?.map((banner: any, index: number) => {
            const type = index === 0 ? "medium" : "small"; // Assuming the first banner should be "medium"
            return (
              <BannerCard
                key={`banner--key${banner._id}`}
                banner={banner}
                effectActive={true}
                className={`w-full ${type === 'small' ? 'col-span-5' : 'col-span-7'}`}
                lang={lang}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BannerHeroGrid;
