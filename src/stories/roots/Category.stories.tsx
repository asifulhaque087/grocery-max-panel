import { Category } from '@src/components/roots';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Category> = {
  title: 'Roots/Category',
  component: Category,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Category>;

export const Primary: Story = {
  args: {
    id: '29839283',
    name: 'electronics',
    photo:
      'https://chaldn.com/_mpimage/popular?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D95790&q=best&v=1&m=40&webp=1&alpha=1',
    parentId: null,
  },
};
