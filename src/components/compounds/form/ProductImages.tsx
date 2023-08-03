'use client';

import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT_ATTRIBUTE_VALUE_WITH_IMAGES } from '@src/graphql/mutations/productAttributeValueMutation';
import {
  IProductImageRead,
  storeSingleProduct,
} from '@src/graphql/reactivities/productVariable';
import { IProductImage } from '@src/types/compounds';
import { IProductImageInput } from '@src/types/compounds/form/ProductImages';
import { convertToBase64 } from '@src/utils/convertToBase64';
import { useEffect, useState } from 'react';

interface IInputImage {
  url: string;
  isFeatured: boolean;
}

export const ProductImages = ({
  // value,
  unSelectValue,
  createApiCallData,
  addedValue,
  productId,
}: // productAttributeId,
// productId,
// parentIdAdded,
IProductImage) => {
  // create product
  const [createProductAttributeValueWithImages] = useMutation(
    CREATE_PRODUCT_ATTRIBUTE_VALUE_WITH_IMAGES
  );

  const [selectedPhotos, setselectedPhotos] = useState<IInputImage[]>([]);
  const [addedPhotos, setAddedPhotos] = useState<IProductImageRead[]>([]);

  useEffect(() => {
    // setAddedPhotos(value?.images)
    // akane images set hobe
    // if (apiCallData?.) setAddedPhotos(value?.images);
    // console.log('the values is from images', value);
    console.log('hello from images');
    // setselectedPhotos([]);

    if (addedValue?.images) setAddedPhotos(addedValue?.images);
  }, [createApiCallData]);

  const handleImage = (images: IInputImage[]) => {
    // console.log('hello from handle image');
    setselectedPhotos(images);
  };

  const valueName = createApiCallData
    ? createApiCallData.valueName
    : addedValue?.valueName;

  return (
    <div
      className={`relative  rounded-[6px] p-[20px] border border-indigo-500/30`}
    >
      {/* remove button */}
      <span
        className="absolute bottom-[100%] left-[100%] -translate-x-[10px] translate-y-[10px] w-[15px] h-[15px] rounded-full text-[8px] bg-white border border-red-500 text-red-500 grid place-items-center cursor-pointer"
        onClick={() => {
          if (createApiCallData) unSelectValue(createApiCallData.valueId);
        }}
        // onClick={() => unSelectValue(createApiCallData?.valueId)}
      >
        x
      </span>

      {/* title */}
      <div
        className={`text-[13px] tracking-[0.5px] cursor-pointer capitalize bg-[rgba(115,103,240,0.48)] text-[rgb(115,103,240)] rounded-[4px] px-[15px] py-[5px] w-min grid place-items-center`}
      >
        {/* {createApiCallData
          ? createApiCallData.valueName
          : addedValue?.valueName} */}
        {valueName}
      </div>

      <div className="mt-[10px]">
        <div>
          <label
            htmlFor={`file-input-${valueName}`}
            className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-[#7367f0] focus:ring-[#7367f0]  bg-transparent  bg-gray-100 mr-4 py-3 px-4 capitalize"
          >
            <span>
              choose file {selectedPhotos.length ? selectedPhotos.length : null}
            </span>
            <input
              onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                let unProcessedFiles = e.target.files;
                let processedFiles = unProcessedFiles?.length
                  ? await convertToBase64(unProcessedFiles)
                  : [];
                // console.log('from from on change');

                // setselectedPhotos(processedFiles);

                handleImage(processedFiles);
              }}
              type="file"
              name="file-input"
              // id="file-input"
              id={`file-input-${valueName}`}
              multiple
              className="hidden"
            />
          </label>
        </div>

        {selectedPhotos.length ? (
          <div>
            <p className="text-[13px] font-[500] tracking-[0.5px] capitalize mt-[30px]">
              selected images
            </p>
            <div className="flex items-center justify-center gap-x-[10px] gap-y-[20px] flex-wrap mt-[30px]">
              {selectedPhotos?.map((photo, i) => (
                <div key={i} className="relative h-[200px] w-[200px]">
                  {/* remove button */}
                  <span className="absolute bottom-[100%] left-[100%] -translate-x-[10px] translate-y-[10px] w-[15px] h-[15px] rounded-full text-[8px] bg-white border border-red-500 text-red-500 grid place-items-center cursor-pointer">
                    x
                  </span>
                  {/* image-box */}
                  <div className="w-full h-full rounded-[6px] border overflow-hidden">
                    <img
                      className="h-full max-w-full object-cover object-center mx-auto"
                      src={photo.url}
                      alt="product"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              className="outline-none border-0 px-[20px] py-[5px] rounded-[6px] bg-[#7367f0]  shadow-[0_2px_6px_rgba(47,43,61,.14),0_0_transparent,0_0_transparent] mt-[30px]"
              onClick={async () => {
                const response = await createProductAttributeValueWithImages({
                  variables: {
                    // attributeName: selectedAttributeOption?.value,
                    // attributeId: selectedAttributeOption?.id,
                    // product: product?.id,
                    // valueName: value.name,
                    // valueId: value.id,
                    // attribute: productAttributeId,

                    ...createApiCallData,
                    images: selectedPhotos,
                    productId: productId,
                  },
                  update: (
                    proxy,
                    { data: { createProductAttributeValueWithImages: newData } }
                  ) => {
                    if (newData) {
                      setselectedPhotos([]);
                      storeSingleProduct(newData);
                      // setSelectedAttributeOption(undefined);
                    }
                  },
                });

                // console.log('this is save');
              }}
            >
              <span className="text-[13px] font-[500] text-white capitalize">
                Save value
              </span>
            </button>
          </div>
        ) : null}
        {/* this is the location */}

        {addedPhotos.length ? (
          <div>
            <p className="text-[13px] font-[500] tracking-[0.5px] capitalize mt-[30px]">
              added images
            </p>
            <div className="flex items-center justify-center gap-x-[10px] gap-y-[20px] flex-wrap mt-[30px]">
              {addedPhotos?.map((photo, i) => (
                <div key={i} className="relative h-[200px] w-[200px]">
                  {/* remove button */}
                  <span className="absolute bottom-[100%] left-[100%] -translate-x-[10px] translate-y-[10px] w-[15px] h-[15px] rounded-full text-[8px] bg-white border border-red-500 text-red-500 grid place-items-center cursor-pointer">
                    {/* {addedValue?.valueName} */}x
                  </span>
                  {/* image-box */}
                  <div className="w-full h-full rounded-[6px] border overflow-hidden">
                    <img
                      className="h-full max-w-full object-cover object-center mx-auto"
                      // src={photo.url}
                      src={photo?.gallery?.url}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
