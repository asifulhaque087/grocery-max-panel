'use client';

import Link from 'next/link';
import moment from 'moment';
import Select, {
  PlaceholderProps,
  StylesConfig,
  components,
} from 'react-select';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
// import { withApollo } from "../../../graphql/client";
import { TableLoading } from '@src/components/compounds';
import { NormalTable } from '@src/components/roots';
import { storeIdVar } from '@src/graphql/reactivities/storeIdVariable';
import { GET_CATEGORIES } from '@src/graphql/queries/categoryQuery';
import { DELETE_CATEGORY } from '@src/graphql/mutations/categoryMutation';
import { BiPlus } from 'react-icons/bi';
import { ICategory } from '@src/types/models';

const colourStyles: StylesConfig = {
  control: (styles, state) => {
    return {
      ...styles,
      backgroundColor: 'white',
      padding: '2px 0px',
      outline: state.isFocused ? '0px' : '',
      boxShadow: state.isFocused ? '0px' : '',

      borderColor: state.isFocused ? '#7367f0' : 'rgba(47,43,61,0.16)',
      ':hover': {
        ...styles[':hover'],
        borderColor: state.isFocused ? '#7367f0' : 'rgba(47,43,61,0.68)',
      },
    };
  },

  placeholder: (styles) => ({
    ...styles,
    color: 'rgba(47,43,61,0.48)',
  }),

  singleValue: (styles) => ({
    ...styles,
    color: 'rgba(47,43,61,0.68)',
  }),
  dropdownIndicator: (styles, state) => ({
    ...styles,
    color: state.isFocused ? 'rgba(47,43,61,0.48)' : 'rgba(47,43,61,0.28)',
  }),

  menu: (styles) => ({
    ...styles,
    boxShadow: `rgba(47, 43, 61, 0.16) 0px 4px 11px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px`,
  }),

  menuList: (styles) => ({
    ...styles,
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px',
  }),

  option: (styles, state) => ({
    ...styles,
    borderRadius: '10px',
    margin: '0 auto',
    backgroundColor: state.isSelected ? 'rgba(115,103,240,1)' : '',
    ':hover': {
      ...styles[':hover'],
      backgroundColor: 'rgba(115,103,240,.1)',
      color: 'rgba(115,103,240,1)',
    },
  }),
};

export const CategoryListPage = () => {
  const storeId = useReactiveVar(storeIdVar);

  const { loading: queryLoading, data: { categories: categories } = {} } =
    useQuery(GET_CATEGORIES);

  const [deleteCategory, { loading: mutationLoading }] =
    useMutation(DELETE_CATEGORY);

  const findPath = (id: number | null) => {
    type RecItem = {
      name: string;
      level: number;
    };

    let res: RecItem[] = [];
    // let counter = 0;

    const rec = (id: number | null, depth: number): void => {
      if (!id) return;

      const category = categories.find((cat: ICategory) => cat.id === id);

      // const newItem = { name: category.name, level: 0 };
      rec(category!.parentId, depth + 1);
      // newItem.level = depth;

      // res.push(newItem);
      res.push({ name: category.name, level: depth });
      // console.log(res[res.length - 1]);
      // res[res.length - 1].level = depth;
    };

    rec(id, 0);

    console.log('the res is ', res);

    return res.reverse();
  };

  const columns = [
    {
      name: 'Name',
      selector: (row: any) => row.name,
    },

    {
      name: 'parent',
      selector: (row: any) => {
        // console.log('the parent is ', findPath(row.parentId));
        const parents = findPath(row.parentId);

        // console.log('the parent is ', parents);

        return parents.length ? (
          <div>
            {parents.map((item, i) => (
              <p key={item.name}> {`${'-'.repeat(item.level)} ${item.name}`}</p>
            ))}
          </div>
        ) : (
          <p>root parent</p>
        );
      },
    },

    {
      name: 'Icon',
      selector: (row: any) => (
        <img
          alt="product"
          src={row.icon}
          className="w-[30px] ml-auto md:ml-0"
        />
      ),
    },

    {
      name: 'Cover Photo',
      selector: (row: any) => (
        <img
          alt="product"
          src={
            row.coverImage ??
            'https://img.freepik.com/premium-vector/red-yellow-free-demo-button-vector_686319-713.jpg?size=626&ext=jpg'
          }
          className="w-[30px] ml-auto md:ml-0"
        />
      ),
    },

    // {
    //   name: 'Date',
    //   selector: (row: any) =>
    //     moment.unix(row.createdAt).subtract(10, 'days').calendar(),
    // },

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

  // if (queryLoading) return <TableLoading />;

  const TableHeader = () => {
    const options = [
      { value: 'chocolate', label: 10 },
      { value: 'strawberry', label: 20 },
      { value: 'vanilla', label: 30 },
    ];

    const handleSelectChange = (selectedOption: any) => {
      console.log(selectedOption.value);
    };
    return (
      <>
        {/* header */}
        <div className="flex items-center  rounded-[5px] px-[30px]">
          {/* input row number */}
          <div className="w-[100px]">
            <Select
              onChange={handleSelectChange}
              options={options}
              defaultValue={options[0]}
              styles={colourStyles}
              components={{
                IndicatorSeparator: () => null,
              }}
            />
          </div>

          {/* create button */}
          <div className="ml-[12px]">
            <Link href={'/category/add'}>
              <button className="outline-none border-0 px-[16px] py-[8px] rounded-[6px] bg-[#7367f0] flex items-center gap-[8px] shadow-[0_2px_6px_rgba(47,43,61,.14),0_0_transparent,0_0_transparent]">
                <span className="text-white capitalize">
                  <BiPlus size={18} />
                </span>
                <span className="text-[15px] font-[500] text-white capitalize">
                  create category
                </span>
              </button>
            </Link>
          </div>

          {/* serach input */}
          <div className="ml-auto  w-[192px]">
            <input
              type="text"
              placeholder="search invoice"
              className="w-full outline-none text-[rgba(47,43,61,0.68)] placeholder:text-[rgba(47,43,61,0.48)] placeholder:capitalize border rounded-[6px] px-[16px] py-[8px] focus:shadow-[0px_2px_4px_rgba(47,43,61,.12)] focus:border-[#7367f0] focus:placeholder:pl-[10px] focus:transition-all focus:placeholder:transition-all placeholder:transition-all transition-all"
            />
          </div>

          {/* select status */}
          {/* <div className="ml-[12px] w-[192px]">
          <Select
            onChange={handleSelectChange}
            placeholder="Select Status"
            options={options}
            styles={colourStyles}
            components={{
              IndicatorSeparator: () => null,
            }}
          />
        </div> */}
        </div>

        <hr className="border-t mt-[30px]" />
      </>
    );
  };

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
            tableData={categories}
            TableHeader={TableHeader}
          />
        )}
      </div>
    </>
  );
};
