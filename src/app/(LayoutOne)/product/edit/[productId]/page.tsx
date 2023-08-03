'use client';
export const dynamic = 'force-dynamic';

import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ProductAddPage, ProductEditPage } from '@src/components/pages';
import { FIND_CACHE_BY_PRODUCT_ID } from '@src/graphql/queries/productCacheQuery';
import { storeSingleProduct } from '@src/graphql/reactivities/productVariable';

const page = ({ params }: { params: { productId: string } }) => {
  console.log('params is ', params.productId);

  // fetching product by id
  const { loading, data: { findCacheByProductId: product } = {} } = useQuery(
    FIND_CACHE_BY_PRODUCT_ID,
    {
      variables: {
        productId: parseInt(params.productId),
      },
    }
  );

  useEffect(() => {
    // if (!product) storeSingleProduct(product);
    // console.log("the product is ", product)
    storeSingleProduct(product);
  }, [product]);

  return (
    <div>
      {/* <ProductEditPage productId={params.productId} /> */}
      {/* this is product page */}
      <ProductAddPage fromEdit={true} />
    </div>
  );
};

export default page;
