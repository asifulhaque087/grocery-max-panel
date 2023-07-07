import { ProductEditPage } from '@src/components/pages';

const page = ({ params }: { params: { productId: string } }) => {
  return (
    <div>
      <ProductEditPage productId={params.productId} />
    </div>
  );
};

export default page;
