'use client';

import { ProductAddPage } from '@src/components/pages';
import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select, {
  PlaceholderProps,
  StylesConfig,
  components,
} from 'react-select';

import { LiaAngleRightSolid, LiaAngleDownSolid } from 'react-icons/lia';

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

const page = () => {
  // return (
  //   <div>
  //     <ProductAddPage />
  //   </div>
  // );

  const [values, setValues] = useState([
    {
      value: 'chocolate',
      label: 'color',
    },
  ]);

  const [active, setActive] = useState(0);
  const [activeAttribute, setActiveAttribute] = useState(0);

  const tabs = [
    {
      title: 'informations',
    },

    {
      title: 'variations',
    },

    {
      title: 'combinations',
    },
  ];

  const options = [
    { value: 'chocolate', label: 'color' },
    { value: 'strawberry', label: 'size' },
    { value: 'vanilla', label: 'material' },
  ];

  const attributeValues = [{ name: 'red' }, { name: 'green' }];

  const handleSelectChange = (selectedOption: any) => {
    setValues(selectedOption);
    // console.log(selectedOption.value);
  };

  // console.log('values are ', values);

  return (
    <div className="p-[20px]">
      {/* tabs */}

      <div className="w-full flex items-center gap-[20px] bg-white py-[20px] px-[30px]  rounded-[6px] shadow-custom">
        {tabs.map((tab, i) => (
          <span
            className={`text-[#24334A] text-[14px] tracking-[0.5px] cursor-pointer capitalize
          ${
            i == active &&
            '!bg-[rgba(115,103,240,0.68)] !text-white !rounded-[6px] !px-[10px] !py-[2px] grid place-items-center'
          }
          `}
            onClick={() => setActive(i)}
          >
            {tab.title}
          </span>
        ))}
      </div>

      {/* product information card */}

      <div className="flex flex-col sm:flex-row items-start justify-center gap-[20px] my-[20px]  bg-[rgb(248,247,250)]">
        {/* top */}
        <div className="w-full rounded-[10px] bg-white shadow-custom">
          <h4 className="text-[16px] font-[500] text-[#24334A] capitalize py-[12px] px-[25px] border-b">
            product informations
          </h4>

          <div className="p-[24px]">
            {/* name */}
            <div className="flex flex-col gap-y-[5px]">
              <label
                htmlFor="name"
                className="text-[13px] text-[#292D32] capitalize"
              >
                product Name
              </label>
              <input
                id="name"
                type="text"
                // placeholder="search invoice"
                className="w-full outline-none text-[rgba(47,43,61,0.68)] placeholder:text-[rgba(47,43,61,0.48)] placeholder:capitalize border rounded-[6px] px-[16px] py-[8px] focus:shadow-[0px_2px_4px_rgba(47,43,61,.12)] focus:border-[#7367f0] focus:placeholder:pl-[10px] focus:transition-all focus:placeholder:transition-all placeholder:transition-all transition-all"
              />
            </div>

            {/* description */}

            <div className="mt-[15px] flex flex-col gap-y-[5px]">
              <label
                htmlFor="description"
                className="text-[13px] text-[#292D32] capitalize"
              >
                product Description
              </label>
              <div>
                <CKEditor
                  editor={ClassicEditor}
                  // data="<p>Hello from CKEditor 5!</p>"
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    // console.log('Editor is ready to use!', editor);

                    editor.editing.view.change((writer) => {
                      writer.setStyle(
                        //use max-height(for scroll) or min-height(static)
                        'min-height',
                        '180px',
                        editor.editing.view.document.getRoot()!
                      );
                    });
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                  }}
                  onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                  }}
                />
              </div>
            </div>

            <button className="outline-none border-0 px-[16px] py-[8px] rounded-[6px] bg-[#7367f0]  shadow-[0_2px_6px_rgba(47,43,61,.14),0_0_transparent,0_0_transparent] mt-[15px]">
              <span className="text-[15px] font-[500] text-white capitalize">
                Next
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* product attribute card */}

      <div className="flex flex-col sm:flex-row items-start justify-center gap-[20px] my-[20px]  bg-[rgb(248,247,250)]">
        {/* top */}
        <div className="w-full rounded-[10px] bg-white shadow-custom">
          <h4 className="text-[16px] font-[500] text-[#24334A] capitalize py-[12px] px-[25px] border-b">
            product attributes
          </h4>

          <div className="p-[24px]">
            {/* name */}
            {/* <div className="flex flex-col gap-y-[5px]">
              <label
                htmlFor="name"
                className="text-[13px] text-[#292D32] capitalize"
              >
                product Name
              </label>
              <input
                id="name"
                type="text"
                // placeholder="search invoice"
                className="w-full outline-none text-[rgba(47,43,61,0.68)] placeholder:text-[rgba(47,43,61,0.48)] placeholder:capitalize border rounded-[6px] px-[16px] py-[8px] focus:shadow-[0px_2px_4px_rgba(47,43,61,.12)] focus:border-[#7367f0] focus:placeholder:pl-[10px] focus:transition-all focus:placeholder:transition-all placeholder:transition-all transition-all"
              />
            </div> */}

            <div className="">
              <Select
                onChange={handleSelectChange}
                isMulti
                placeholder="Select Attribute"
                isClearable={true}
                options={options}
                styles={colourStyles}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </div>

            {/* values */}

            <div className="mt-[20px]">
              {values.map((value: any, i: number) => (
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
                      {value?.value}
                    </span>

                    <span>
                      <LiaAngleDownSolid size={16} />
                    </span>
                  </div>

                  {activeAttribute == i ? (
                    <div className="mt-[10px] w-full  bg-white py-[20px] px-[30px]  rounded-[6px] shadow-custom">
                      <div className="flex items-center gap-x-[50px]">
                        {attributeValues.map((atv) => (
                          <div
                            className={`relative text-[13px] tracking-[0.5px] cursor-pointer capitalize bg-[rgba(115,103,240,0.48)] text-[rgb(115,103,240)] rounded-[2px] px-[10px] py-[2px] grid place-items-center`}
                            onClick={() => setActive(i)}
                          >
                            <span className="absolute bottom-[100%] left-[100%] -translate-x-[10px] translate-y-[10px] w-[15px] h-[15px] rounded-full text-[8px] bg-white border border-red-500 text-red-500 grid place-items-center">
                              x
                            </span>
                            {atv.name}
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col gap-y-[10px] mt-[50px]">
                        {attributeValues.map((atv) => (
                          <div
                            className={`relative  rounded-[3px] p-[20px] shadow-custom`}
                            onClick={() => setActive(i)}
                          >
                            {/* remove button */}
                            <span className="absolute bottom-[100%] left-[100%] -translate-x-[10px] translate-y-[10px] w-[15px] h-[15px] rounded-full text-[8px] bg-white border border-red-500 text-red-500 grid place-items-center">
                              x
                            </span>

                            {/* title */}
                            <div
                              className={`text-[13px] tracking-[0.5px] cursor-pointer capitalize bg-[rgba(115,103,240,0.48)] text-[rgb(115,103,240)] rounded-[2px] px-[10px] py-[2px] w-min grid place-items-center`}
                              onClick={() => setActive(i)}
                            >
                              {atv.name}
                            </div>

                            <div className="mt-[10px]">
                              <div className="flex flex-col gap-y-[5px]">
                                <label className="text-[13px] text-[#292D32]">
                                  Name
                                </label>
                                <input
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
                        ))}
                      </div>
                    </div>
                  ) : null}
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
    </div>
  );
};

export default page;
