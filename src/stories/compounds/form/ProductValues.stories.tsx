import { ProductValues } from '@src/components/compounds';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof ProductValues> = {
  title: 'Compounds/Form/ProductValues',
  component: ProductValues,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ProductValues>;

const Wrapper = (args: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return <ProductValues {...args} setActiveIndex={setActiveIndex} />;
};

export const Primary: Story = {
  args: {},
  render: (args) => <Wrapper {...args} />,
};
