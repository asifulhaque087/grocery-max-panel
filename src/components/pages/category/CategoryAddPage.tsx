'use client';

import { CategoryAddForm } from '@src/components/compounds';
import { BiListUl } from 'react-icons/bi';

export const CategoryAddPage = () => {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-[20px] p-[20px]  bg-[rgb(248,247,250)]">
      {/* top */}
      <div className="w-[60%]  rounded-[10px] bg-white shadow-custom">
        {/* header */}
        <div className="flex items-center  rounded-[5px] px-[20px] py-[20px] bg-white">
          {/* create button */}
          <div className="">
            <button className="outline-none border-0 px-[16px] py-[8px] rounded-[6px] bg-[#7367f0] flex items-center gap-[8px] shadow-[0_2px_6px_rgba(47,43,61,.14),0_0_transparent,0_0_transparent]">
              <span className="text-white capitalize">
                <BiListUl size={18} />
              </span>
              <span className="text-[15px] font-[500] text-white capitalize">
                list category
              </span>
            </button>
          </div>
        </div>

        <hr className="border-t" />
        <CategoryAddForm />
      </div>
    </div>
  );
};
