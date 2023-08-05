import { ProductCombinationList } from '@src/components/compounds';
import type { Meta, StoryObj } from '@storybook/react';
// import { useState } from 'react';

const meta: Meta<typeof ProductCombinationList> = {
  title: 'Compounds/Form/ProductCombinationList',
  component: ProductCombinationList,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ProductCombinationList>;

// const Wrapper = (args: IProductInformation) => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   return (
//     <>
//       <ProductInformation {...args} setActiveIndex={setActiveIndex} />
//     </>
//   );
// };

export const Primary: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {},
  //   render: (args) => <Wrapper {...args} />,
};
