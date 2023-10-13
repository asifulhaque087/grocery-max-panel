'use client';

import { useState, useEffect } from 'react';
import { FilesField, LabelInput, SelectField } from '@src/components/roots';

import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { ICategoryAddForm } from '@src/types/compounds';
import { useMutation } from '@apollo/client';
import {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
} from '@src/graphql/mutations/categoryMutation';
import toast from 'react-hot-toast';

export const CategoryAddForm = ({
  cats,
  fetchAgain,
  category,
}: ICategoryAddForm) => {
  // local states
  const [isLoading, setIsLoading] = useState(false);
  // const [categories, setCategories] = useState<ICategory[]>([]);
  // const [categories, setCategories] = useState<any>([]);
  const [createCategory] = useMutation(CREATE_CATEGORY);
  const [updateCategory] = useMutation(UPDATE_CATEGORY);

  const isEdit = category ? true : false;

  const {
    register,
    control,
    handleSubmit,
    // setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      // name: '',
      // cover_image: '',
      // icon_image: '',
      // parent_id: null,

      name: category?.name ? category.name : '',
      cover_image: category?.coverImage ? [category.coverImage] : [],
      icon_image: category?.icon ? [category.icon] : [],
      parent_id: category?.parentId ? category.parentId : null,
      // parent_id: [3, 4],
      // parent_id: category?.parentId? category.parentId : null,
    },
  });

  const onFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log('data is ', data);

    if (isEdit) {
      const response = await updateCategory({
        variables: {
          id: category?.id,
          name: data.name,
          icon: data.icon_image[0],
          coverImage: data.cover_image[0],
          parentId: data.parent_id,
        },
        update: (_, { data: { updateCategory: newCategory } }) => {
          if (newCategory?.category) {
            // router.push('/category');
          }
        },
      });

      toast.success('Category updated successfully');
    } else {
      const response = await createCategory({
        variables: {
          name: data.name,
          icon: data.icon_image[0],
          coverImage: data.cover_image[0],
          parentId: data.parent_id,
        },
      });

      reset();
      toast.success('Category added successfully');

      if (fetchAgain) fetchAgain();
    }
  };

  const removeImageFromServer = async () => {
    console.log('image remove from server');
    return true;
  };

  // useEffect(() => {
  //   if (category) {
  //     reset({
  //       name: category.name,
  //       icon_image: category.icon,
  //       cover_image: category.coverImage,
  //     });
  //   }
  // }, [category]);

  // useEffect(() => {
  //   // This code will run when the component mounts
  //   const timer = setTimeout(() => {
  //     // reset({
  //     //   cover_image: [
  //     //     'https://chaldn.com/_mpimage/potato-regular-50-gm-1-kg?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D81244&q=best&v=1&m=400&webp=1',
  //     //   ],
  //     // });
  //     // setMessage('Delayed message after 2 seconds');

  //     setCategories(cats);
  //   }, 2000); // Delay for 2 seconds (2000 milliseconds)

  //   // Cleanup function to clear the timer when the component unmounts or when dependencies change
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []);

  return (
    <div className="bg-white p-[20px]">
      <form
        className="flex flex-col gap-y-[15px]"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        {/* name */}
        <LabelInput
          name="name"
          htmlFor="name"
          label="Category Name"
          required={true}
          disabled={isLoading}
          register={register}
          errors={errors}
        />

        {/* Categories */}
        <div className="flex flex-col">
          <label
            htmlFor="categories"
            className="text-[13px] text-[#292D32] capitalize"
          >
            Parent Category
          </label>
          <SelectField
            // isMulti={true}
            control={control}
            controller={Controller}
            selectLabel="Parent"
            selectName="parent_id"
            selectOptions={cats}
          />
        </div>

        {/* icon image */}
        <FilesField
          removeImageFromServer={removeImageFromServer}
          control={control}
          controller={Controller}
          label="Icon image"
          fieldName="icon_image"
          required={true}
        />

        {/* cover image */}
        <FilesField
          removeImageFromServer={removeImageFromServer}
          control={control}
          controller={Controller}
          label="Cover image"
          fieldName="cover_image"
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
  );
};
