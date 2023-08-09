'use cleint';

import { IProductApi } from '@src/graphql/reactivities/productVariable';
import { generateCombinations, sortString } from '@src/utils';
import { useState, useEffect } from 'react';
import { LiaAngleDownSolid } from 'react-icons/lia';
import { CombinationForm } from './CombinationForm';
import { IDyCombinationObj } from '@src/utils/generateCombinations';

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
      // combinationString: 'red-l',
      combinationString: JSON.stringify({ color: 'red', size: 'l' }),
      uniqueStringId: 'delr',
      sku: 'PROD001-RED-S',
      price: 19.99,
      avilableStock: 50,
    },

    {
      id: 2,
      // combinationString: 'green-m',
      combinationString: JSON.stringify({ color: 'green', size: 'm' }),
      uniqueStringId: 'eegmnr',
      sku: 'PROD001-RED-S',
      price: 19.99,
      avilableStock: 50,
    },

    {
      id: 3,
      // combinationString: 'green-m',
      combinationString: JSON.stringify({ color: 'green', size: 'x' }),
      uniqueStringId: 'eegnrx',
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
    IDyCombinationObj[][]
  >([]);

  // const [availableCombinations, setAvailableCombinations] = useState<string[][]>([]);

  useEffect(() => {
    const ans = generateCombinations(0, [], product);
    console.log('ans is ', ans);

    const combinations: IDyCombinationObj[][] = [];

    for (let i = 0; i < ans.length; i++) {
      let current_com = ans[i];
      let getValues = current_com.map((com) => Object.values(com));
      let sorted_current_com_string = sortString(getValues.join(''));

      const matchFound = product.combinations.find(
        (com) => com.uniqueStringId == sorted_current_com_string
      );

      console.log('getValues are ', matchFound);

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

    let st1 = 'greenx';

    console.log(sortString(st1));
    // console.log(sortString(st2));
  }, []);

  // console.log('the combination are ', availableCombinations);

  return (
    <div className="flex flex-col gap-[15px]">
      {availableCombinations.map((com, i) => (
        <div key={i}>
          <div className="w-full flex items-center gap-[20px] bg-white py-[20px] px-[30px]  rounded-t-[6px] border shadow-custom">
            {com.map((obj) => {
              return Object.values(obj).map((val) => (
                <span
                  key={val}
                  className={` text-[13px] tracking-[0.5px] px-[10px] py-[5px] cursor-pointer capitalize bg-indigo-500 text-white rounded`}
                >
                  {val}
                </span>
              ));
            })}

            <span className="ml-auto">
              <LiaAngleDownSolid size={16} />
            </span>
          </div>
          {/* form  */}
          <CombinationForm
            productId={2}
            combinationString={JSON.stringify(com)}
          />
        </div>
      ))}

      <p className="text-[13px] font-[500] tracking-[0.5px] mt-[30px] bg-indigo-500 rounded-[6px] px-[15px] py-[5px] text-white uppercase ">
        added combination
      </p>

      {product.combinations.map((com, i) => (
        <div key={i}>
          <div className="w-full flex items-center gap-[20px] bg-white py-[20px] px-[30px]  rounded-t-[6px] border shadow-custom">
            {Object.values(JSON.parse(com.combinationString)).map(
              (val: any) => (
                // <div key={val}>{val}</div>

                <span
                  key={val}
                  className={` text-[13px] tracking-[0.5px] px-[10px] py-[5px] cursor-pointer capitalize bg-indigo-500 text-white rounded`}
                >
                  {val}
                </span>
              )
            )}

            <span className="ml-auto">
              <LiaAngleDownSolid size={16} />
            </span>
          </div>
          {/* form  */}
          <div>
            <CombinationForm
              avilableStock={com.avilableStock}
              price={com.price}
              sku={com.sku}
              combinationString={com.combinationString}
              isEdit={true}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
