import React, { useState } from 'react';

import { Row } from '@src/components/roots';
import type { Meta, StoryObj } from '@storybook/react';
import { ICategory } from '@src/types/roots';
import { IOpenId } from '@src/types/roots/Row';

const meta: Meta<typeof Row> = {
  title: 'Roots/Row',
  component: Row,
  tags: ['autodocs'],
  argTypes: {
    activeId: {
      control: 'text',
    },

    level: {
      control: 'number',
    },

    childIsAParent: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Row>;

// export const Normal: Story = {
//   args: {},
// };

const RowWithHooks = () => {
  // Sets the hooks for both the label and primary props

  const [activeId, setActiveId] = useState('');
  const [openIds, setOpenIds] = useState<IOpenId[]>([]);

  const child: ICategory = {
    id: '29839283',
    name: 'electronics',
    photo:
      'https://chaldn.com/_mpimage/popular?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D95790&q=best&v=1&m=40&webp=1&alpha=1',
    parentId: '23423482983',
  };

  const toggleActive = (id: string) => {
    setActiveId(id);
  };

  return (
    <Row
      item={child}
      level={0}
      toggleActive={toggleActive}
      activeId={activeId}
      openIds={openIds}
      setOpenIds={setOpenIds}
      childIsAParent={false}
    >
      <div>hello </div>
    </Row>
  );
};

export const Primary: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  render: () => <RowWithHooks />,
};
