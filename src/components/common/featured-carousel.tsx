'use client';

import ChatIcon from '@components/icons/featured/chat-icon';
import FeedbackIcon from '@components/icons/featured/feedback-icon';
import CalendarIcon from '@components/icons/featured/calendar-icon';
import CouponIcon from '@components/icons/featured/coupon-icon';
import FeaturedCard from '@components/cards/featured-card-two';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from '@components/ui/carousel/slider';
import PromotionIcon from '@components/icons/featured/promotion-icon';
import SearchIcon from '@components/icons/featured/search-icon';
import PackageIcon from '@components/icons/featured/package';
import GlobalIcon from '@components/icons/featured/global-icon';
import MoneyBagIcon from '@components/icons/featured/money-bag-icon';

const data = [
  {
    id: 1,
    icon: (
      <PackageIcon
        color="#E9AD26"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'feature-one-title',
    description: 'feature-one-description',
  },
  {
    id: 2,
    icon: (
      <GlobalIcon
        color="#E9AD26"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'feature-two-title',
    description: 'feature-two-description',
  },
  {
    id: 3,
    icon: (
      <SearchIcon
        width="55px"
        height="55px"
        color="#E9AD26"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'feature-three-title',
    description: 'feature-three-description',
  },
  {
    id: 4,
    icon: (
      <MoneyBagIcon
        color="#E9AD26"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'feature-four-title',
    description: 'feature-four-description',
  },
  // {
  //   id: 5,
  //   icon: (
  //     <ChatIcon
  //       color="#E9AD26"
  //       width="55px"
  //       height="55px"
  //       className="transform scale-75 xl:scale-90 3xl:scale-100"
  //     />
  //   ),
  //   title: 'feature-title-nine',
  //   description: 'feature-title-nine-description',
  // },
];

interface Props {
  lang: string;
  className?: string;
}

const breakpoints = {
  '1400': {
    slidesPerView: 4,
    spaceBetween: 24,
  },
  '1024': {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  '768': {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  '640 ': {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  '0': {
    slidesPerView: 1,
  },
};

const FeatureCarousel: React.FC<Props> = ({
  lang,
  className = 'mb-12 md:mb-14 xl:mb-[74px]',
}) => {
  return (
    <div className={`heightFull ${className}`}>
      <Carousel
        autoplay={false}
        breakpoints={breakpoints}
        prevActivateId="featured-carousel-button-prev"
        nextActivateId="featured-carousel-button-next"
        lang={lang}
      >
        {data?.map((item) => (
          <SwiperSlide key={`featured-key-${item.id}`}>
            <FeaturedCard item={item} lang={lang} />
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
};

export default FeatureCarousel;
