import { ApolloProvider } from '@apollo/client';
import { CategoryAddForm } from '@src/components/compounds';
import client from '@src/graphql/client';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof CategoryAddForm> = {
  title: 'Compounds/Form/Category/CategoryAddForm',
  component: CategoryAddForm,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CategoryAddForm>;

const Wrapper = (args: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      {/* <ApolloProvider client={client}> */}
      <CategoryAddForm {...args} />
      {/* </ApolloProvider> */}
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
  render: (args) => <Wrapper />,
};
