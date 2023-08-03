'use client';

import {
  ProductAttribute,
  ProductInformation,
} from '@src/components/compounds';
import { Tab } from '@src/components/roots';
import React, { useState } from 'react';

export interface Iparent {
  name: string;
  id: string;
}

export const ProductAddPage = ({ fromEdit }: { fromEdit: boolean }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: 'informations',
    },

    {
      title: 'variations',
    },

    {
      title: 'combinations',
    },
  ];

  return (
    <div className="p-[20px]">
      {/* tabs */}
      <div>
        <Tab
          tabs={tabs}
          activeIndex={activeTab}
          setActiveIndex={setActiveTab}
        />
      </div>

      {/* product information card */}
      {activeTab == 0 ? (
        <ProductInformation setActiveIndex={setActiveTab} fromEdit={fromEdit} />
      ) : null}

      {/* product attribute card */}
      {fromEdit && activeTab == 1 ? (
        <ProductAttribute setActiveIndex={setActiveTab} />
      ) : null}
    </div>
  );
};
