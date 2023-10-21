'use client';

import {
  ProductAttribute,
  ProductInformation,
} from '@src/components/compounds';
import { Tab } from '@src/components/roots';
import { IProductAddPage } from '@src/types/pages';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

export interface Iparent {
  name: string;
  id: string;
}

export const ProductAddPage = ({ product }: IProductAddPage) => {
  const searchParams = useSearchParams();

  const tab = searchParams.get('tab');

  const [activeTab, setActiveTab] = useState(tab ? Number(tab) : 0);

  // console.log('the tab number is ', tab);

  const tabs = [
    {
      title: 'informations',
      tabLink: `?tab=0`,
    },

    {
      title: 'variations',
      tabLink: `?tab=1`,
    },

    {
      title: 'combinations',
      tabLink: `?tab=2`,
    },
  ];

  const isEdit = product ? true : false;

  console.log('is edit is ', isEdit);

  return (
    <div className="p-[20px]">
      {/* tabs */}
      <div>
        <Tab
          tabs={tabs}
          activeIndex={activeTab}
          setActiveIndex={setActiveTab}
          isEdit={isEdit}
        />
      </div>

      {/* product information card */}
      {activeTab == 0 ? (
        <ProductInformation setActiveIndex={setActiveTab} product={product} />
      ) : null}

      {/* product attribute card */}
      {activeTab == 1 ? (
        <ProductAttribute setActiveIndex={setActiveTab} product={product} />
      ) : null}
    </div>
  );
};
