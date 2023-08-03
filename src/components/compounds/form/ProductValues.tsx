import { useEffect, useState } from 'react';
import { ProductImages } from './ProductImages';
import { useReactiveVar } from '@apollo/client';
import {
  IAttributeValue,
  IProductValue,
  singleProductVar,
} from '@src/graphql/reactivities/productVariable';
import { IProductValues } from '@src/types/compounds';

// api values theke sobgula value jkn asbe tkn availableValues set hobe. jotogula available value takbe totogulai select kora jabe

// selected value holo , kotogula value select oise abailable value theke

// product value holo, added values

// available value theke added value remove hoye jabe
// selectecd value theke o added value gula remove hoye jabe.

export const ProductValues = ({
  apiValues,
  productAttributeId,
  addedValues,
}: IProductValues) => {
  const product = useReactiveVar(singleProductVar);

  const [availabeValues, setAvailableValues] = useState<IAttributeValue[]>([]);
  const [selectedValues, setSelectedValues] = useState<IAttributeValue[]>([]);
  const [productValues, setProductValues] = useState<IProductValue[]>([]);

  // const [selectedId, setSelectedId] = useState<ISelectedId>({});
  const [isImage, setIsImage] = useState<boolean>(false);

  const unSelectValue = (id: number) => {
    const updatedSelectedValues = selectedValues.filter(
      (value) => value.id != id
    );

    setSelectedValues(updatedSelectedValues);
  };

  useEffect(() => {
    // console.log('data is ', data);

    const availabeValues: IAttributeValue[] = [];

    for (let i = 0; i < apiValues?.length; i++) {
      const apiSingleValue = apiValues[i];

      const matchFound = addedValues?.find(
        (val) => val.valueId == apiSingleValue?.id
      );

      if (matchFound) {
        // finalOptions.push(option);
      } else {
        availabeValues.push(apiSingleValue);
      }
    }

    setAvailableValues(availabeValues);

    const selValues: IAttributeValue[] = [];

    for (let i = 0; i < selectedValues?.length; i++) {
      const value: IAttributeValue = selectedValues[i];

      const matchFound = addedValues?.find((val) => val.valueId == value?.id);

      if (matchFound) {
        // finalOptions.push(option);
      } else {
        selValues.push(value);
      }
    }

    setSelectedValues(selValues);
    setProductValues(addedValues);

    // setProductValues(data?.productAttributeValues);
  }, [apiValues, productAttributeId, addedValues]);

  console.log('available values are ', availabeValues);
  console.log('selected values are ', selectedValues);
  console.log('product values are ', productValues);

  return (
    <div>
      {/* list values */}

      <div className="">
        <p className="text-[13px] font-[500] tracking-[0.5px] capitalize">
          available values
        </p>
        <div className="flex items-center gap-x-[30px] mt-[15px]">
          {availabeValues.map((value: any) => {
            const itemFound = selectedValues.find((sv) => sv.id == value.id);

            return (
              <div
                key={value.id}
                className={`relative text-[13px] tracking-[0.5px] cursor-pointer capitalize  ${
                  itemFound
                    ? 'bg-[rgba(115,103,240,0.48)] text-[rgb(115,103,240)]'
                    : 'bg-gray-400 text-white'
                }  rounded-[4px] px-[15px] py-[5px] grid place-items-center`}
                onClick={() => setSelectedValues([...selectedValues, value])}
              >
                {itemFound ? (
                  <span
                    className="absolute bottom-[100%] left-[100%] -translate-x-[10px] translate-y-[10px] w-[15px] h-[15px] rounded-full text-[8px] bg-white border border-red-500 text-red-500 grid place-items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      unSelectValue(value.id);
                    }}
                  >
                    x
                  </span>
                ) : null}

                {value.name}
              </div>
            );
          })}
        </div>
      </div>

      {/* addimage button  */}
      <div className="mt-[30px] flex items-center cursor-pointer">
        <div
          className={`flex items-center w-[70px] rounded-[30px] justify-start bg-gray-500 p-[2px] ${
            isImage && '!bg-indigo-500 !justify-end'
          }`}
          onClick={() => setIsImage(!isImage)}
        >
          <div className="w-[20px] h-[20px] rounded-full bg-white" />
        </div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Add Images
        </span>
      </div>

      {!isImage ? (
        <button className="outline-none border-0 px-[20px] py-[5px] rounded-[6px] bg-[#7367f0]  shadow-[0_2px_6px_rgba(47,43,61,.14),0_0_transparent,0_0_transparent] mt-[30px]">
          <span className="text-[13px] font-[500] text-white capitalize">
            Save values
          </span>
        </button>
      ) : null}

      <div
        className={`${selectedValues.length && isImage ? 'block' : 'hidden'}`}
      >
        <p className="text-[13px] font-[500] tracking-[0.5px] mt-[30px] bg-indigo-500 rounded-[6px] px-[15px] py-[5px] text-white uppercase ">
          selected items
        </p>
        <div className={`flex flex-col gap-y-[10px] mt-[15px]`}>
          {selectedValues.map((value, i) => (
            <div key={i}>
              <ProductImages
                unSelectValue={unSelectValue}
                createApiCallData={{
                  valueName: value.name,
                  valueId: value.id,
                  productAttributeId: productAttributeId,
                }}
                productId={product?.id!}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={`${!productValues.length && 'hidden'}`}>
        <p className="text-[13px] font-[500] tracking-[0.5px] mt-[30px] bg-indigo-500 rounded-[6px] px-[15px] py-[5px] text-white uppercase ">
          added items
        </p>

        {isImage ? (
          <div
            className={`flex flex-col gap-y-[10px] mt-[15px] ${
              !isImage && '!hidden'
            }`}
          >
            {productValues.map((value, i) => (
              <div key={i}>
                <ProductImages
                  unSelectValue={unSelectValue}
                  // apiCallData={{
                  //   valueName: value.valueName,
                  //   valueId: value.id,
                  //   productAttributeId: productAttributeId,
                  // }}
                  productId={product?.id!}
                  addedValue={value}
                />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-x-[30px]">
              {productValues.map((value: any) => {
                return (
                  <div
                    key={value.id}
                    className={`relative text-[13px] tracking-[0.5px] cursor-pointer capitalize bg-[rgba(115,103,240,0.48)] text-[rgb(115,103,240)]
                      rounded-[4px] px-[15px] py-[5px] grid place-items-center`}
                    onClick={() =>
                      setSelectedValues([...selectedValues, value])
                    }
                  >
                    <span
                      className="absolute bottom-[100%] left-[100%] -translate-x-[10px] translate-y-[10px] w-[15px] h-[15px] rounded-full text-[8px] bg-white border border-red-500 text-red-500 grid place-items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        unSelectValue(value.id);
                      }}
                    >
                      x
                    </span>

                    {value.name}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
