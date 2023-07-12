'use client';

import Link from 'next/link';
import moment from 'moment';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
// import { withApollo } from "../../../graphql/client";
import { TableLoading } from '@src/components/compounds';
import { NormalTable } from '@src/components/roots';
import { storeIdVar } from '@src/graphql/reactivities/storeIdVariable';
import { GET_CATEGORIES_BY_ADMIN } from '@src/graphql/queries/categoryQuery';
import { DELETE_CATEGORY } from '@src/graphql/mutations/categoryMutation';

export const CategoryListPage = () => {
  const storeId = useReactiveVar(storeIdVar);

  const {
    loading: queryLoading,
    data: { getCategoriesByAdmin: categories } = {},
  } = useQuery(GET_CATEGORIES_BY_ADMIN);

  const [deleteCategory, { loading: mutationLoading }] =
    useMutation(DELETE_CATEGORY);

  const columns = [
    {
      name: 'Name',
      selector: (row: any) => row.name,
    },
    {
      name: 'Photo',
      selector: (row: any) => (
        <img
          alt="product"
          src={row.photo}
          className="w-[30px] ml-auto md:ml-0"
        />
      ),
    },

    {
      name: 'Date',
      selector: (row: any) =>
        moment.unix(row.createdAt).subtract(10, 'days').calendar(),
    },

    {
      name: 'Action',
      selector: (row: any) => (
        <div>
          <button
            className="mr-2"
            onClick={async () => {
              if (window.confirm('Are you sure ?') == true) {
                storeIdVar(row.id);
                await deleteCategory({
                  variables: { id: row.id },
                  update: (proxy) => {
                    proxy.evict({
                      id: `Category:${row.id}`,
                    });
                  },
                });
              }
            }}
          >
            <TrashIcon
              className={`h-5 text-red-500 ${
                mutationLoading && row.id == storeId && 'animate-spin'
              }`}
            />
          </button>
          <Link href={`/category/edit/${row.id}`}>
            <button className="ml-2">
              <PencilIcon className="h-5 text-yellow-500" />
            </button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* breadcum */}
      <div className="block sm:flex items-center justify-between px-5 bg-gray-50">
        <div>
          <h1 className="capitalize text-3xl font-medium text-center">
            category
          </h1>
        </div>
        <div className="">
          <nav className="container text-regular text-xs lg:text-base">
            <ol className="list-reset py-4  rounded flex items-center justify-center sm:justify-start bg-grey-light text-grey">
              <li className="px-2">
                <div className="no-underline text-indigo capitalize">
                  <Link href="/admin">home</Link>
                </div>
              </li>
              <li>/</li>
              <li className="px-2">
                <div className="no-underline text-indigo capitalize ">
                  <Link href="/admin">category</Link>
                </div>
              </li>
              <li>/</li>
              <li className="px-2 capitalize font-medium">list category</li>
            </ol>
          </nav>
        </div>
      </div>
      <h1 className="text-center text-gray-500 capitalize my-4 text-xl font-medium">
        list category
      </h1>

      {/* card */}
      <div className="p-5">
        {queryLoading ? (
          <div>
            <TableLoading />
          </div>
        ) : (
          <NormalTable
            columns={columns}
            tableData={categories.map((item: any) => item.category)}
          />
        )}
      </div>
    </>
  );
};
