'use client';

import { useState, useEffect } from 'react';
import { LabelInput } from '@src/components/roots';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
import { IAttributeForm } from '@src/types/compounds';
import {
  CREATE_ATTRIBUTE,
  UPDATE_ATTRIBUTE,
} from '@src/graphql/mutations/AttributeMutation';
import { IAttribute } from '@src/types/models';

export const AttributeForm = ({ attribute, fetchAgain }: IAttributeForm) => {
  // local states
  const [isLoading, setIsLoading] = useState(false);
  // const [categories, setCategories] = useState<ICategory[]>([]);
  // const [attribute, setAttribute] = useState<IAttribute | null>(null);
  // const [categories, setCategories] = useState<any>([]);
  const [createCategory] = useMutation(CREATE_ATTRIBUTE);
  const [updateAttribute] = useMutation(UPDATE_ATTRIBUTE);

  const isEdit = attribute ? true : false;

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
      name: attribute?.name,
    },
  });

  console.log('attribute is ', attribute?.name);

  const onFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log('data is ', data);

    if (isEdit) {
      const response = await updateAttribute({
        variables: {
          id: attribute?.id,
          name: data.name,
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
      const response = await createCategory({
        variables: {
          name: data.name,
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
      name: attribute?.name,
    });

    // }
  }, [attribute]);

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
            label="Attribute Name"
            required={true}
            disabled={isLoading}
            register={register}
            errors={errors}
          />

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
