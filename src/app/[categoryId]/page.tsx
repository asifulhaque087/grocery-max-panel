import { useQuery } from '@apollo/client';
import { CategoryProductPage } from '@src/components/pages';
import { FullPageLoading } from '@src/components/roots';
import client from '@src/graphql/client';
import { GET_CAT_PRO } from '@src/graphql/queries/productQuery';
import { useRouter } from 'next/navigation';

const page = async ({ params }: { params: { categoryId: string } }) => {
  const {
    loading: loading,
    data: { get_category_and_product_by_category: responseData } = {},
  } = await client.query({
    query: GET_CAT_PRO,
    variables: { categoryId: params.categoryId },
  });

  if (loading) {
    return <FullPageLoading />;
  }

  // console.log('from loading ', loading);
  // console.log('this is response data ', responseData);

  return (
    <div>
      <CategoryProductPage
        // loading={loading}
        categories={responseData.categories}
        products={responseData.products}
        categoryId={params.categoryId}
      />
    </div>
  );
};

export default page;
