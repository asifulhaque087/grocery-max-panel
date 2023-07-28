import { IProductAttribute } from '@src/types/compounds';
import { useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import { ProductValues } from './ProductValues';
import { LiaAngleDownSolid } from 'react-icons/lia';

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

export const ProductAttribute = ({}: IProductAttribute) => {
  const [selectedAttributes, setSelectedAttributes] = useState([
    {
      value: 'color',
      label: 'color',
    },
  ]);

  const [activeAttribute, setActiveAttribute] = useState(0);

  const apiAttributes = [
    { value: 'color', label: 'color' },
    { value: 'size', label: 'size' },
    { value: 'material', label: 'material' },
  ];

  const handleSelectAttributes = (selectedOption: any) => {
    setSelectedAttributes(selectedOption);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start justify-center gap-[20px] my-[20px]  bg-[rgb(248,247,250)]">
      {/* top */}
      <div className="w-full rounded-[10px] bg-white shadow-custom">
        <h4 className="text-[16px] font-[500] text-[#24334A] capitalize py-[12px] px-[25px] border-b">
          product attributes
        </h4>

        <div className="p-[24px]">
          <div className="">
            <Select
              onChange={handleSelectAttributes}
              isMulti
              placeholder="Select Attribute"
              isClearable={true}
              options={apiAttributes}
              styles={colourStyles}
              components={{
                IndicatorSeparator: () => null,
              }}
            />
          </div>

          {/* values */}

          <div className="mt-[20px]">
            {selectedAttributes.map((attribute: any, i: number) => (
              <div>
                <div
                  className="mt-[10px] w-full flex items-center justify-between gap-[20px] bg-white py-[20px] px-[30px]  rounded-[6px] shadow-custom"
                  onClick={() =>
                    activeAttribute == i
                      ? setActiveAttribute(-1)
                      : setActiveAttribute(i)
                  }
                >
                  <span
                    className={`text-[#24334A] text-[14px] tracking-[0.5px] cursor-pointer capitalize`}
                  >
                    {attribute?.value}
                  </span>

                  <span>
                    <LiaAngleDownSolid size={16} />
                  </span>
                </div>

                {/* expand box */}
                {/* {activeAttribute == i ? (
                  <div className="mt-[10px] w-full  bg-white py-[20px] px-[30px]  rounded-[6px] shadow-custom">
                    <ProductValues />
                  </div>
                ) : null} */}

                <div
                  className={`mt-[10px] w-full  bg-white py-[20px] px-[30px]  rounded-[6px] shadow-custom ${
                    activeAttribute == i ? 'block' : 'hidden'
                  }`}
                >
                  <ProductValues />
                </div>
              </div>
            ))}
          </div>

          <button className="outline-none border-0 px-[16px] py-[8px] rounded-[6px] bg-[#7367f0]  shadow-[0_2px_6px_rgba(47,43,61,.14),0_0_transparent,0_0_transparent] mt-[15px]">
            <span className="text-[15px] font-[500] text-white capitalize">
              Next
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
