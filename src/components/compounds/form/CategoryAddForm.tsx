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
import Link from 'next/link';
import { BiListUl } from 'react-icons/bi';
import { ICategoryAddForm } from '@src/types/compounds';
import { useMutation } from '@apollo/client';
import { CREATE_CATEGORY } from '@src/graphql/mutations/categoryMutation';

// export const cats = [
//   {
//     id: 1,
//     parentId: 0,
//     title: 'Electronics',
//     iconUrl:
//       'https://chaldn.com/_mpimage/personal-care?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D101765&q=low&v=1&m=40&webp=1&alpha=1',
//     photo:
//       'https://chaldn.com/_mpimage/fresh-fruits?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D61651&q=low&v=1&m=400&webp=1',
//   },
//   {
//     id: 2,
//     parentId: 0,
//     title: 'Home & Garden',
//     iconUrl:
//       'https://chaldn.com/_mpimage/health-wellness?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D95788&q=best&v=1&m=40&webp=1&alpha=1',
//     photo:
//       'https://chaldn.com/_mpimage/fresh-vegetables?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D23773&q=low&v=1&m=400&webp=1',
//   },
//   {
//     id: 3,
//     parentId: 1,
//     title: 'Phones & Accessories',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/dates-khejur?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D99117&q=best&v=1&m=400&webp=1',
//   },
//   {
//     id: 4,
//     parentId: 1,
//     title: 'Computers & Tablets',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/pickles?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31519&q=low&v=1&m=400&webp=1',
//   },
//   {
//     id: 5,
//     parentId: 2,
//     title: 'Furniture',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/other-table-sauces?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D116621&q=low&v=1&m=400&webp=1',
//   },
//   {
//     id: 6,
//     parentId: 2,
//     title: 'Kitchen & Dining',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/tomato-sauces?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D116629&q=low&v=1&m=400&webp=1',
//   },
//   {
//     id: 7,
//     parentId: 3,
//     title: 'Smartphones',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/dates-khejur?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D99117&q=best&v=1&m=400&webp=1',
//   },
//   {
//     id: 8,
//     parentId: 3,
//     title: 'Tablet Accessories',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/salt-sugar?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D36624&q=best&v=1&m=400&webp=1',
//   },
//   {
//     id: 9,
//     parentId: 4,
//     title: 'Laptops',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/salt-sugar?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D36624&q=best&v=1&m=400&webp=1',
//   },
//   {
//     id: 10,
//     parentId: 4,
//     title: 'Desktop Computers',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/rice?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D101155&q=best&v=1&m=400&webp=1',
//   },
//   {
//     id: 11,
//     parentId: 5,
//     title: 'Sofas & Couches',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/dal-or-lentil?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D29722&q=low&v=1&m=400&webp=1',
//   },
//   {
//     id: 12,
//     parentId: 5,
//     title: 'Chairs',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/ready-mix?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D101152&q=best&v=1&m=400&webp=1',
//   },
//   {
//     id: 13,
//     parentId: 6,
//     title: 'Cookware',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/oil?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D113032&q=best&v=1&m=400&webp=1',
//   },
//   {
//     id: 14,
//     parentId: 6,
//     title: 'Flatware',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/premium-ingredients?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D28689&q=low&v=1&m=400&webp=1',
//   },
//   {
//     id: 15,
//     parentId: 7,
//     title: 'Apple iPhones',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/shemai-suji?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31299&q=low&v=1&m=400&webp=1https://chaldn.com/_mpimage/shemai-suji?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31299&q=low&v=1&m=400&webp=1',
//   },
//   {
//     id: 16,
//     parentId: 7,
//     title: 'Samsung Galaxy Phones',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/special-ingredients?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D117039&q=low&v=1&m=400&webp=1',
//   },
//   {
//     id: 17,
//     parentId: 9,
//     title: 'Gaming Laptops',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/colors-flavours?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31480&q=best&v=1&m=400&webp=1',
//   },
//   {
//     id: 18,
//     parentId: 9,
//     title: 'Business Laptops',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/colors-flavours?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D31480&q=best&v=1&m=400&webp=1',
//   },
//   {
//     id: 19,
//     parentId: 11,
//     title: 'Sectional Sofas',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/chicken-poultry?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D117422&q=low&v=1&m=400&webp=1',
//   },
//   {
//     id: 20,
//     parentId: 11,
//     title: 'Reclining Sofas',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/premium-perishables?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D132312&q=best&v=1&m=400&webp=1',
//   },
//   {
//     id: 21,
//     parentId: 0,
//     title: 'Clothing',
//     iconUrl:
//       'https://chaldn.com/_mpimage/baby-care?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D95781&q=best&v=1&m=40&webp=1&alpha=1',
//     photo:
//       'https://chaldn.com/_mpimage/special-ingredients?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D117039&q=low&v=1&m=400&webp=1',
//   },
//   {
//     id: 22,
//     parentId: 0,
//     title: 'Sports & Outdoors',
//     iconUrl:
//       'https://chaldn.com/_mpimage/stationery-office?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D95792&q=low&v=1&m=40&webp=1&alpha=1',
//     photo:
//       'https://chaldn.com/_mpimage/other-table-sauces?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D116621&q=low&v=1&m=400&webp=1',
//   },
//   {
//     id: 23,
//     parentId: 21,
//     title: "Women's Clothing",
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/salt-sugar?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D36624&q=best&v=1&m=400&webp=1',
//   },
//   {
//     id: 24,
//     parentId: 21,
//     title: "Men's Clothing",
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/chicken-poultry?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D117422&q=low&v=1&m=400&webp=1',
//   },
//   {
//     id: 25,
//     parentId: 22,
//     title: 'Camping Gear',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/ready-mix?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D101152&q=best&v=1&m=400&webp=1',
//   },
//   {
//     id: 26,
//     parentId: 22,
//     title: 'Exercise & Fitness',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/fresh-fruits?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D61651&q=low&v=1&m=400&webp=1',
//   },
//   {
//     id: 27,
//     parentId: 23,
//     title: 'Dresses',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/ready-mix?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D101152&q=best&v=1&m=400&webp=1',
//   },
//   {
//     id: 28,
//     parentId: 23,
//     title: 'Shoes',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/fresh-fruits?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D61651&q=low&v=1&m=400&webp=1',
//   },
//   {
//     id: 29,
//     parentId: 24,
//     title: 'Shirts',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/fresh-fruits?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D61651&q=low&v=1&m=400&webp=1',
//   },
//   {
//     id: 30,
//     parentId: 24,
//     title: 'Pants',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/fresh-fruits?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D61651&q=low&v=1&m=400&webp=1',
//   },
//   {
//     id: 31,
//     parentId: 25,
//     title: 'Tents',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/fresh-fruits?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D61651&q=low&v=1&m=400&webp=1',
//   },
//   {
//     id: 32,
//     parentId: 25,
//     title: 'Sleeping Bags',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/chicken-poultry?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D117422&q=low&v=1&m=400&webp=1',
//   },
//   {
//     id: 33,
//     parentId: 26,
//     title: 'Cardio Equipment',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/fresh-fruits?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D61651&q=low&v=1&m=400&webp=1',
//   },
//   {
//     id: 34,
//     parentId: 26,
//     title: 'Weights & Resistance Training',
//     iconUrl: null,
//     photo:
//       'https://chaldn.com/_mpimage/chicken-poultry?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D117422&q=low&v=1&m=400&webp=1',
//   },
// ];

export const CategoryAddForm = ({ cats, fetchAgain }: ICategoryAddForm) => {
  // local states
  const [isLoading, setIsLoading] = useState(false);
  // const [categories, setCategories] = useState<ICategory[]>([]);
  // const [categories, setCategories] = useState<any>([]);

  const [createCategory] = useMutation(CREATE_CATEGORY);

  const {
    register,
    control,
    handleSubmit,
    // setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      icon: '',
      cover_image: '',
      icon_image: '',
      parent_id: null,
    },
  });

  const onFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log('data is ', data);

    const response = await createCategory({
      variables: {
        name: data.name,
        icon: data.icon_image[0],
        coverImage: data.cover_image[0],
        parentId: data.parent_id,
      },

      // update: (_, { data: { updateCategory: newCategory } }) => {
      //   if (newCategory?.category) {
      //     setState({
      //       ...state,
      //       serverMessage: 'Category Edited Successfully',
      //     });
      //     router.push('/category');
      //   }
      // },
    });

    console.log(response);

    reset();

    fetchAgain();

    // storeSingleProduct(data);

    // if (response.data?.createProduct.errors) {
    //   let errorsMap: any = toErrorMap(response.data?.createProduct.errors);
    //   if (errorsMap.hasOwnProperty('error')) {
    //     setState({
    //       ...state,
    //       error: errorsMap.error,
    //     });
    //   }
    //   actions.setErrors(errorsMap);
    // }
  };

  const removeImageFromServer = async () => {
    console.log('image remove from server');
    return true;
  };

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
            // defaultValue={[{ value: 'RED', label: 'Red' }]}

            selectOptions={cats}
            // selectOptions={formatItemsForReactSelect(
            //   organizeRecursiveItems(categories, 'parentId', 0),
            //   'id',
            //   'title'
            // )}
            required={register('parent_id', {
              // required: requiredSelectionMessage,
            })}
            // validationErrorMessage={errors['category_id']?.message}
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
            add
          </span>
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};