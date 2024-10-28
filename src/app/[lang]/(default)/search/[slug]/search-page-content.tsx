'use client';

import { ProductGrid } from '@components/product/product-grid';
import { ShopFilters } from '@components/search/filters';
import SearchTopBar from '@components/search/search-top-bar';
import Container from '@components/ui/container';
import { Element } from 'react-scroll';
import { useProductsQuery } from '@framework/product/get-all-products';
import { useEffect, useState, type FC } from 'react';
import useQueryParam from '@utils/use-query-params';
import { usePathname, useSearchParams } from 'next/navigation';
import { LIMITS } from '@framework/utils/limits';
import Alert from '@components/ui/alert';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';


export default function SearchPageContent({ lang, search }: { lang: string; search: string }) {


  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { getParams, query, updateQueryparams } = useQueryParam(pathname ?? '/');
  const [formState, setFormState] = useState<string[]>(['page=1']);
  // query param page 
  let page = searchParams?.get('page');

  const [pageNumber, setPageNumber] = useState<number>(1);
  const newQuery: any = getParams(
    // @ts-ignore
    `${process.env.NEXT_PUBLIC_WEBSITE_URL}${query}`,
  );

  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useProductsQuery({
    limit: LIMITS.PRODUCTS_LIMITS,
    lang,
    search: search,
    // @ts-ignore
    newQuery,
  });


  const totalProducts = data?.pages?.[0]?.all || 1;

  const totalPages = Math.ceil(totalProducts / LIMITS.PRODUCTS_LIMITS);

  page = !page || page < '1' ? '1' : page
  const prevPage = parseInt(page, 10) - 1 > 0 ? parseInt(page, 10) - 1 : 1;
  const nextPage = parseInt(page, 10) + 1
  const isPageOutOfRang = parseInt(page, 10) > totalPages;

  const pageNumbers = [];
  const offsetNumber = 3;
  for (let i = parseInt(page, 10) - offsetNumber; i <= parseInt(page, 10) + offsetNumber; i++) {
    if (i >= 1 && i <= totalPages) {
      pageNumbers.push(i)
    }
  }

  useEffect(() => {
    updateQueryparams('page', formState.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  useEffect(() => {
    setFormState(pageNumber?.toString().split(',') ?? []);
  }, [pageNumber]);

  function handleChangePage({ page }: { page: number }) {
    setPageNumber(page);
  }

  const totalPage = data?.pages[0]?.all || 0

  return (

    <Container>
      {/* @ts-ignore */}
      <Element name="grid" className="flex pb-16 pt-7 lg:pt-7 lg:pb-20">
        <div className="sticky hidden h-full lg:pt-4 shrink-0 ltr:pr-8 rtl:pl-8 xl:ltr:pr-16 xl:rtl:pl-16 lg:block w-80 xl:w-96 top-16">
          <ShopFilters lang={lang} slug={'all'} />
        </div>
        <div className="w-full lg:pt-4 lg:ltr:-ml-4 lg:rtl:-mr-2 xl:ltr:-ml-8 xl:rtl:-mr-8 lg:-mt-1">
          <SearchTopBar lang={lang} itemCount={data?.pages[0].all.toString() || "0"} slug={'all'} />
          {error ? (
            <div className="col-span-full">
              <Alert message={error?.message} />
            </div>
          ) : isLoading && !data?.pages?.length ? (
            Array.from({ length: 24 }).map((_, idx) => (
              <ProductCardLoader
                key={`product--key-${idx}`}
                uniqueKey={`product--key-${idx}`}
              />
            ))
          ) : (
            <ProductGrid lang={lang} products={data?.pages[0]?.data || []} />
          )}
          {totalPage > 24 && (
            <div className="text-center py-4">
              <div className="flex justify-end space-x-2">
                {isPageOutOfRang ? (
                  <div>No more pages ...</div>
                ) : (
                  <div className="flex justify-center items-center mt-20">
                    {parseInt(page, 10) === 1 ? (
                      <div className="opacity-60 hover:bg-gray-200 px-5 p-1.5 rounded-md cursor-pointer me-5"> Previous</div>
                    ) : (
                      <a className="hover:bg-gray-200 px-5 p-1.5 rounded-md cursor-pointer me-5" aria-label="Previous Page" onClick={() => handleChangePage({ page: prevPage })}> Previous</a>
                    )}
                    {pageNumbers.map((pageNumber, index) => (
                      <a key={index}
                        onClick={() => handleChangePage({ page: pageNumber })}
                        className={`gap-3 m-1 ${parseInt(page, 10) === pageNumber ? "border-[1px] font-bold p-1.5 px-3.5 rounded-md text-black"
                          : "hover:bg-gray-200 px-3.5 p-1.5 rounded-md cursor-pointer"
                          }`}
                      >{pageNumber}</a>
                    ))}
                    {parseInt(page, 10) === totalPages ? (
                      <div className="opacity-60 hover:bg-gray-200 px-5 p-1.5 rounded-md cursor-pointer ms-5"> Next</div>
                    ) : (
                      <a aria-label="Next Page" className="hover:bg-gray-200 px-5 p-1.5 rounded-md cursor-pointer ms-5" onClick={() => handleChangePage({ page: nextPage })}>Next</a>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Element>
    </Container>
  );
}
