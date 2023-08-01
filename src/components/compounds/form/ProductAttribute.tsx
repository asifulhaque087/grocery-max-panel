'use client';
export const dynamic = 'force-dynamic';

import { IProductAttribute } from '@src/types/compounds';
import { useState, useEffect } from 'react';
import Select, { StylesConfig } from 'react-select';
import { ProductValues } from './ProductValues';
import { LiaAngleDownSolid } from 'react-icons/lia';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import {
  IAttribute,
  singleProductVar,
  storeSingleProduct,
} from '@src/graphql/reactivities/productVariable';
import { GET_ATTRIBUTES } from '@src/graphql/queries/attributeQuery';
import { CREATE_PRODUCT_ATTRIBUTE } from '@src/graphql/mutations/productAttributeMutation';
import {
  IAttributeSelectFormat,
  IProductAttributeAndSendValues,
} from '@src/types/compounds/form/ProductAttribute';

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

// sobgula apiAttributes asbe api theke
// tarpore attributeName and attributeId select korbe
// attributeName = apiAttribute.name
// attributeId = apiAttribute.id
// r productId asbe product global state theke

export const ProductAttribute = ({}: IProductAttribute) => {
  // fetch data
  let { loading, data: { apiAttributes } = {} } = useQuery(GET_ATTRIBUTES);

  // create product
  const [createProductAttribute] = useMutation(CREATE_PRODUCT_ATTRIBUTE);

  const product = useReactiveVar(singleProductVar);

  // states

  const [allAttributeOptions, setallAttributeOptions] = useState<
    IAttributeSelectFormat[]
  >([]);
  const [selectedAttributeOption, setSelectedAttributeOption] =
    useState<IAttributeSelectFormat>();
  const [addedAttributeOptions, setAddedAttributeOptions] = useState<
    IProductAttributeAndSendValues[]
  >([]);

  // always api theke asbe
  // const [finalAttributes, setFianlAttributes] = useState<any>([]);
  const [activeAttribute, setActiveAttribute] = useState(-1);

  useEffect(() => {
    const allOptions: IAttributeSelectFormat[] = [];
    const finalOptions: IProductAttributeAndSendValues[] = [];

    for (let i = 0; i < apiAttributes?.length; i++) {
      const attribute: IAttribute = apiAttributes[i];

      const matchFound = product?.attributes?.find(
        (att) => att.attributeId == attribute?.id
      );

      const option: IAttributeSelectFormat = {
        value: attribute.id,
        label: attribute.name,
      };

      if (matchFound) {
        const prepareAttribute: IProductAttributeAndSendValues = {
          ...matchFound,
          apiValues: attribute.values,
        };
        finalOptions.push(prepareAttribute);
      } else {
        allOptions.push(option);
      }
    }

    setallAttributeOptions(allOptions);
    if (finalOptions.length) setAddedAttributeOptions(finalOptions);
  }, [product, apiAttributes]);

  // methods
  const handleSelectAttributes = (selectedOption: any) => {
    setSelectedAttributeOption(selectedOption);
  };

  // const handleSubmit = (selectedOption: any) => {

  // };

  // console.log('all options are ', allAttributeOptions);
  // console.log('slected options are ', selectedAttributeOption);
  // console.log('finals are ', finalAttributeOptions);

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
              placeholder="Select Attribute"
              isClearable={true}
              options={allAttributeOptions}
              styles={colourStyles}
              components={{
                IndicatorSeparator: () => null,
              }}
            />
          </div>

          {/* values */}

          {selectedAttributeOption ? (
            <div className="mt-[20px] flex items-center gap-x-[20px] flex-wrap">
              <div className="mt-[10px]  bg-white py-[20px] px-[30px]  rounded-[6px]  border shadow-sm">
                <p
                  className={`text-[#24334A] text-[14px] tracking-[0.5px] cursor-pointer capitalize text-center`}
                >
                  {selectedAttributeOption?.label}
                </p>

                <button
                  className="outline-none border-0 px-[10px] py-[3px] rounded-[6px] bg-[#7367f0]  shadow-[0_2px_6px_rgba(47,43,61,.14),0_0_transparent,0_0_transparent] mt-[15px] text-[13px] font-[500] text-white capitalize"
                  onClick={async () => {
                    const response = await createProductAttribute({
                      variables: {
                        attributeName: selectedAttributeOption?.label,
                        attributeId: selectedAttributeOption?.value,
                        product: product?.id,
                      },
                      update: (
                        proxy,
                        { data: { createProductAttribute: newData } }
                      ) => {
                        if (newData) {
                          storeSingleProduct(newData);
                          setSelectedAttributeOption(undefined);
                        }
                      },
                    });

                    // console.log('this is save');
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          ) : null}

          {/* final attributes */}
          <div className="mt-[20px]">
            {addedAttributeOptions?.map((productAttribute, i: number) => (
              <div key={i}>
                <div className="flex items-center gap-x-[20px]">
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
                      {productAttribute?.name}
                    </span>

                    <span>
                      <LiaAngleDownSolid size={16} />
                    </span>
                  </div>

                  {/* <button className="outline-none border-0 px-[16px] py-[8px] rounded-[6px] bg-[#7367f0]  shadow-[0_2px_6px_rgba(47,43,61,.14),0_0_transparent,0_0_transparent] mt-[15px]">
                    <span className="text-[15px] font-[500] text-white capitalize">
                      Save
                    </span>
                  </button> */}

                  <button className="outline-none border-0 px-[16px] py-[8px] rounded-[6px] bg-red-500  shadow-[0_2px_6px_rgba(47,43,61,.14),0_0_transparent,0_0_transparent] mt-[15px]">
                    <span className="text-[15px] font-[500] text-white capitalize">
                      Remove
                    </span>
                  </button>
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
                  {/* <ProductValues data={attribute} /> */}
                  <ProductValues
                    apiValues={productAttribute.apiValues}
                    addedValues={productAttribute.values}
                    productAttributeId={productAttribute.id}
                  />
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
