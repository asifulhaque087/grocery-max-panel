'use client';

import { ProductAddPage } from '@src/components/pages';

// export const dynamic = 'force-dynamic';

// async function fetchData() {
//   const { loading, data: { attributes } = {} } = await client.query({
//     query: gql`
//       {
//         attributes {
//           id
//           name
//         }
//       }
//     `,
//   });

//   return attributes;
// }

// const dataPromise = fetchData();

const page = () => {
  // return <ProductAddPage fromEdit={false} />;
  return <ProductAddPage />;
};

export default page;
