import { useState } from 'react';
import { ProductImages } from './ProductImages';

interface IValue {
  name: string;
  id: number;
}
// interface ISelectedId {
//   [key: number]: number;
// }

export const ProductValues = ({ values }: any) => {
  const [selectedValues, setSelectedValues] = useState<IValue[]>([]);

  // const [selectedId, setSelectedId] = useState<ISelectedId>({});
  const [isImage, setIsImage] = useState<boolean>(false);

  // const handleSelectValues = (value: IValue) => {
  //   const id = value.id;
  //   const item = selectedId[id];

  //   if (item) {
  //     let index = selectedId[id] - 1;
  //     const updatedSelectId = { ...selectedId };
  //     delete updatedSelectId[id];
  //     setSelectedId(updatedSelectId);

  //     const updatedSelectedValues = [...selectedValues];
  //     updatedSelectedValues.splice(index, 1);
  //     setSelectedValues(updatedSelectedValues);
  //   } else {
  //     setSelectedId({ [id]: selectedValues.length + 1 });
  //     setSelectedValues((oldValue) => [...oldValue, value]);
  //   }
  // };

  // const values: IValue[] = [
  //   { name: 'red', id: 1 },
  //   { name: 'green', id: 2 },
  //   { name: 'yellow', id: 3 },
  //   { name: 'blue', id: 4 },
  // ];

  const unSelectValue = (id: number) => {
    const updatedSelectedValues = selectedValues.filter(
      (value) => value.id != id
    );

    setSelectedValues(updatedSelectedValues);
  };

  return (
    <div>
      {/* list values */}
      <div className="flex items-center gap-x-[30px]">
        {values.map((value: any) => {
          const itemFound = selectedValues.find((sv) => sv.id == value.id);
          // let index = -1;
          // for (let indx = 0; indx < selectedValues.length; indx++) {
          //   if (selectedValues[indx].id == value.id) {
          //     index = indx;
          //     break;
          //   }
          // }

          // console.log('match found ', index);

          // const itemFound = index >= 0;
          // console.log('item is ', itemFound);

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

      <div className="mt-[50px] flex items-center cursor-pointer">
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
        className={`flex flex-col gap-y-[10px] mt-[50px] ${
          !isImage && '!hidden'
        }`}
      >
        {selectedValues.map((value, i) => (
          <div key={i}>
            <ProductImages value={value} unSelectValue={unSelectValue} />
          </div>
        ))}
      </div>
    </div>
  );
};
