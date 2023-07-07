// "use client"

import { CategoryEditPage } from '@src/components/pages';

const page = ({ params }: { params: { categoryId: string } }) => {
  return (
    <div>
      <CategoryEditPage categoryId={params.categoryId} />
    </div>
  );
};

export default page;
