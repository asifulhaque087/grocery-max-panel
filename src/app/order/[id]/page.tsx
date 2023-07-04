import { OrderIdPage } from '@src/components/pages';
import { FullPageLoading } from '@src/components/roots';
import client from '@src/graphql/client';
import { GET_ORDER } from '@src/graphql/queries/orderQuery';

export const dynamic = 'force-dynamic';

const page = async ({ params }: { params: { id: string } }) => {
  const { loading: loading, data: { getOrder: order } = {} } =
    await client.query({
      query: GET_ORDER,
      variables: { id: params.id },
      fetchPolicy: 'network-only',
    });

  if (loading) {
    return <FullPageLoading />;
  }

  console.log('we are from here ', order);

  return (
    <div>
      <OrderIdPage order={order} orderId={params.id} />
    </div>
  );
};

export default page;

// 64a1ea5a24a1831c88a365f8

// export async function getServerSideProps(context: GetServerSidePropsContext) {

//   const id = context.params?.id;

//     console.log("from inside id is ", id)

//   const { loading: loading, data: { getOrder: order } = {} } =
//     await client.query({
//       query: GET_ORDER,
//       variables: { id: id },
//     });

//     console.log("from inside ", order)

//   return {
//     props: {
//       loading: loading,
//       order: order,
//       id: id,
//     },
//   };
// }
