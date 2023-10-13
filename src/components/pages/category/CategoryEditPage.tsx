'use client';

import Link from 'next/link';

import { useMutation, useQuery } from '@apollo/client';
import {
  GET_CATEGORIES,
  GET_CATEGORY,
} from '@src/graphql/queries/categoryQuery';
import { UPDATE_CATEGORY } from '@src/graphql/mutations/categoryMutation';
import { FullPageLoading } from '@src/components/roots';
import { CategoryAddForm } from '@src/components/compounds';
import { formatItemsForReactSelect, organizeRecursiveItems } from '@src/utils';

export const CategoryEditPage = ({ categoryId }: { categoryId: string }) => {
  const { loading, data: { category } = {} } = useQuery(GET_CATEGORY, {
    variables: {
      id: Number(categoryId),
    },
  });

  const {
    loading: queryLoading,
    data: { categories: categories } = {},
    fetchMore,
    // data,
  } = useQuery(GET_CATEGORIES);



  if (loading || queryLoading) {
    return <FullPageLoading />;
  }

  const cats = formatItemsForReactSelect(
    organizeRecursiveItems(categories, 'parentId', null),
    'id',
    'name'
  );

  console.log('cate are ', cats);

  if (!category) {
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

        <CategoryAddForm
          cats={cats}
          category={category}
        />
      </div>
    </>
  );
};
