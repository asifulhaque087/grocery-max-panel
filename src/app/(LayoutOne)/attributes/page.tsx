'use client';

import { useMutation, useQuery } from '@apollo/client';
import { AttributeForm } from '@src/components/compounds';
import { NormalTable } from '@src/components/roots';
import { REMOVE_ATTRIBUTE } from '@src/graphql/mutations/AttributeMutation';
import { GET_ATTRIBUTES } from '@src/graphql/queries/attributeQuery';
import { useIsBrowser } from '@src/hooks';
import Link from 'next/link';
import { BiPlus, BiSolidTrashAlt, BiSolidPencil } from 'react-icons/bi';

import Select, {
  PlaceholderProps,
  StylesConfig,
  components,
} from 'react-select';

const page = () => {
  const {
    loading: queryLoading,
    data: { attributes: attributes } = {},
    fetchMore,
  } = useQuery(GET_ATTRIBUTES);

  const [removeAttribute, { loading: mutationLoading }] =
    useMutation(REMOVE_ATTRIBUTE);

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
      name: 'Action',
      selector: (row: any) => (
        <div>
          <button
            className="mr-2"
            onClick={async () => {
              console.log('the id is ', row.id);

              if (window.confirm('Are you sure ?') == true) {
                // storeIdVar(row.id);
                await removeAttribute({
                  variables: { id: Number(row.id) },
                  update: (proxy) => {
                    proxy.evict({
                      id: `Attribute:${row.id}`,
                    });
                  },
                });
              }
            }}
          >
            <BiSolidTrashAlt size={20} className={`text-red-500`} />
          </button>
          <button className="ml-2">
            <BiSolidPencil size={20} className="text-yellow-500" />
          </button>
        </div>
      ),
    },

    // Add more columns as needed
  ];

  const colourStyles: StylesConfig = {
    control: (styles, state) => {
      return {
        ...styles,
        backgroundColor: 'white',
        padding: '2px 0px',
        outline: state.isFocused ? '0px' : '',
        boxShadow: state.isFocused ? '0px' : '',

        borderColor: state.isFocused ? '#7367f0' : 'rgba(47,43,61,0.16)',
        ':hover': {
          ...styles[':hover'],
          borderColor: state.isFocused ? '#7367f0' : 'rgba(47,43,61,0.68)',
        },
      };
    },

    placeholder: (styles) => ({
      ...styles,
      color: 'rgba(47,43,61,0.48)',
    }),

    singleValue: (styles) => ({
      ...styles,
      color: 'rgba(47,43,61,0.68)',
    }),
    dropdownIndicator: (styles, state) => ({
      ...styles,
      color: state.isFocused ? 'rgba(47,43,61,0.48)' : 'rgba(47,43,61,0.28)',
    }),

    menu: (styles) => ({
      ...styles,
      boxShadow: `rgba(47, 43, 61, 0.16) 0px 4px 11px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px`,
    }),

    menuList: (styles) => ({
      ...styles,
      padding: '10px',
      display: 'flex',
      flexDirection: 'column',
      rowGap: '5px',
    }),

    option: (styles, state) => ({
      ...styles,
      borderRadius: '10px',
      margin: '0 auto',
      backgroundColor: state.isSelected ? 'rgba(115,103,240,1)' : '',
      ':hover': {
        ...styles[':hover'],
        backgroundColor: 'rgba(115,103,240,.1)',
        color: 'rgba(115,103,240,1)',
      },
    }),
  };

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

  const TableHeader = () => {
    const options = [
      { value: 'chocolate', label: 10 },
      { value: 'strawberry', label: 20 },
      { value: 'vanilla', label: 30 },
    ];

    const handleSelectChange = (selectedOption: any) => {
      console.log(selectedOption.value);
    };

    return (
      <>
        {/* header */}
        <div className="flex items-center  rounded-[5px] px-[30px]">
          {/* input row number */}
          <div className="w-[100px]">
            <Select
              onChange={handleSelectChange}
              options={options}
              defaultValue={options[0]}
              styles={colourStyles}
              components={{
                IndicatorSeparator: () => null,
              }}
            />
          </div>

          {/* create button */}
          <div className="ml-[12px]">
            <Link href={'/category/add'}>
              <button className="outline-none border-0 px-[16px] py-[8px] rounded-[6px] bg-[#7367f0] flex items-center gap-[8px] shadow-[0_2px_6px_rgba(47,43,61,.14),0_0_transparent,0_0_transparent]">
                <span className="text-white capitalize">
                  <BiPlus size={18} />
                </span>
                <span className="text-[15px] font-[500] text-white capitalize">
                  create attribute
                </span>
              </button>
            </Link>
          </div>

          {/* serach input */}
          <div className="ml-auto  w-[192px]">
            <input
              type="text"
              placeholder="search invoice"
              className="w-full outline-none text-[rgba(47,43,61,0.68)] placeholder:text-[rgba(47,43,61,0.48)] placeholder:capitalize border rounded-[6px] px-[16px] py-[8px] focus:shadow-[0px_2px_4px_rgba(47,43,61,.12)] focus:border-[#7367f0] focus:placeholder:pl-[10px] focus:transition-all focus:placeholder:transition-all placeholder:transition-all transition-all"
            />
          </div>

          {/* select status */}
          {/* <div className="ml-[12px] w-[192px]">
          <Select
            onChange={handleSelectChange}
            placeholder="Select Status"
            options={options}
            styles={colourStyles}
            components={{
              IndicatorSeparator: () => null,
            }}
          />
        </div> */}
        </div>

        <hr className="border-t mt-[30px]" />
      </>
    );
  };

  const fetchAgain = () => {
    fetchMore({});
  };

  if (queryLoading) return <div>loading</div>;

  console.log('the attributes are ', attributes);

  return (
    <div className="flex flex-col sm:flex-row items-start gap-[20px] p-[20px]  bg-[rgb(248,247,250)]">
      {/* top */}
      <div className=" bg-white w-[60%]">
        {/* <NormalTable columns={columns} tableData={tableData} /> */}

        <NormalTable
          columns={columns}
          // tableData={tableData}
          tableData={attributes}
          TableHeader={TableHeader}
        />
      </div>
      {/* bottom */}
      <div className="w-[40%]  rounded-[10px] bg-white shadow-custom">
        {/* <h4 className="text-[16px] font-[500] text-[#24334A] capitalize py-[12px] px-[25px] border-b">
          Add new attributes
        </h4> */}

        {/* <div className="p-[24px]">
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
        </div> */}

        <AttributeForm fetchAgain={fetchAgain} />
      </div>
    </div>
  );
};

export default page;
