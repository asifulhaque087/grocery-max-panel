import { HomePage } from '@src/components/pages';
import client from '@src/graphql/client';

import { GET_BANNERS } from '@src/graphql/queries/bannerQuery';
import {
  GET_BEST_SELLING_PRODUCTS,
  GET_MOST_DISCOUNT_PRODUCTS,
  GET_NEW_ARRIVAL_PRODUCTS,
} from '@src/graphql/queries/productQuery';
// import Head from 'next/head';

export default async function Home() {
  // fetching banner
  const { loading: bannerLoading, data: { getBanners: banners } = {} } =
    await client.query({
      query: GET_BANNERS,
    });

  // fetching most discount products
  const {
    loading: mostDiscountLoading,
    data: { getMostDiscountProducts: mostDiscountProducts } = {},
  } = await client.query({
    query: GET_MOST_DISCOUNT_PRODUCTS,
  });

  // fetching new arrival products
  const {
    loading: newArrivalLoading,
    data: { getBestNewArrivalProducts: newArrivalProducts } = {},
  } = await client.query({
    query: GET_NEW_ARRIVAL_PRODUCTS,
  });

  // fetching best selling products
  const {
    loading: bestSellingLoading,
    data: { getBestSellingProducts: bestSellingProducts } = {},
  } = await client.query({
    query: GET_BEST_SELLING_PRODUCTS,
  });

  return (
    <>
      {/* <Head>
        <title>This is Grocery App</title>
        <meta name="description" content="best grocery shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <div>
        <HomePage
          bannerLoading={bannerLoading}
          banners={banners}
          bestSellingLoading={bestSellingLoading}
          bestSellingProducts={bestSellingProducts}
          mostDiscountLoading= {mostDiscountLoading}
          mostDiscountProducts={mostDiscountProducts}
          newArrivalLoading={newArrivalLoading}
          newArrivalProducts={newArrivalProducts}
        />
      </div>
    </>
  );
}
