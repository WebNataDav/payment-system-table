import { useState, useMemo } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { FinancialData } from "@/types";
import { getDisplayMonths } from '@/helpers';
import { generateTableData, generateColumns } from './helpers';
import { TableControls } from './TableControls';

export function Table({ data }: { data: FinancialData }) {
  const [currentStartMonth, setCurrentStartMonth] = useState(new Date().getMonth());
  const displayMonths = useMemo(() => getDisplayMonths(currentStartMonth), [currentStartMonth]);
  
  const columns = useMemo(() => generateColumns(displayMonths), [displayMonths]);
  const tableData = useMemo(() => generateTableData(data, displayMonths), [displayMonths, data]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#D6E3EC] overflow-hidden">
      <TableControls 
        currentStartMonth={currentStartMonth}
        setCurrentStartMonth={setCurrentStartMonth}
      />

      <div className="overflow-x-auto">
        <table className="w-full bg-white">
          <thead className="bg-[#F0F7FF]">
            <tr className="border-t border-[#D6E3EC]">
              {table.getHeaderGroups()[0].headers.map(header => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left"
                  style={{ width: header.getSize() }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr 
                key={row.id} 
                className={index % 2 === 0 ? 'border-t border-[#D6E3EC]' : ''}
              >
                {row.getVisibleCells().map(cell => (
                  <td 
                    key={cell.id} 
                    className="px-4 py-3 h-12"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
