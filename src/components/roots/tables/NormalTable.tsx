'use client';

import { INormalTable } from '@src/types/roots';
import { BiPlus } from 'react-icons/bi';
import Select, {
  PlaceholderProps,
  StylesConfig,
  components,
} from 'react-select';

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

export const NormalTable = ({ columns, tableData }: INormalTable) => {
  const options = [
    { value: 'chocolate', label: 10 },
    { value: 'strawberry', label: 20 },
    { value: 'vanilla', label: 30 },
  ];

  const handleSelectChange = (selectedOption: any) => {
    console.log(selectedOption.value);
  };

  return (
    <div className="rounded-[5px] bg-red-5000">
      <div className="py-[50px] px-[30px] flex items-center rounded-[5px]">
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
          <button className="outline-none border-0 px-[16px] py-[8px] rounded-[6px] bg-[#7367f0] flex items-center gap-[8px] shadow-[0_2px_6px_rgba(47,43,61,.14),0_0_transparent,0_0_transparent]">
            <span className="text-white capitalize">
              <BiPlus size={18} />
            </span>
            <span className="text-[15px] font-[500] text-white capitalize">
              create product
            </span>
          </button>
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
        <div className="ml-[12px] w-[192px]">
          <Select
            onChange={handleSelectChange}
            placeholder="Select Status"
            options={options}
            // defaultValue={options[0]}
            styles={colourStyles}
            components={{
              IndicatorSeparator: () => null,
            }}
          />
        </div>
      </div>
      <table className="border-collapse text-[14px] rounded-t-[5px] overflow-hidden w-full block px-[20px] sm:table sm:px-0 bg-white">
        <thead className="hidden sm:table-header-group">
          <tr className="text-left  bg-indigo-500 text-white font-[700]">
            {columns.map((column) => (
              <th className="py-[12px] px-[15px]" key={column.name}>
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block sm:table-row-group">
          {tableData.map((row: any, i: number) => (
            <tr
              key={i}
              className="my-[30px]  block sm:table-row text-right sm:text-left  shadow-custom sm:shadow-none rounded sm:rounded-none  border-t-2 border-indigo-600 sm:border-t-0 sm:border-b sm:border-b-slate-200 sm:last:border-0"
            >
              {columns.map((column, columnIndex) => (
                <td
                  className="py-[12px] px-[15px] block sm:table-cell relative bg-green-5000 border-b last:border-0 sm:border-0"
                  key={columnIndex}
                  data-label={column.name}
                >
                  {column.selector(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
