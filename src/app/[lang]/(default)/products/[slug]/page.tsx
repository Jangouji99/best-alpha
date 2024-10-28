import { Product, ProductDetailsResponse } from '@framework/types';
import SingleProductsContent from './single-product-content';
import { Metadata, ResolvingMetadata } from 'next';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';

type Props = {
  params: { lang: string; slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_REST_API_ENDPOINT
  const publicUrl = process.env.NEXT_PUBLIC_WEBSITE_URL
  const productDetailsResponse = await fetch(`${baseUrl}${API_ENDPOINTS.PRODUCTS_BY_SLUG}/${params.slug}?lang=${params.lang}$fields=seo,thumbnail,name,description,tags`).then((res) => res.json()) as ProductDetailsResponse
  const { data: { product } } = productDetailsResponse
  return {
    title: product.seo.metaTitle,
    description: product.seo.metaDescription,
    keywords: product.seo.keywords,
    openGraph: {
      title: product.translatedName,
      description: product.translatedDescription,
      url: `${publicUrl}/${params.lang}/products/${params.slug}`,
      siteName: 'Best Alpha',
      images: [
        {
          url: `${baseUrl}/${product?.thumbnail?.desktop}`,
          width: 800,
          height: 600,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  }
}


export default async function Page({ params, searchParams }: Props) {
  return (
    <SingleProductsContent lang={params.lang} slug={params.slug} />
  );
}
