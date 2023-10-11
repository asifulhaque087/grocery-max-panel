'use client';
import { useState, useEffect } from 'react';

import { Editor, SelectField } from '@src/components/roots';
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
import { useMutation, useReactiveVar } from '@apollo/client';
import { CREATE_PRODUCT } from '@src/graphql/mutations/productMutation';
import { useRouter } from 'next/navigation';
import { formatItemsForReactSelect, organizeRecursiveItems } from '@src/utils';
import { ICategory } from '@src/types/models';

export const ProductInformation = ({
  setActiveIndex,
  fromEdit,
}: IProductInformation) => {
  // local states
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  // const [brands, setBrands] = useState<IBrand[]>([]);

  const router = useRouter();

  // reactive variable
  const product = useReactiveVar(singleProductVar);

  // create product
  const [createProduct] = useMutation(CREATE_PRODUCT);

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
      slug: '',
      // description: product?.description ? product.description : '',
      category_id: [],
      description: '',
    },
  });

  const onFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('data is ', data);
    // storeSingleProduct(data);

    const response = await createProduct({
      variables: {
        ...data,
        // category: parentCat.id ? parentCat.id : null,
      },
      update: (proxy, { data: { createProduct: newData } }) => {
        // const data: any = proxy.readQuery({
        //   query: GET_PRODUCTS_BY_ADMIN,
        // });

        console.log('newData is ', newData);

        if (newData) {
          storeSingleProduct(newData);

          if (fromEdit) setActiveIndex(1);

          if (!fromEdit) router.push(`/product/edit/${newData.id}`);

          // if (data) {
          //   proxy.writeQuery({
          //     query: GET_PRODUCTS_BY_ADMIN,
          //     data: {
          //       getProductsByAdmin: [newData, ...data.getProductsByAdmin],
          //     },
          //   });
          // }
          // setState({
          //   ...state,
          //   serverMessage: 'Product added successfully',
          // });
          // router.push('/product');
        }
      },
    });

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

  useEffect(() => {
    if (product && fromEdit) {
      reset({
        name: product.name,
        slug: product.slug,
        description: product.description,
      });
    }
  }, [product]);

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

          {/* slug */}
          <LabelInput
            name="slug"
            htmlFor="slug"
            label="Product Slug"
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
              product categories
            </label>

            <SelectField
              isMulti={true}
              control={control}
              controller={Controller}
              selectLabel="Category"
              selectName="category_id"
              // defaultValue={[{ value: 'RED', label: 'Red' }]}
              selectOptions={formatItemsForReactSelect(
                organizeRecursiveItems(categories, 'parent_id'),
                'id',
                'name'
              )}
              required={register('category_id', {
                // required: requiredSelectionMessage,
              })}
              // validationErrorMessage={errors['category_id']?.message}
            />
          </div>

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

          <button
            type="submit"
            className="outline-none border-0 px-[16px] py-[8px] rounded-[6px] bg-[#7367f0]  shadow-[0_2px_6px_rgba(47,43,61,.14),0_0_transparent,0_0_transparent] mt-[15px]"
            // onClick={() => setActiveIndex(1)}
          >
            <span className="text-[15px] font-[500] text-white capitalize">
              {fromEdit ? 'update' : 'next'}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};