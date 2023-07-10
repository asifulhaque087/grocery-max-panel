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
      'https://res.cloudinary.com/dkrc4r7lr/image/upload/v1688594538/grocery-max/wjmmoty1mvqtbw902juf.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    photo:
      'https://res.cloudinary.com/dkrc4r7lr/image/upload/v1688105668/grocery-max/fhzxcd5yxayzfazuhnbu.jpg',
  },
  // Add more rows as needed
];

export const Primary: Story = {
  args: {
    columns,
    tableData,
  },
};
