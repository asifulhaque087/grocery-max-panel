'use client';

import { ICategory } from '@src/types/roots';

export const Category = ({ id, name, photo }: ICategory) => {
  return (
    <>
      {/* max size hobe 1170px */}
      {/* grid diye korte hobe */}
      {/* 2 ta part hobe , akta 80% bakita 20%, 80% er tar content center a takbe */}
      {/* md te 2 ta r lg te 3 ta */}

      {/* <div>this is category section</div> */}

      <div className="flex items-center border rounded px-[10px] py-[15px]">
        {/* left */}
        <div className="w-[80%] text-center font-[15px] text-[#615E58]">
          {name}
        </div>
        {/* right */}
        <div className="ml-auto pr-3">
          <img src={`${photo}`} alt="category" width={30} />
        </div>
      </div>
    </>
  );
};
