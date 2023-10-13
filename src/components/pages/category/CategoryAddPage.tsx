'use client';

import { useQuery } from '@apollo/client';
import { CategoryAddForm, TableLoading } from '@src/components/compounds';
import { GET_CATEGORIES } from '@src/graphql/queries/categoryQuery';
// import { categories } from '@src/stories/roots/form/SelectField.stories';
import { formatItemsForReactSelect, organizeRecursiveItems } from '@src/utils';
import Link from 'next/link';
import { BiListUl } from 'react-icons/bi';

export const CategoryAddPage = () => {
  const {
    loading: queryLoading,
    data: { categories: categories } = {},
    fetchMore,
    // data,
  } = useQuery(GET_CATEGORIES);

  if (queryLoading) return <TableLoading />;

  console.log('categoreis are ', categories);

  const cats = formatItemsForReactSelect(
    organizeRecursiveItems(categories, 'parentId', null),
    'id',
    'name'
  );

  console.log('the cats are ', cats);

  const fetchCategories = () => {
    fetchMore({});
  };

  return (
    <div className="flex flex-col sm:flex-row items-start gap-[20px] p-[20px]  bg-[rgb(248,247,250)]">
      {/* top */}
      <div className="w-[60%]  rounded-[10px] bg-white shadow-custom">
        {/* header */}
        <div className="flex items-center  rounded-[5px] px-[20px] py-[20px] bg-white">
          {/* create button */}
          <div className="">
            <Link href="/category/">
              <button className="outline-none border-0 px-[16px] py-[8px] rounded-[6px] bg-[#7367f0] flex items-center gap-[8px] shadow-[0_2px_6px_rgba(47,43,61,.14),0_0_transparent,0_0_transparent]">
                <span className="text-white capitalize">
                  <BiListUl size={18} />
                </span>
                <span className="text-[15px] font-[500] text-white capitalize">
                  list category
                </span>
              </button>
            </Link>
          </div>
        </div>

        <hr className="border-t" />
        <CategoryAddForm cats={cats} fetchAgain={fetchCategories} />
      </div>

      {/* bottom */}

      <div className="w-[40%]  rounded-[10px] bg-white shadow-custom">
        <h4 className="text-[16px] font-[500] text-[#24334A] capitalize py-[12px] px-[25px] border-b">
          Category overview
        </h4>

        <div className="p-[24px]">
          {cats.map((cat) => (
            <p key={cat.label}>{cat.label}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
