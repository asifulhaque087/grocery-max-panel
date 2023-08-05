'use cleint';

import { IProductApi } from '@src/graphql/reactivities/productVariable';
import { generateCombinations, sortString } from '@src/utils';
import { useState, useEffect } from 'react';

const product: IProductApi = {
  id: 1,
  name: 'Dynamic Customizable Image Product',
  slug: 'dynamic-customizable-image-product',
  description:
    "The 'Dynamic Customizable Image Product' is a powerful and flexible product that allows users to create and customize their own unique images. It is designed to cater to various creative needs, from personalized artworks to customizable merchandise.",
  attributes: [
    {
      id: 1,
      attributeName: 'colors',
      attributeId: 1001,
      values: [
        {
          id: 101,
          valueName: 'green',
          valueId: 1,
          images: [
            {
              id: 1001,
              isFeature: true,
              gallery: {
                id: 10001,
                url: 'https://example.com/gallery/colors',
              },
            },
            {
              id: 1002,
              isFeature: false,
              gallery: {
                id: 10002,
                url: 'https://example.com/gallery/colors2',
              },
            },
            // Add more images as needed
          ],
        },
        {
          id: 102,
          valueName: 'red',
          valueId: 2,
          images: [
            {
              id: 1003,
              isFeature: true,
              gallery: {
                id: 10003,
                url: 'https://example.com/gallery/patterns',
              },
            },
            // Add more images as needed
          ],
        },

        {
          id: 102,
          valueName: 'yellow',
          valueId: 3,
          images: [
            {
              id: 1003,
              isFeature: true,
              gallery: {
                id: 10003,
                url: 'https://example.com/gallery/patterns',
              },
            },
            // Add more images as needed
          ],
        },

        // Add more attributes as needed
      ],
    },
    {
      id: 2,
      attributeName: 'sizes',
      attributeId: 1002,
      values: [
        {
          id: 102,
          valueName: 'x',
          valueId: 4,
          images: [
            {
              id: 1003,
              isFeature: true,
              gallery: {
                id: 10003,
                url: 'https://example.com/gallery/patterns',
              },
            },
            // Add more images as needed
          ],
        },

        {
          id: 102,
          valueName: 'l',
          valueId: 5,
          images: [
            {
              id: 1003,
              isFeature: true,
              gallery: {
                id: 10003,
                url: 'https://example.com/gallery/patterns',
              },
            },
            // Add more images as needed
          ],
        },
        {
          id: 102,
          valueName: 'm',
          valueId: 6,
          images: [
            {
              id: 1003,
              isFeature: true,
              gallery: {
                id: 10003,
                url: 'https://example.com/gallery/patterns',
              },
            },
            // Add more images as needed
          ],
        },
      ],
    },
  ],

  combinations: [
    {
      id: 1,
      combinationString: 'red-l',
      uniqueStringId: 'delr',
      sku: 'PROD001-RED-S',
      price: 19.99,
      avilableStock: 50,
    },

    {
      id: 2,
      combinationString: 'green-m',
      uniqueStringId: 'eegmnr',
      sku: 'PROD001-RED-S',
      price: 19.99,
      avilableStock: 50,
    },
  ],
};

// target =====>
// jkn product asbe useEfect run hobe
// tkn combinations gula generate hobe
// same time a product er already added combinations gula o amader kache takbe (added combinations)
// amader generated combinations theke jei combinations gula already added aigula filter kore remove korte hobe

// ??? filter kivabe korbo

// [[soluation : 1]]
// added combinations gular structure gula string akare takbe (red-xl)
// protome string to array te convert korte hobe abong addedCombinations a set korete hobe
// arekta useEffect fire hobe jkn addedCombinations state set hobe
// sobgula combinations generate hobe
// generate combinations a loop cholbe
// check korbo current combination added combination a ase kina JSON.Stingfy() er moaddome
// jodi take tahole skip korbo , r baki gulo ke akta new varialbe a store korbo abong loop sesh hourar pore availabeCombinations a set korbo

// [[soluation : 2]]
// added combinations gular structure gula string akare takbe (red-xl)
// sobgula combinations generate hobe
// generate combinations a loop cholbe
// check korbo current combination added combination a ase kina. | ata korbo current generate combination ke "red-yellow"  ai format a convert kore
// jodi take tahole skip korbo , r baki gulo ke akta new varialbe a store korbo abong loop sesh hourar pore availabeCombinations a set korbo

// [[soluation : 3]]
// added combinations gular unique_string_id string akare takbe abong sorted takbe kno - takbe na.
// sobgula combinations generate hobe
// generate combinations a loop cholbe
// check korbo current combination added combination a ase kina. | ata korbo unique_string_id er moddome
// jodi take tahole skip korbo , r baki gulo ke akta new varialbe a store korbo abong loop sesh hourar pore availabeCombinations a set korbo

// [[posibility: 1]]
// anagram kina aita diye o check kora jete pare.

//  we should go with soluation: 3 | cause we are going to do something like this in frontend or we will use this technique to match the combination using valueName

export const ProductCombinationList = () => {
  const [availableCombinations, setAvailableCombinations] = useState<
    string[][]
  >([]);
  // const [availableCombinations, setAvailableCombinations] = useState<string[][]>([]);

  useEffect(() => {
    const ans = generateCombinations(0, [], product);

    const combinations: string[][] = [];
    for (let i = 0; i < ans.length; i++) {
      let current_com_string = ans[i].join('');
      let sorted_current_com_string = sortString(current_com_string);

      const matchFound = product.combinations.find(
        (com) => com.uniqueStringId == sorted_current_com_string
      );

      if (!matchFound) {
        combinations.push(ans[i]);
      }
    }
    setAvailableCombinations(combinations);

    // const arr1 = ["red", 'green']
    // const arr2 = ["red", 'green']

    // console.log(JSON.stringify(arr1) == JSON.stringify(arr2))

    // let st1 = 'redl';
    // let st2 = 'greenm';
    // let st2 = "red-xl"
    // console.log(st1 == st2)

    // console.log(sortString(st1));
    // console.log(sortString(st2));
  }, []);

  console.log('the combination are ', availableCombinations);

  return (
    <div>
      {availableCombinations.map((com, i) => (
        <div key={i} className="flex items-center gap-x-[15px]">
          {com.map((value) => (
            <span key={value}>{value}</span>
          ))}
          {/* <header>this si header</header> */}
          {/* <div>this is form for this combination</div> */}
        </div>
      ))}

      <p className="text-[13px] font-[500] tracking-[0.5px] mt-[30px] bg-indigo-500 rounded-[6px] px-[15px] py-[5px] text-white uppercase ">
        added combination
      </p>

      {product.combinations.map((com, i) => (
        <div key={i} className="flex items-center gap-[15px]">
          {/* header */}
          {/* <header>this is added header</header> */}
          {/* <div>this is form for this added combination</div> */}
          {com.combinationString.split('-').map((val) => (
            <div key={val}>{val}</div>
          ))}
        </div>
      ))}
    </div>
  );
};
