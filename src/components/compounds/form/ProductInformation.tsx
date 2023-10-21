'use client';
import { useState, useEffect } from 'react';

import { Editor, FullPageLoading, SelectField } from '@src/components/roots';
import { IProductInformation } from '@src/types/compounds';
import { LabelInput } from '@src/components/roots';

import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import {
  singleProductVar,
  storeSingleProduct,
} from '@src/graphql/reactivities/productVariable';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import {
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from '@src/graphql/mutations/productMutation';
import { useRouter } from 'next/navigation';
import { formatItemsForReactSelect, organizeRecursiveItems } from '@src/utils';
import { ICategory } from '@src/types/models';
import { GET_CATEGORIES } from '@src/graphql/queries/categoryQuery';
import toast from 'react-hot-toast';

export const ProductInformation = ({
  setActiveIndex,
  product,
}: IProductInformation) => {
  // local states
  const [isLoading, setIsLoading] = useState(false);
  // const [categories, setCategories] = useState<ICategory[]>([]);
  // const [brands, setBrands] = useState<IBrand[]>([]);

  const isEdit = product ? true : false;

  const {
    loading: queryLoading,
    data: { categories: categories } = {},
    fetchMore,
    // data,
  } = useQuery(GET_CATEGORIES);

  const router = useRouter();

  // reactive variable
  // const product = useReactiveVar(singleProductVar);

  // create product
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const {
    register,
    control,
    handleSubmit,
    // setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      // name: product?.name ? product.name : '',
      name: '',
      // name: product?.name,
      // name: "hello ",
      // slug: product?.slug ? product.slug : '',
      // description: product?.description ? product.description : '',
      // category_id: [6, 8],
      category_id: null,
      description: '',
      slug: 'demo-slug-link',
    },
  });

  if (queryLoading) return <FullPageLoading />;

  console.log('the cats is ', categories);

  const cats = formatItemsForReactSelect(
    organizeRecursiveItems(categories, 'parentId', null),
    'id',
    'name'
  );

  console.log('the cats are ', cats);

  const onFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log('data is ', data);

    if (isEdit) {
      const response = await updateProduct({
        variables: {
          id: product?.id,
          name: data.name,
          slug: data.slug,
          description: data.description,
          category: data.category_id,
        },
        update: (_, { data: { updateCategory: newCategory } }) => {
          if (newCategory?.category) {
            // router.push('/category');
          }
        },
      });

      toast.success('Product updated successfully');
    } else {
      const response = await createProduct({
        variables: {
          name: data.name,
          slug: data.slug,
          description: data.description,
          category: data.category_id,
        },
      });

      reset();
      toast.success('Product added successfully');

      router.push(`/product/edit/${2}?tab=1`);

      // if (fetchAgain) fetchAgain();
    }
  };

  // useEffect(() => {
  //   if (product && fromEdit) {
  //     reset({
  //       name: product.name,
  //       slug: product.slug,
  //       description: product.description,
  //     });
  //   }
  // }, [product]);

  return (
    <div className="flex flex-col sm:flex-row items-start justify-center gap-[20px] my-[20px]  bg-[rgb(248,247,250)]">
      {/* top */}
      <div className="w-full rounded-[10px] bg-white shadow-custom border">
        <h4 className="text-[16px] font-[500] text-[#24334A] capitalize py-[12px] px-[25px] border-b">
          product informations
        </h4>

        <form
          className="p-[24px] flex flex-col gap-y-[15px]"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          {/* name */}
          <LabelInput
            name="name"
            htmlFor="name"
            label="Product Name"
            required={true}
            disabled={isLoading}
            register={register}
            errors={errors}
          />

          {/* description */}
          <div className="flex flex-col gap-y-[5px]">
            <label
              htmlFor="description"
              className="text-[13px] text-[#292D32] capitalize"
            >
              product Description
            </label>
            <div>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => <Editor field={field} />}
              />
            </div>
          </div>

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
              selectLabel="Category"
              selectName="category_id"
              selectOptions={cats}
            />
          </div>

          <button
            type="submit"
            className="outline-none border-0 px-[16px] py-[8px] rounded-[6px] bg-[#7367f0]  shadow-[0_2px_6px_rgba(47,43,61,.14),0_0_transparent,0_0_transparent] mt-[15px]"
            // onClick={() => setActiveIndex(1)}
          >
            <span className="text-[15px] font-[500] text-white capitalize">
              {isEdit ? 'update' : 'next'}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};
