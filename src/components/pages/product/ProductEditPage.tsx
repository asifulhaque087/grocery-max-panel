'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Formik, Form, ErrorMessage, Field } from 'formik';
import { useMutation, useQuery } from '@apollo/client';
// import { withApollo } from "../../../../graphql/client";
import React, { useEffect, useState } from 'react';
import { GET_PRODUCT_BY_ADMIN } from '@src/graphql/queries/productQuery';
import { UPDATE_PRODUCT } from '@src/graphql/mutations/productMutation';
import { FullPageLoading, TextField } from '@src/components/roots';
import { toErrorMap } from '@src/utils/toErrorMap';
import { convertToBase64 } from '@src/utils/convertToBase64';
import { RecursiveSidebar } from '@src/components/compounds';
import { GET_CATEGORIES_BY_ADMIN } from '@src/graphql/queries/categoryQuery';
import { ICategory } from '@src/types/roots';
import { Iparent } from './ProductAddPage';

export const ProductEditPage = ({ productId }) => {
  const router = useRouter();
  const [state, setState] = useState({
    serverMessage: '',
    error: '',
  });

  const [parentCat, setParentCat] = useState<Iparent>({
    name: 'select category',
    id: '',
  });

  // fetching product by id
  const { loading, data: { getProductByAdmin: product } = {} } = useQuery(
    GET_PRODUCT_BY_ADMIN,
    {
      variables: {
        id: productId,
      },
    }
  );
  // fetching categories

  const {
    loading: queryLoading,
    data: { getCategoriesByAdmin: categories } = {},
  } = useQuery(GET_CATEGORIES_BY_ADMIN);

  // create product
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  useEffect(() => {
    if (categories && product) {
      const goal = categories.find(
        (box: any) => box.category.id == product?.category?.id
      );
      if (goal) selectParentCategory(goal.category);
    }
  }, [categories, product]);

  const selectParentCategory = (category: ICategory) => {
    setParentCat(category);
  };

  if (queryLoading || loading) {
    return <FullPageLoading />;
  }

  return (
    <>
      <div>
        {/* breadcum */}
        <div className="block md:flex items-center justify-between px-5 bg-gray-50 shadow">
          <div>
            <h1 className="capitalize text-3xl font-medium text-center">
              product
            </h1>
          </div>
          <div className="">
            <nav className="container text-regular text-xs lg:text-base">
              <ol className="list-reset py-4 pl-4 rounded flex bg-grey-light text-grey">
                <li className="px-2">
                  <div className="no-underline text-indigo capitalize">
                    <Link href="#">home</Link>
                  </div>
                </li>
                <li>/</li>
                <li className="px-2">
                  <div className="no-underline text-indigo capitalize">
                    <Link href="#">product</Link>
                  </div>
                </li>
                <li>/</li>
                <li className="px-2 capitalize font-medium">edit product</li>
              </ol>
            </nav>
          </div>
        </div>
        <h1 className="text-center capitalize my-4 text-xl font-medium">
          edit product
        </h1>
        <Formik
          initialValues={{
            id: productId,
            name: product.name,
            photos: [product.photo],
            description: product.description,
            price: product.price,
            discountPrice: product.discountPrice,
            qty: product.qty,
            unit: product.unit,
            stock: product.stock,
            // subcategory: product.subcategory.id,
          }}
          onSubmit={async (values, actions) => {
            const response = await updateProduct({
              variables: {
                ...values,
                photo: values.photos[0] || '',
                category: parentCat.id,
              },
              update: (_, { data: { updateProduct: newData } }) => {
                if (newData?.product) {
                  setState({
                    ...state,
                    serverMessage: 'Proudct Edited Successfully',
                  });
                  router.push('/product');
                }
              },
            });
            if (response.data?.updateProduct.errors) {
              let errorsMap: any = toErrorMap(
                response.data?.updateProduct.errors
              );
              if (errorsMap.hasOwnProperty('error')) {
                setState({
                  ...state,
                  error: errorsMap.error,
                });
              }
              actions.setErrors(errorsMap);
            }
          }}
        >
          {({ values, isSubmitting, errors, setFieldValue }) => (
            <>
              <div className="px-5">
                {state.serverMessage && (
                  <div className="bg-green-500 p-2 text-white font-semibold my-3 rounded">
                    {state.serverMessage}
                  </div>
                )}
                {state.error && (
                  <div className="bg-red-500 p-2 text-white font-semibold my-3 rounded">
                    {state.error}
                  </div>
                )}
              </div>
              <Form
                onClick={() => {
                  setState({ ...state, serverMessage: '', error: '' });
                }}
              >
                <div className="grid grid-cols-1 mx-5 gap-4 lg:grid-cols-2  lg:gap-8">
                  <div className="rounded bg-gray-50 shadow px-5 py-5">
                    {/* name */}
                    <TextField
                      name="name"
                      type="text"
                      placeholder="Name"
                      label="Name"
                    />
                    {/* description */}
                    <TextField
                      name="description"
                      type="text"
                      placeholder="Description"
                      label="Description"
                    />
                    {/* price */}
                    <TextField
                      name="price"
                      type="text"
                      placeholder="Price"
                      label="Price"
                    />
                    {/* discountPrice */}
                    <TextField
                      name="discountPrice"
                      type="text"
                      placeholder="Discount Price"
                      label="Discount Price"
                    />
                    {/* qty */}
                    <TextField
                      name="qty"
                      type="text"
                      placeholder="Quantity"
                      label="Quantity"
                    />
                    {/* unit */}
                    <TextField
                      name="unit"
                      type="text"
                      placeholder="Unit"
                      label="Unit"
                    />
                    {/* stock */}
                    <TextField
                      name="stock"
                      type="text"
                      placeholder="Stock"
                      label="Stock"
                    />
                  </div>

                  <div className="rounded bg-gray-50 shadow px-5 py-5">
                    {/* parent*/}
                    <div className="block">
                      <div className="my-3">
                        <span className="py-2 block capitalize">parent</span>
                        <div className="mb-3s pt-0">
                          <div
                            className={`px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white  rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full border `}
                          >
                            {parentCat.name}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <RecursiveSidebar
                        currentParam={product?.category?.id}
                        selectParentCategory={selectParentCategory}
                        // outerParent={outerParent}
                        categories={categories.map(({ category }) => category)}
                      />
                    </div>

                    {/* photo */}
                    <TextField
                      onChange={async (
                        e: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        let files = await convertToBase64(e.target.files);
                        setFieldValue('photos', files);
                      }}
                      name="photos"
                      multiple
                      type="file"
                      placeholder="Photo"
                      label="Photo"
                      // value={undefined}
                      value=""
                    />
                    {values.photos &&
                      values.photos.map((photo, i) => (
                        <div key={i}>
                          <img
                            src={photo.length > 20 ? photo : `/images/${photo}`}
                          />
                        </div>
                      ))}
                    <button
                      disabled={isSubmitting}
                      className="bg-green-500 text-white active:bg-teal-600 font-bold
                       uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg
                        outline-none focus:outline-none mr-1 mb-1 my-3"
                      type="submit"
                      style={{ transition: 'all .15s ease' }}
                    >
                      <div className="flex">
                        {isSubmitting && (
                          <div className="h-5 w-5 rounded-full border-dotted border-2  border-white animate-spin ease-linear mr-3"></div>
                        )}
                        <p>Update</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* <pre>{JSON.stringify(values, null, 2)}</pre>
                <pre>{JSON.stringify(errors, null, 2)}</pre> */}
              </Form>
            </>
          )}
        </Formik>
      </div>
    </>
  );
};
