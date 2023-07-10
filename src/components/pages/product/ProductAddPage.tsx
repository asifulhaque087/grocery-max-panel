'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Formik, Form, ErrorMessage, Field } from 'formik';
import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { GET_CATEGORIES_BY_ADMIN } from '@src/graphql/queries/categoryQuery';
import { CREATE_PRODUCT } from '@src/graphql/mutations/productMutation';
import { FullPageLoading, TextField } from '@src/components/roots';
import { GET_PRODUCTS_BY_ADMIN } from '@src/graphql/queries/productQuery';
import { toErrorMap } from '@src/utils/toErrorMap';
import { convertToBase64 } from '@src/utils/convertToBase64';
import { ICategory } from '@src/types/roots';
import { RecursiveSidebar } from '@src/components/compounds';

export interface Iparent {
  name: string;
  id: string;
}

export const ProductAddPage = () => {
  const router = useRouter();
  const [state, setState] = useState({
    serverMessage: '',
    error: '',
  });

  const [parentCat, setParentCat] = useState<Iparent>({
    name: 'select category',
    id: '',
  });

  // fetching subcategories
  const {
    loading: queryLoading,
    data: { getCategoriesByAdmin: categories } = {},
  } = useQuery(GET_CATEGORIES_BY_ADMIN);
  // create product
  const [createProduct] = useMutation(CREATE_PRODUCT);

  const selectParentCategory = (category: ICategory) => {
    // console.log('parent is ', parentId);
    setParentCat(category);
  };

  if (queryLoading) {
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
                <li className="px-2 capitalize font-medium">add product</li>
              </ol>
            </nav>
          </div>
        </div>
        <h1 className="text-center capitalize my-4 text-xl font-medium">
          add product
        </h1>
        <Formik
          initialValues={{
            name: '',
            photos: [],
            description: '',
            price: '',
            discountPrice: '',
            qty: '',
            unit: '',
            stock: '',
          }}
          onSubmit={async (values, actions) => {
            const response = await createProduct({
              variables: {
                ...values,
                photo: values.photos[0] || '',
                category: parentCat.id,
              },
              update: (proxy, { data: { createProduct: newData } }) => {
                const data: any = proxy.readQuery({
                  query: GET_PRODUCTS_BY_ADMIN,
                });
                if (newData.product) {
                  if (data) {
                    proxy.writeQuery({
                      query: GET_PRODUCTS_BY_ADMIN,
                      data: {
                        getProductsByAdmin: [
                          newData,
                          ...data.getProductsByAdmin,
                        ],
                      },
                    });
                  }
                  setState({
                    ...state,
                    serverMessage: 'Product added successfully',
                  });
                  router.push('/product');
                }
              },
            });
            if (response.data?.createProduct.errors) {
              let errorsMap: any = toErrorMap(
                response.data?.createProduct.errors
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
                  <div
                    className="rounded   px-5 py-5 bg-white"
                    style={{
                      boxShadow: `0 4px 18px rgba(47, 43, 61, .1),0 0 transparent,0 0 transparent`,
                    }}
                  >
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

                  <div
                    className="rounded  px-5 py-5 bg-white"
                    style={{
                      boxShadow: `0 4px 18px rgba(47, 43, 61, .1),0 0 transparent,0 0 transparent`,
                    }}
                  >
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
                        currentParam={''}
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
                          <img src={photo} />
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
                        <p>Submit</p>
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
