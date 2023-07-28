import { ProductAttribute } from '@src/components/compounds';
import { IProductInformation } from '@src/types/compounds';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof ProductAttribute> = {
  title: 'Roots/Form/ProductAttribute',
  component: ProductAttribute,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ProductAttribute>;

const Wrapper = (args: IProductInformation) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <ProductAttribute {...args} setActiveIndex={setActiveIndex} />
    </>
  );
};

export const Primary: Story = {
  args: {},
  render: (args) => <Wrapper {...args} />,
};
