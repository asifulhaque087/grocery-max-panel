// 'use client';

import { CategoryListPage } from '@src/components/pages';
import client from '@src/graphql/client';
import { GET_CATEGORIES_BY_ADMIN } from '@src/graphql/queries/categoryQuery';

const page = async () => {
//   const {
//     loading: queryLoading,
//     data: { getCategoriesByAdmin: categories } = {},
//   } = useQuery(GET_CATEGORIES_BY_ADMIN);

  const {
    loading: queryLoading,
    data: { getCategoriesByAdmin: categories} = {},
  } = await client.query({
    query:GET_CATEGORIES_BY_ADMIN ,
  });


  console.log("the categories are ", categories)

  return (
    <CategoryListPage categories={categories} queryLoading={queryLoading} />
  );
};

export default page;
