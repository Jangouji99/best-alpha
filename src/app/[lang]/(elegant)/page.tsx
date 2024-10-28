import Container from '@components/ui/container';
import DownloadAppsTwo from '@components/common/download-apps-two'
import BestSellerGroceryProductFeed from '@components/product/feeds/best-seller-grocery-product-feed';
import BannerHeroGrid from '@components/common/banner-hero-grid';
import FeatureCarousel from '@components/common/featured-carousel';
import PopularProductWithBestDeals from '@components/product/popular-product-with-best-deals';
import { Metadata } from 'next';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { CompanyProfileResponse } from '@framework/types';
import OurPartner from '@components/partner/our-partner';

type Props = {
  params: { lang: string }
}

export async function generateMetadata({ params }: Props,): Promise<Metadata> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_REST_API_ENDPOINT
    const publicUrl = process.env.NEXT_PUBLIC_WEBSITE_URL
    const imageUrl = process.env.NEXT_PUBLIC_URL_LOGO_IMG
    const companyProfileResponse = await fetch(`${baseUrl}${API_ENDPOINTS.COMPANY_PROFILE}?lang=${params.lang}`).then((res) => res.json()) as CompanyProfileResponse
    const { data: { companyProfile } } = companyProfileResponse
    return {
      title: companyProfile.seo.metaTitle,
      description: companyProfile.seo.metaDescription,
      keywords: companyProfile.seo.keywords,
      openGraph: {
        title: companyProfile.name,
        description: companyProfile.seo.metaDescription,
        url: `${publicUrl}/${params.lang}`,
        siteName: 'Best Alpha',
        images: [
          {
            url: `${imageUrl}${companyProfile.logo}`,
            width: 300,
            height: 200,
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
    }
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {}; // Return a fallback metadata if the fetch fails
  }

}

export default async function Page({ params: { lang } }: Props,) {

  return (
    <>

      {/* Suspense wraps the content that should show loader while loading */}
      <Container>
        <BannerHeroGrid
          className="my-3 md:my-4 lg:mt-0 lg:mb-5 xl:mb-6"
          lang={lang}
        />
        <FeatureCarousel lang={lang} />
        <BestSellerGroceryProductFeed
          className="mb-12 lg:mb-14 xl:mb-16 2xl:mb-20"
          lang={lang}
        />
        <PopularProductWithBestDeals lang={lang} />
        <OurPartner lang={lang} />
      </Container>

      <DownloadAppsTwo lang={lang} />

    </>
  );
}
