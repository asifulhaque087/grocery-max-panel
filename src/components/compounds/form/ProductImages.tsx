import { convertToBase64 } from '@src/utils/convertToBase64';
import { useState } from 'react';

interface IValue {
  name: string;
  id: number;
}

interface IProductImage {
  value: IValue;
  unSelectValue: (id: number) => void;
}

export const ProductImages = ({ value, unSelectValue }: IProductImage) => {
  const [photos, setPhotos] = useState<string[]>([]);

  return (
    <div
      className={`relative  rounded-[6px] p-[20px] border border-indigo-500/30`}
    >
      {/* remove button */}
      <span
        className="absolute bottom-[100%] left-[100%] -translate-x-[10px] translate-y-[10px] w-[15px] h-[15px] rounded-full text-[8px] bg-white border border-red-500 text-red-500 grid place-items-center cursor-pointer"
        onClick={() => unSelectValue(value.id)}
      >
        x
      </span>

      {/* title */}
      <div
        className={`text-[13px] tracking-[0.5px] cursor-pointer capitalize bg-[rgba(115,103,240,0.48)] text-[rgb(115,103,240)] rounded-[4px] px-[15px] py-[5px] w-min grid place-items-center`}
      >
        {value.name}
      </div>

      <div className="mt-[10px]">
        <div className="flex flex-col gap-y-[5px]">
          <div>
            <label htmlFor="file-input" className="sr-only">
              Choose file
            </label>
            <input
              onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                let files = await convertToBase64(e.target.files);

                // console.log('files are ', files);

                setPhotos(files);
              }}
              type="file"
              name="file-input"
              id="file-input"
              multiple
              className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-[#7367f0] focus:ring-[#7367f0] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-x-[10px] gap-y-[20px] flex-wrap mt-[30px]">
          {photos?.map((photo, i) => (
            <div key={i} className="relative h-[200px] w-[200px]">
              {/* remove button */}
              <span className="absolute bottom-[100%] left-[100%] -translate-x-[10px] translate-y-[10px] w-[15px] h-[15px] rounded-full text-[8px] bg-white border border-red-500 text-red-500 grid place-items-center cursor-pointer">
                x
              </span>
              {/* image-box */}
              <div className="w-full h-full rounded-[6px] border overflow-hidden">
                <img
                  className="h-full max-w-full object-cover object-center mx-auto"
                  src={photo}
                />
              </div>
            </div>
          ))}
        </div>

        <button className="outline-none border-0 px-[16px] py-[8px] rounded-[6px] bg-[#7367f0]  shadow-[0_2px_6px_rgba(47,43,61,.14),0_0_transparent,0_0_transparent] mt-[10px]">
          <span className="text-[15px] font-[500] text-white capitalize">
            Add
          </span>
        </button>
      </div>
    </div>
  );
};
