'use client';

import { ProductAddPage } from '@src/components/pages';
import { useState } from 'react';

import { Tab } from '@src/components/roots';
import {
  ProductAttribute,
  ProductInformation,
} from '@src/components/compounds';

const page = () => {
  // return (
  //   <div>
  //     <ProductAddPage />
  //   </div>
  // );

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
        <ProductInformation setActiveIndex={setActiveTab} />
      ) : null}

      {/* product attribute card */}
      {activeTab == 1 ? (
        <ProductAttribute setActiveIndex={setActiveTab} />
      ) : null}
    </div>
  );
};

export default page;
