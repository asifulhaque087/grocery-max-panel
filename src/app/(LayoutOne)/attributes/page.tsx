'use client';

import { NormalTable } from '@src/components/roots';
import { useIsBrowser } from '@src/hooks';

const page = () => {
  const columns = [
    {
      name: 'ID',
      selector: (row: any) => row.id,
    },
    {
      name: 'Name',
      selector: (row: any) => row.name,
    },
    {
      name: 'Photo',
      selector: (row: any) => (
        <img
          alt="product"
          src={row.photo}
          className="w-[30px] ml-auto md:ml-0"
        />
      ),
    },
    // Add more columns as needed
  ];

  const tableData = [
    {
      id: 1,
      name: 'John Doe',
      photo:
        'https://chaldn.com/_mpimage/soft-drinks?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D27882&q=best&v=1&m=400&webp=1',
    },
    {
      id: 2,
      name: 'Jane Smith',
      photo:
        'https://chaldn.com/_mpimage/coffee?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31521&q=best&v=1&m=400&webp=1',
    },

    {
      id: 3,
      name: 'Jane Smith',
      photo:
        'https://chaldn.com/_mpimage/coffee?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31521&q=best&v=1&m=400&webp=1',
    },

    {
      id: 4,
      name: 'Jane Smith',
      photo:
        'https://chaldn.com/_mpimage/coffee?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31521&q=best&v=1&m=400&webp=1',
    },

    {
      id: 5,
      name: 'Jane Smith',
      photo:
        'https://chaldn.com/_mpimage/coffee?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31521&q=best&v=1&m=400&webp=1',
    },
    {
      id: 6,
      name: 'Jane Smith',
      photo:
        'https://chaldn.com/_mpimage/coffee?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31521&q=best&v=1&m=400&webp=1',
    },
    {
      id: 7,
      name: 'Jane Smith',
      photo:
        'https://chaldn.com/_mpimage/coffee?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31521&q=best&v=1&m=400&webp=1',
    },
    {
      id: 8,
      name: 'Jane Smith',
      photo:
        'https://chaldn.com/_mpimage/coffee?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31521&q=best&v=1&m=400&webp=1',
    },
    {
      id: 9,
      name: 'Jane Smith',
      photo:
        'https://chaldn.com/_mpimage/coffee?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31521&q=best&v=1&m=400&webp=1',
    },
    {
      id: 10,
      name: 'Jane Smith',
      photo:
        'https://chaldn.com/_mpimage/coffee?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31521&q=best&v=1&m=400&webp=1',
    },
    // Add more rows as needed
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start gap-[20px] p-[20px]  bg-[rgb(248,247,250)]">
      {/* top */}
      <div className=" bg-white w-[60%]">
        <NormalTable columns={columns} tableData={tableData} />
      </div>
      {/* bottom */}
      <div className="w-[40%]  rounded-[10px] bg-white shadow-custom">
        <h4 className="text-[16px] font-[500] text-[#24334A] capitalize py-[12px] px-[25px] border-b">
          Add new attributes
        </h4>

        <div className="p-[24px]">
          <div className="flex flex-col gap-y-[5px]">
            <label htmlFor="name" className="text-[13px] text-[#292D32]">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="search invoice"
              className="w-full outline-none text-[rgba(47,43,61,0.68)] placeholder:text-[rgba(47,43,61,0.48)] placeholder:capitalize border rounded-[6px] px-[16px] py-[8px] focus:shadow-[0px_2px_4px_rgba(47,43,61,.12)] focus:border-[#7367f0] focus:placeholder:pl-[10px] focus:transition-all focus:placeholder:transition-all placeholder:transition-all transition-all"
            />
          </div>
          <button className="outline-none border-0 px-[16px] py-[8px] rounded-[6px] bg-[#7367f0]  shadow-[0_2px_6px_rgba(47,43,61,.14),0_0_transparent,0_0_transparent] mt-[10px]">
            <span className="text-[15px] font-[500] text-white capitalize">
              Add
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
