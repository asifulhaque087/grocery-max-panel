import { Button } from '@src/components/roots';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
  title: 'Roots/Buttons',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },

    colorScheme: {
      control: 'select',
      options: ['green', 'white', 'orange'],
      description: 'Select color',
    },

    badge: {
      control: 'boolean',
    },

    loading: {
      control: 'boolean',
    },

    outline: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Normal: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    label: 'Button',
    colorScheme: 'green',
    outline: true,
  },
};

// export const Hola: Story = {
//     render: () => (
//         <div className="p-[100px] bg-red-600">
//             <Button primary label="Button" />
//         </div>
//     ),
// };
