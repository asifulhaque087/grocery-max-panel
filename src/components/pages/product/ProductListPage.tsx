'use client';

import Link from 'next/link';
import moment from 'moment';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { storeIdVar } from '../../../graphql/reactivities/storeIdVariable';
import { GET_PRODUCTS_BY_ADMIN } from '../../../graphql/queries/productQuery';
import { DELETE_PRODUCT } from '../../../graphql/mutations/productMutation';
import { TableLoading } from '@src/components/compounds';
import { NormalTable } from '@src/components/roots';

export const ProductListPage = () => {
  const storeId = useReactiveVar(storeIdVar);
  // products fetching
  const { loading: queryLoading, data: { getProductsByAdmin: products } = {} } =
    useQuery(GET_PRODUCTS_BY_ADMIN);

  // product deleting
  const [deleteProduct, { loading: mutationLoading }] =
    useMutation(DELETE_PRODUCT);

  console.log(products);

  const columns = [
    {
      name: 'Name',
      selector: (row: any) => row.name,
    },

    {
      name: 'Category',
      selector: (row: any) => row?.category?.name,
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
                await deleteProduct({
                  variables: { id: row.id },
                  update: (proxy) => {
                    proxy.evict({
                      id: `Product:${row.id}`,
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
          <Link href={`/product/edit/${row.id}`}>
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
            product
          </h1>
        </div>
        <div className="">
          <nav className="container text-regular text-xs lg:text-base">
            <ol className="list-reset py-4  rounded flex items-center justify-center sm:justify-start bg-grey-light text-grey">
              <li className="px-2">
                <div className="no-underline text-indigo capitalize">
                  <Link href="/">home</Link>
                </div>
              </li>
              <li>/</li>
              <li className="px-2">
                <div className="no-underline text-indigo capitalize">
                  <Link href="/product">product</Link>
                </div>
              </li>
              <li>/</li>
              <li className="px-2 capitalize font-medium">product list </li>
            </ol>
          </nav>
        </div>
      </div>
      <h1 className="text-center text-gray-500 capitalize my-4 text-xl font-medium">
        product list
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
            tableData={products.map((item: any) => item.product)}
          />
        )}
      </div>
    </>
  );
};
