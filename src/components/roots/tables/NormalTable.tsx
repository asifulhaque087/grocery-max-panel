import { INormalTable } from '@src/types/roots';

export const NormalTable = ({ columns, tableData }: INormalTable) => {
  return (
    <div>
      <table className="border-collapse text-[14px] rounded-t-[5px] overflow-hidden w-full shadow-none sm:shadow-custom block px-[20px] sm:table sm:px-0">
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
      </table>
    </div>
  );
};
