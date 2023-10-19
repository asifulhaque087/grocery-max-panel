'use client';

import { useState, useEffect } from 'react';
import { LabelInput, SelectField } from '@src/components/roots';

import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
import { IAttributeValueForm } from '@src/types/compounds';
import { UPDATE_ATTRIBUTE } from '@src/graphql/mutations/AttributeMutation';
import { CREATE_ATTRIBUTE_VALUE } from '@src/graphql/mutations/AttributeValueMutation';

export const AttributeValueForm = ({
  attributes,
  value,
  fetchAgain,
}: IAttributeValueForm) => {
  // local states
  const [isLoading, setIsLoading] = useState(false);
  const [createAttributeValue] = useMutation(CREATE_ATTRIBUTE_VALUE);
  const [updateAttribute] = useMutation(UPDATE_ATTRIBUTE);

  const isEdit = value ? true : false;

  const {
    register,
    control,
    handleSubmit,
    // setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      // name: attribute?.name ? attribute.name : '',
      // name: "hwok",
      name: value?.name,
      attributeId: null,
    },
  });

  console.log('attribute is ', value?.name);

  const onFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log('data is ', data);

    if (isEdit) {
      const response = await updateAttribute({
        variables: {
          id: value?.id,
          name: data.name,
          attribute: data.attributeId,
        },
        update: (_, { data: { updateAttribute: newAttribute } }) => {
          if (newAttribute?.attribute) {
            // router.push('/category');
          }
        },
      });

      reset();
      // setAttribute(null);
      toast.success('Attribute updated successfully');
      if (fetchAgain) fetchAgain();
    } else {
      const response = await createAttributeValue({
        variables: {
          name: data.name,
          attribute: Number(data.attributeId),
        },
      });

      reset();
      toast.success('Attribute added successfully');

      if (fetchAgain) fetchAgain();
    }
  };

  useEffect(() => {
    // if (attribute){
    reset({
      name: value?.name,
    });

    // }
  }, [value]);

  return (
    <>
      <h4 className="text-[16px] font-[500] text-[#24334A] capitalize py-[12px] px-[25px] border-b">
        {isEdit ? 'update attribute' : 'Add new attributes'}
      </h4>

      <div className="bg-white p-[20px]">
        <form
          className="flex flex-col gap-y-[15px]"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          {/* name */}
          <LabelInput
            name="name"
            htmlFor="name"
            label="Value Name"
            required={true}
            disabled={isLoading}
            register={register}
            errors={errors}
          />

          {/* Attributes */}
          <div className="flex flex-col">
            <label
              htmlFor="categories"
              className="text-[13px] text-[#292D32] capitalize"
            >
              Attribute
            </label>
            <SelectField
              control={control}
              controller={Controller}
              selectLabel="Attribute"
              selectName="attributeId"
              selectOptions={attributes}
            />
          </div>

          <button
            type="submit"
            className="outline-none border-0 px-[16px] py-[8px] rounded-[6px] bg-[#7367f0]  shadow-[0_2px_6px_rgba(47,43,61,.14),0_0_transparent,0_0_transparent] mt-[15px]"
            // onClick={() => setActiveIndex(1)}
          >
            <span className="text-[15px] font-[500] text-white capitalize">
              {isEdit ? 'Update' : 'Add'}
            </span>
          </button>
        </form>
        <DevTool control={control} />
      </div>
    </>
  );
};
