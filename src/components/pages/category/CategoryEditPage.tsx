'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Formik, Form } from 'formik';
import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import {
  GET_CATEGORIES_BY_ADMIN,
  GET_CATEGORY,
} from '@src/graphql/queries/categoryQuery';
import { UPDATE_CATEGORY } from '@src/graphql/mutations/categoryMutation';
import { FullPageLoading, TextField } from '@src/components/roots';
import { toErrorMap } from '@src/utils/toErrorMap';
import { convertToBase64 } from '@src/utils/convertToBase64';
import { Iparent } from './CategoryAddPage';
import { ICategory } from '@src/types/roots';
import { RecursiveSidebar } from '@src/components/compounds';

export const CategoryEditPage = ({ categoryId }) => {
  const [state, setState] = useState({
    serverMessage: '',
    error: '',
  });

  const [parentCat, setParentCat] = useState<Iparent>({
    name: 'select parent',
    id: '',
  });

  const router = useRouter();
  const { loading, data: { getCategory } = {} } = useQuery(GET_CATEGORY, {
    variables: {
      id: categoryId,
    },
  });

  const {
    loading: queryLoading,
    data: { getCategoriesByAdmin: categories } = {},
  } = useQuery(GET_CATEGORIES_BY_ADMIN);

  const [updateCategory] = useMutation(UPDATE_CATEGORY);

  useEffect(() => {
    if (categories && getCategory) {
      const goal = categories.find(
        (box: any) => box.category.id == getCategory.parentId
      );
      if (goal) selectParentCategory(goal.category);
    }
  }, [categories, getCategory]);

  const selectParentCategory = (category: ICategory) => {
    setParentCat(category);
  };

  if (loading || queryLoading) {
    return <FullPageLoading />;
  }

  // console.log('category by id is ', getCategory.parentId);

  if (!getCategory) {
    return (
      <div>
        <div>could not find category</div>
      </div>
    );
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
                <li className="px-2 capitalize font-medium">edit category</li>
              </ol>
            </nav>
          </div>
        </div>
        <h1 className="text-center capitalize my-4 text-xl font-medium">
          edit category
        </h1>
        <Formik
          initialValues={{
            name: getCategory.name,
            photos: [getCategory.photo],
          }}
          onSubmit={async (values, actions) => {
            const response = await updateCategory({
              variables: {
                ...values,
                id: categoryId,
                photo: values.photos[0] || '',
              },
              update: (_, { data: { updateCategory: newCategory } }) => {
                if (newCategory?.category) {
                  setState({
                    ...state,
                    serverMessage: 'Category Edited Successfully',
                  });
                  router.push('/category');
                }
              },
            });
            if (response.data?.updateCategory.errors) {
              let errorsMap: any = toErrorMap(
                response.data?.updateCategory.errors
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
                        currentParam={getCategory.parentId}
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
                      value=""
                    />
                    {values.photos &&
                      values.photos.map((photo, i) => (
                        <div key={i}>
                          <img
                            // src={photo.length > 20 ? photo : `/images/${photo}`}
                            src={`${photo}`}
                          />
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
                        <p>Update</p>
                      </div>
                    </button>
                  </div>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </>
  );
};
