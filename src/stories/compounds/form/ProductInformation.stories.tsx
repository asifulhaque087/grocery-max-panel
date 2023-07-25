import { ProductInformation } from '@src/components/compounds';
import { IProductInformation } from '@src/types/compounds';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof ProductInformation> = {
  title: 'Roots/Form/ProductInformation',
  component: ProductInformation,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ProductInformation>;

const Wrapper = (args: IProductInformation) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <ProductInformation {...args} setActiveIndex={setActiveIndex} />
    </>
  );
};

export const Primary: Story = {
  args: {},
  render: (args) => <Wrapper {...args} />,
};
