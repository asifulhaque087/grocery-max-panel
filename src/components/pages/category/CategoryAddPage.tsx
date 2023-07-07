'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Formik, Form, Field } from 'formik';
import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_CATEGORIES_BY_ADMIN } from '@src/graphql/queries/categoryQuery';
import { CREATE_CATEGORY } from '@src/graphql/mutations/categoryMutation';
import { FullPageLoading, TextField } from '@src/components/roots';
import { toErrorMap } from '@src/utils/toErrorMap';
import { convertToBase64 } from '@src/utils/convertToBase64';
import { RecursiveSidebar } from '@src/components/compounds';
import { ICategory } from '@src/types/roots';
import { useReactiveVar } from '@apollo/client';
import { currentParamVarible } from '@src/graphql/reactivities/paramsVariable';

export interface Iparent {
  name: string;
  id: string;
}

export const CategoryAddPage = () => {
  const currentParam = useReactiveVar(currentParamVarible);

  const [state, setState] = useState({
    serverMessage: '',
    error: '',
  });

  const [parentCat, setParentCat] = useState<Iparent>({
    name: 'select parent',
    id: '',
  });

  const router = useRouter();

  const {
    loading: queryLoading,
    data: { getCategoriesByAdmin: categories } = {},
  } = useQuery(GET_CATEGORIES_BY_ADMIN);

  const [createCategory] = useMutation(CREATE_CATEGORY);

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
              category
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
                    <Link href="#">category</Link>
                  </div>
                </li>
                <li>/</li>
                <li className="px-2 capitalize font-medium">add category</li>
              </ol>
            </nav>
          </div>
        </div>
        <h1 className="text-center capitalize my-4 text-xl font-medium">
          add category
        </h1>
        <Formik
          initialValues={{
            name: '',
            photos: [],
            // parent: initialName,
          }}
          onSubmit={async (values, actions) => {
            // console.log("the value is ", {
            //   ...values,
            //   parent: parentCat.id,
            // });
            // return;
            const response = await createCategory({
              variables: {
                ...values,
                photo: values.photos[0] || '',
                parentId: parentCat.id,
              },
              update: (proxy, { data: { createCategory: newCategory } }) => {
                const data: any = proxy.readQuery({
                  query: GET_CATEGORIES_BY_ADMIN,
                });
                if (newCategory.category) {
                  if (data) {
                    proxy.writeQuery({
                      query: GET_CATEGORIES_BY_ADMIN,
                      data: {
                        getCategoriesByAdmin: [
                          newCategory,
                          ...data.getCategoriesByAdmin,
                        ],
                      },
                    });
                  }
                  setState({
                    ...state,
                    serverMessage: 'Cateogry added successfully',
                  });
                  router.push('/category');
                }
                // if (data) {
                //   proxy.writeQuery({
                //     query: GET_CATEGORIES,
                //     data: {
                //       getCategories: [newCategory, ...data.getCategories],
                //     },
                //   });
                // }

                // setState({
                //   ...state,
                //   serverMessage: "Category Added Successfully",
                // });
              },
            });
            if (response.data?.createCategory.errors) {
              let errorsMap: any = toErrorMap(
                response.data?.createCategory.errors
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
                        currentParam={currentParam}
                        selectParentCategory={selectParentCategory}
                        // outerParent={outerParent}
                        categories={categories.map(({ category }) => category)}
                      />
                    </div>
                  </div>
                  <div className="rounded bg-gray-50 shadow px-5 py-5">
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
                      className="bg-green-500 text-white active:bg-teal-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 my-3"
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
