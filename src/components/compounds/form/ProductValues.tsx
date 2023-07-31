import { useEffect, useState } from 'react';
import { ProductImages } from './ProductImages';
import { useReactiveVar } from '@apollo/client';
import { singleProductVar } from '@src/graphql/reactivities/productVariable';

interface IGallery {
  id: number;
  url: string;
}

interface IImage {
  id: number;
  isFeature: boolean;
  gallery: IGallery[];
}

interface IValue {
  id: number;
  valueId: number;
  name: string;
  images?: IImage[];
}

interface IData {
  productAttributeId: number;
  id: number;
  productAttributeValues: IValue[];
  values: IValue[];
  // value: attribute.name,
  // label: attribute.name,
}

interface IProductAttribute {
  data: IData;
}

export const ProductValues = ({ data }: IProductAttribute) => {
  const product = useReactiveVar(singleProductVar);

  const [availabeValues, setAvailableValues] = useState<IValue[]>([]);
  const [selectedValues, setSelectedValues] = useState<IValue[]>([]);
  const [productValues, setProductValues] = useState<IValue[]>([]);

  // const [selectedId, setSelectedId] = useState<ISelectedId>({});
  const [isImage, setIsImage] = useState<boolean>(false);

  const unSelectValue = (id: number) => {
    const updatedSelectedValues = selectedValues.filter(
      (value) => value.id != id
    );

    setSelectedValues(updatedSelectedValues);
  };

  useEffect(() => {
    console.log('data is ', data);

    const availabeValues: IValue[] = [];

    for (let i = 0; i < data.values?.length; i++) {
      const value = data.values[i];

      const matchFound = data?.productAttributeValues?.find(
        (attval) => attval.valueId == value?.id
      );

      if (matchFound) {
        // finalOptions.push(option);
      } else {
        availabeValues.push(value);
      }
    }

    setAvailableValues(availabeValues);

    const selValues: IValue[] = [];

    for (let i = 0; i < data.productAttributeValues?.length; i++) {
      const value = data.productAttributeValues[i];

      const matchFound = selectedValues?.find(
        (selval) => selval.id == value?.valueId
      );

      if (matchFound) {
        // finalOptions.push(option);
      } else {
        selValues.push(value);
      }
    }

    setSelectedValues(selValues);
    setProductValues(data.productAttributeValues);

    // setProductValues(data?.productAttributeValues);
  }, [data]);

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

      {/* <p>selected values</p>
        <div className="flex items-center gap-x-[30px] mt-[15px]">
          {selectedValues.map((value: any) => {
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
        </div> */}

      {!isImage ? (
        <button className="outline-none border-0 px-[20px] py-[5px] rounded-[6px] bg-[#7367f0]  shadow-[0_2px_6px_rgba(47,43,61,.14),0_0_transparent,0_0_transparent] mt-[30px]">
          <span className="text-[13px] font-[500] text-white capitalize">
            Save values
          </span>
        </button>
      ) : null}

      {/* upload images for values */}

      {/* <div className="flex flex-col gap-y-[10px] mt-[50px]">
        {isImage &&
          selectedValues.map((value, i) => (
            <div key={i}>
              <ProductImages
                value={value}
                unSelectValue={unSelectValue}
              />
            </div>
          ))}
      </div> */}

      <div
        className={`${selectedValues.length && isImage ? 'block' : 'hidden'}`}
      >
        <p className="text-[13px] font-[500] tracking-[0.5px] capitalize mt-[15px]">
          selected items
        </p>
        <div
          className={`flex flex-col gap-y-[10px] mt-[15px] ${
            !isImage && '!hidden'
          }`}
        >
          {selectedValues.map((value, i) => (
            <div key={i}>
              <ProductImages
                value={value}
                unSelectValue={unSelectValue}
                productAttributeId={data?.productAttributeId}
                productId={product?.id}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={`${!productValues.length && 'hidden'}`}>
        <p className="text-[13px] font-[500] tracking-[0.5px] capitalize mt-[15px]">
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
                  value={value}
                  unSelectValue={unSelectValue}
                  parentIdAdded={true}
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
