import { useState } from 'react';

import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { LabelInput } from './LabelInput';

interface ICombinationForm {
  productId?: number;
  sku?: string;
  price?: number;
  avilableStock?: number;
  isEdit?: boolean;
  combinationString: string;
}

// combination create korar jonno ---
// product id lagbe
// combination string lagbe  | ata create korte hobe generated combination array theke ['red', 'l']
// unique string id lagbe  | ata o create korte hobe

// edit er jonno ----
// combination id

// input r label fix korar jonno combination string lagbe

export const CombinationForm = ({
  productId,
  avilableStock,
  price,
  sku,
  isEdit = false,
  combinationString,
}: ICombinationForm) => {
  const [isLoading, setIsLoading] = useState(false);

  //   console.log('values are ', avilableStock, price, sku);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      sku: sku ? sku : '',
      price: price ? price : '',
      avilableStock: avilableStock ? avilableStock : '',
    },
  });

  const onFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('the data is ', data);
  };

  return (
    <div className="bg-gray-200 rounded-b-[6px]">
      <form
        className="p-[24px] flex flex-col gap-y-[15px]"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        {/* sku*/}
        <LabelInput
          name="sku"
          htmlFor={`${combinationString}sku`}
          label="Product sku"
          required={true}
          disabled={isLoading}
          register={register}
          errors={errors}
        />

        {/* price */}
        <LabelInput
          name="price"
          htmlFor={`${combinationString}price`}
          label="Product Price"
          required={true}
          disabled={isLoading}
          register={register}
          errors={errors}
        />

        {/* available stock */}
        <LabelInput
          name="avilableStock"
          htmlFor={`${combinationString}avilableStock`}
          label="Available stock"
          required={true}
          disabled={isLoading}
          register={register}
          errors={errors}
        />

        <button
          type="submit"
          className="outline-none border-0 px-[16px] py-[8px] rounded-[6px] bg-[#7367f0]  shadow-[0_2px_6px_rgba(47,43,61,.14),0_0_transparent,0_0_transparent] mt-[15px]"
        >
          <span className="text-[15px] font-[500] text-white capitalize">
            Add
          </span>
        </button>
      </form>
    </div>
  );
};
