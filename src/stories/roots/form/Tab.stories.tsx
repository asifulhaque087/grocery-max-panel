import { Tab } from '@src/components/roots';
import { ITab } from '@src/types/roots';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof Tab> = {
  title: 'Roots/Form/Tab',
  component: Tab,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Tab>;

const TabWrapper = (args: ITab) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Tab
        {...args}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </>
  );
};

export const Primary: Story = {
  args: {
    tabs: [
      {
        title: 'informations',
      },

      {
        title: 'variations',
      },

      {
        title: 'combinations',
      },
    ],
  },
  render: (args) => <TabWrapper {...args} />,
};
