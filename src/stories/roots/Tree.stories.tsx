import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { ICategory } from '@src/types/roots';
import { IOpenId } from '@src/types/roots/Row';
import { Tree } from '@src/components/roots';

const meta: Meta<typeof Tree> = {
  title: 'Roots/Tree',
  component: Tree,
  tags: ['autodocs'],
  argTypes: {
    activeId: {
      control: 'text',
    },

    level: {
      control: 'number',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tree>;

// export const Normal: Story = {
//   args: {},
// };

let categories = [
  {
    id: 1,
    parentId: null,
    name: 'Electronics',
    iconUrl:
      'https://chaldn.com/_mpimage/personal-care?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D101765&q=low&v=1&m=40&webp=1&alpha=1',
    photo:
      'https://chaldn.com/_mpimage/fresh-fruits?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D61651&q=low&v=1&m=400&webp=1',
  },
  {
    id: 2,
    parentId: null,
    name: 'Home & Garden',
    iconUrl:
      'https://chaldn.com/_mpimage/health-wellness?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D95788&q=best&v=1&m=40&webp=1&alpha=1',
    photo:
      'https://chaldn.com/_mpimage/fresh-vegetables?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D23773&q=low&v=1&m=400&webp=1',
  },
  {
    id: 3,
    parentId: 1,
    name: 'Phones & Accessories',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/dates-khejur?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D99117&q=best&v=1&m=400&webp=1',
  },
  {
    id: 4,
    parentId: 1,
    name: 'Computers & Tablets',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/pickles?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31519&q=low&v=1&m=400&webp=1',
  },
  {
    id: 5,
    parentId: 2,
    name: 'Furniture',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/other-table-sauces?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D116621&q=low&v=1&m=400&webp=1',
  },
  {
    id: 6,
    parentId: 2,
    name: 'Kitchen & Dining',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/tomato-sauces?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D116629&q=low&v=1&m=400&webp=1',
  },
  {
    id: 7,
    parentId: 3,
    name: 'Smartphones',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/dates-khejur?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D99117&q=best&v=1&m=400&webp=1',
  },
  {
    id: 8,
    parentId: 3,
    name: 'Tablet Accessories',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/salt-sugar?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D36624&q=best&v=1&m=400&webp=1',
  },
  {
    id: 9,
    parentId: 4,
    name: 'Laptops',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/salt-sugar?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D36624&q=best&v=1&m=400&webp=1',
  },
  {
    id: 10,
    parentId: 4,
    name: 'Desktop Computers',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/rice?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D101155&q=best&v=1&m=400&webp=1',
  },
  {
    id: 11,
    parentId: 5,
    name: 'Sofas & Couches',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/dal-or-lentil?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D29722&q=low&v=1&m=400&webp=1',
  },
  {
    id: 12,
    parentId: 5,
    name: 'Chairs',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/ready-mix?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D101152&q=best&v=1&m=400&webp=1',
  },
  {
    id: 13,
    parentId: 6,
    name: 'Cookware',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/oil?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D113032&q=best&v=1&m=400&webp=1',
  },
  {
    id: 14,
    parentId: 6,
    name: 'Flatware',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/premium-ingredients?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D28689&q=low&v=1&m=400&webp=1',
  },
  {
    id: 15,
    parentId: 7,
    name: 'Apple iPhones',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/shemai-suji?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31299&q=low&v=1&m=400&webp=1https://chaldn.com/_mpimage/shemai-suji?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31299&q=low&v=1&m=400&webp=1',
  },
  {
    id: 16,
    parentId: 7,
    name: 'Samsung Galaxy Phones',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/special-ingredients?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D117039&q=low&v=1&m=400&webp=1',
  },
  {
    id: 17,
    parentId: 9,
    name: 'Gaming Laptops',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/colors-flavours?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31480&q=best&v=1&m=400&webp=1',
  },
  {
    id: 18,
    parentId: 9,
    name: 'Business Laptops',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/colors-flavours?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31480&q=best&v=1&m=400&webp=1',
  },
  {
    id: 19,
    parentId: 11,
    name: 'Sectional Sofas',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/chicken-poultry?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D117422&q=low&v=1&m=400&webp=1',
  },
  {
    id: 20,
    parentId: 11,
    name: 'Reclining Sofas',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/premium-perishables?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D132312&q=best&v=1&m=400&webp=1',
  },
  {
    id: 21,
    parentId: null,
    name: 'Clothing',
    iconUrl:
      'https://chaldn.com/_mpimage/baby-care?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D95781&q=best&v=1&m=40&webp=1&alpha=1',
    photo:
      'https://chaldn.com/_mpimage/special-ingredients?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D117039&q=low&v=1&m=400&webp=1',
  },
  {
    id: 22,
    parentId: null,
    name: 'Sports & Outdoors',
    iconUrl:
      'https://chaldn.com/_mpimage/stationery-office?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D95792&q=low&v=1&m=40&webp=1&alpha=1',
    photo:
      'https://chaldn.com/_mpimage/other-table-sauces?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D116621&q=low&v=1&m=400&webp=1',
  },
  {
    id: 23,
    parentId: 21,
    name: "Women's Clothing",
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/salt-sugar?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D36624&q=best&v=1&m=400&webp=1',
  },
  {
    id: 24,
    parentId: 21,
    name: "Men's Clothing",
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/chicken-poultry?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D117422&q=low&v=1&m=400&webp=1',
  },
  {
    id: 25,
    parentId: 22,
    name: 'Camping Gear',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/ready-mix?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D101152&q=best&v=1&m=400&webp=1',
  },
  {
    id: 26,
    parentId: 22,
    name: 'Exercise & Fitness',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/fresh-fruits?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D61651&q=low&v=1&m=400&webp=1',
  },
  {
    id: 27,
    parentId: 23,
    name: 'Dresses',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/ready-mix?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D101152&q=best&v=1&m=400&webp=1',
  },
  {
    id: 28,
    parentId: 23,
    name: 'Shoes',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/fresh-fruits?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D61651&q=low&v=1&m=400&webp=1',
  },
  {
    id: 29,
    parentId: 24,
    name: 'Shirts',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/fresh-fruits?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D61651&q=low&v=1&m=400&webp=1',
  },
  {
    id: 30,
    parentId: 24,
    name: 'Pants',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/fresh-fruits?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D61651&q=low&v=1&m=400&webp=1',
  },
  {
    id: 31,
    parentId: 25,
    name: 'Tents',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/fresh-fruits?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D61651&q=low&v=1&m=400&webp=1',
  },
  {
    id: 32,
    parentId: 25,
    name: 'Sleeping Bags',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/chicken-poultry?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D117422&q=low&v=1&m=400&webp=1',
  },
  {
    id: 33,
    parentId: 26,
    name: 'Cardio Equipment',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/fresh-fruits?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D61651&q=low&v=1&m=400&webp=1',
  },
  {
    id: 34,
    parentId: 26,
    name: 'Weights & Resistance Training',
    iconUrl: null,
    photo:
      'https://chaldn.com/_mpimage/chicken-poultry?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D117422&q=low&v=1&m=400&webp=1',
  },
];

const TreeWithHooks = () => {
  // Sets the hooks for both the label and primary props

  const [activeId, setActiveId] = useState('');
  const [openIds, setOpenIds] = useState<IOpenId[]>([]);

  const toggleActive = (id: string) => {
    setActiveId(id);
  };

  const newData: ICategory[] = [];

  categories.map((cat) => {
    newData.push({
      id: cat.id.toString(),
      parentId: cat.parentId ? cat.parentId.toString() : null,
      name: cat.name,
      photo: cat.photo,
    });
  });

  return (
    <Tree
      treeData={newData}
      parentId={null}
      level={1}
      toggleActive={toggleActive}
      activeId={activeId}
      openIds={openIds}
      setOpenIds={setOpenIds}
    />
  );
};

export const Primry: Story = {
  render: () => <TreeWithHooks />,
};
