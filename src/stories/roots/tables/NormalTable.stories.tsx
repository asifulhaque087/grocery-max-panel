import { NormalTable } from '@src/components/roots';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof NormalTable> = {
  title: 'Roots/tables/NormalTable',
  component: NormalTable,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof NormalTable>;

const tableHeading = [
  {
    colName: 'name',
  },

  {
    colName: 'price',
  },

  //   {
  //     colName: 'image',
  //   },

  //   {
  //     colName: 'date',
  //   },

  //   {
  //     colName: 'action',
  //   },
];

const columns = [
  {
    name: 'ID',
    selector: (row: any) => row.id,
  },
  {
    name: 'Name',
    selector: (row: any) => row.name,
  },
  {
    name: 'Photo',
    selector: (row: any) => (
      <img alt="product" src={row.photo} className="w-[30px] ml-auto md:ml-0" />
    ),
  },
  // Add more columns as needed
];

const tableData = [
  {
    id: 1,
    name: 'John Doe',
    photo:
      'https://chaldn.com/_mpimage/soft-drinks?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D27882&q=best&v=1&m=400&webp=1',
  },
  {
    id: 2,
    name: 'Jane Smith',
    photo:
      'https://chaldn.com/_mpimage/coffee?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31521&q=best&v=1&m=400&webp=1',
  },

  {
    id: 3,
    name: 'Jane Smith',
    photo:
      'https://chaldn.com/_mpimage/coffee?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31521&q=best&v=1&m=400&webp=1',
  },

  {
    id: 4,
    name: 'Jane Smith',
    photo:
      'https://chaldn.com/_mpimage/coffee?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31521&q=best&v=1&m=400&webp=1',
  },

  {
    id: 5,
    name: 'Jane Smith',
    photo:
      'https://chaldn.com/_mpimage/coffee?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31521&q=best&v=1&m=400&webp=1',
  },
  {
    id: 6,
    name: 'Jane Smith',
    photo:
      'https://chaldn.com/_mpimage/coffee?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31521&q=best&v=1&m=400&webp=1',
  },
  {
    id: 7,
    name: 'Jane Smith',
    photo:
      'https://chaldn.com/_mpimage/coffee?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31521&q=best&v=1&m=400&webp=1',
  },
  {
    id: 8,
    name: 'Jane Smith',
    photo:
      'https://chaldn.com/_mpimage/coffee?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31521&q=best&v=1&m=400&webp=1',
  },
  {
    id: 9,
    name: 'Jane Smith',
    photo:
      'https://chaldn.com/_mpimage/coffee?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31521&q=best&v=1&m=400&webp=1',
  },
  {
    id: 10,
    name: 'Jane Smith',
    photo:
      'https://chaldn.com/_mpimage/coffee?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31521&q=best&v=1&m=400&webp=1',
  },
  // Add more rows as needed
];

export const Primary: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    columns,
    tableData,
  },
};
