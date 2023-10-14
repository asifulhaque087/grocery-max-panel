'use client';

import React, { useMemo, useState } from 'react';
import { INormalTable } from '@src/types/roots';
import { Pagination } from '../Pagination';
import { useIsBrowser } from '@src/hooks';

export const NormalTable = ({
  columns,
  tableData,
  TableHeader,
}: INormalTable) => {
  const isBroswer = useIsBrowser();

  const [currentPage, setCurrentPage] = useState(1);

  let PageSize = 2;
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return tableData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  if (!isBroswer) return null;

  return (
    <div className="shadow-custom py-[30px] border rounded-[6px]">
      {/* header */}
      {TableHeader && <TableHeader />}

      {/* table */}
      <div className="overflow-x-auto py-[10px]">
        <div className="table w-full border-collapse">
          {/* table header */}
          <div className="table-header-group text-[#24334A] text-[16px] font-[600]">
            <div className="table-row border-b">
              {columns.map((column) => (
                <div
                  className="table-cell align-middle  py-[30px] px-[15px]"
                  key={column.name}
                >
                  {column.name}
                </div>
              ))}
            </div>
          </div>

          {/* rows */}
          <div className="table-row-group">
            {currentTableData.map((row: any, i: number) => (
              <React.Fragment key={i}>
                <div className="table-row text-[13px] border-t border-b  text-[#292D32]">
                  {columns.map((column, columnIndex) => (
                    <div
                      className="table-cell align-middle py-[12px] px-[15px]"
                      key={columnIndex}
                      data-label={column.name}
                    >
                      {column.selector(row)}
                    </div>
                  ))}
                </div>
                {/* <div> this is the details page</div> */}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      {/* footer */}
      {/* <TableFooter tableData /> */}

      <div className="flex items-start px-[30px] mt-[30px]">
        <Pagination
          currentPage={currentPage}
          totalCount={tableData.length}
          pageSize={PageSize}
          onPageChange={(page: any) => setCurrentPage(page)}
        />
      </div>

      {/* <table className="border-collapse text-[14px] rounded-t-[5px] overflow-hidden w-full block px-[20px] sm:table sm:px-0 bg-white">
        <thead className="hidden sm:table-header-group">
          <tr className="text-left  bg-indigo-500 text-white font-[700]">
            {columns.map((column) => (
              <th className="py-[12px] px-[15px]" key={column.name}>
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block sm:table-row-group">
          {tableData.map((row: any, i: number) => (
            <tr
              key={i}
              className="my-[30px]  block sm:table-row text-right sm:text-left  shadow-custom sm:shadow-none rounded sm:rounded-none  border-t-2 border-indigo-600 sm:border-t-0 sm:border-b sm:border-b-slate-200 sm:last:border-0"
            >
              {columns.map((column, columnIndex) => (
                <td
                  className="py-[12px] px-[15px] block sm:table-cell relative bg-green-5000 border-b last:border-0 sm:border-0"
                  key={columnIndex}
                  data-label={column.name}
                >
                  {column.selector(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};
