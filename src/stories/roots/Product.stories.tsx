import { Product } from '@src/components/roots';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Product> = {
  title: 'Roots/Product',
  component: Product,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Product>;

export const Primary: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    product: {
      id: '12345',
      name: 'Pepsi Diet',
      photo:
        'https://chaldn.com/_mpimage/pepsi-diet-600-ml?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D109603&q=best&v=1&m=400&webp=1',
      description: 'This is an example product',
      stock: '10',
      qty: '1',
      unit: 'piece',
      price: '9.99',
      persentage: '10%',
      discountPrice: '8.99',
      totalSell: '50',
      createdAt: '2023-06-30',
    },
  },
};
