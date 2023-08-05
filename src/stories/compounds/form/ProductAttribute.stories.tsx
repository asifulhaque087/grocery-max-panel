import { ApolloProvider } from '@apollo/client';
import { ProductAttribute } from '@src/components/compounds';
import client from '@src/graphql/client';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof ProductAttribute> = {
  title: 'Compounds/Form/ProductAttribute',
  component: ProductAttribute,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ProductAttribute>;

const Wrapper = (args: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <ApolloProvider client={client}>
        <ProductAttribute {...args} setActiveIndex={setActiveIndex} />
      </ApolloProvider>
    </>
  );
};

export const Primary: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {},
  render: (args) => <Wrapper {...args} />,
};
