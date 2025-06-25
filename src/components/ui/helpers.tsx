import { FinancialData } from "@/types";
import { monthNames } from '@/constants';
import { CellContext } from '@tanstack/react-table';

type MonthData = {
  plan: number | null;
  fact: number | null;
};

type MonthCellValue = MonthData | null;

type TableRowData = {
  firstColumn: string;
  secondColumn: string;
} & {
  [key: string]: MonthCellValue | string; 
};

export const generateTableData = (data: FinancialData, displayMonths: string[]): TableRowData[] => {
  const managerRow: TableRowData = {
    firstColumn: 'Manager',
    secondColumn: 'Total amount:',
  };

  const partnersRow: TableRowData = {
    firstColumn: '',
    secondColumn: 'Total active partners:',
  };

  displayMonths.forEach(month => {
    const monthIndex = monthNames.indexOf(month);
    const item = data.total[monthIndex];
    
    managerRow[month] = item ? { 
      plan: item.plan.income,
      fact: item.fact.income
    } : null;

    partnersRow[month] = item ? { 
      plan: item.plan.activePartners,
      fact: item.fact.activePartners
    } : null;
  });

  const adminRows = data.table.flatMap(admin => {
    const amountRow: TableRowData = {
      firstColumn: admin.adminName,
      secondColumn: 'Amount:',
    };

    const activeRow: TableRowData = {
      firstColumn: '',
      secondColumn: 'Active partners:',
    };

    displayMonths.forEach(month => {
      const monthIndex = monthNames.indexOf(month);
      const monthData = admin.months[monthIndex];
      
      amountRow[month] = monthData ? { 
        plan: monthData.income,
        fact: monthData.income
      } : null;

      activeRow[month] = monthData ? { 
        plan: monthData.activePartners,
        fact: monthData.activePartners
      } : null;
    });

    return [amountRow, activeRow];
  });

  return [managerRow, partnersRow, ...adminRows];
};

export const generateColumns = (displayMonths: string[]) => {
  return [
    {
      header: '',
      accessorKey: 'firstColumn',
      cell: (info: CellContext<TableRowData, unknown>) => {
        const rowIndex = info.row.index;
        const value = info.getValue() as string;
        const isManagerFirstRow = info.row.original.firstColumn === 'Manager';
        const isManagerSecondRow = rowIndex === 1 && info.row.original.firstColumn === '';
        const isEmptyRow = info.row.original.firstColumn === '';
      
        if (isManagerFirstRow && info.column.id === 'firstColumn') {
          return (
            <div className="flex items-center h-full">
              <span className="text-[#4F669D] text-sm font-bold">
                {value}
              </span>
            </div>
          );
        }
      
        if (isManagerSecondRow && info.column.id === 'firstColumn') {
          return null;
        }
      
        return (
          <div className="flex items-center h-full">
            <span className="text-sm text-[#A6B1B9]">
              {!isEmptyRow && value}
            </span>
          </div>
        );
      },      
      size: 150
    },
    {
      header: '',
      accessorKey: 'secondColumn',
      cell: (info: CellContext<TableRowData, unknown>) => {
        const value = info.getValue() as string;
        const row = info.row.original;
        const isTotalAmountRow = row.secondColumn === 'Total amount:';
        const isTotalActivePartnersRow = row.secondColumn === 'Total active partners:';
        
        return (
          <div className="flex items-center h-full">
            <span className={`text-sm ${
              isTotalAmountRow || isTotalActivePartnersRow ? 'text-[#4F669D]' : 'text-[#A6B1B9]'
            }`}>
              {value}
            </span>
          </div>
        );
      },
      size: 150
    },
    ...displayMonths.map(month => ({
      header: () => (
        <div className="flex flex-col border-r border-[#D6E3EC] px-4 py-3">
          <span className="text-[#A6B1B9] text-sm font-normal">{month}</span>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-[#A6B1B9]">Plan:</span>
            <span className="text-[#A6B1B9]">Fact:</span>
          </div>
        </div>
      ),
      accessorKey: month,
      cell: (info: CellContext<TableRowData, MonthCellValue>) => {
        const value = info.getValue();
        
        return (
          <div className="flex flex-col justify-center h-full border-r border-[#D6E3EC] px-4 py-3">
            <div className="flex justify-between">
              <span className="text-sm text-[#A6B1B9]">
                {value?.plan ? `$${value.plan.toFixed(2).toLocaleString()}` : 'No data'}
              </span>
              <span className="text-sm text-[#A6B1B9]">
                {value?.fact ? `$${value.fact.toFixed(2).toLocaleString()}` : 'No data'}
              </span>
            </div>
          </div>
        );
      },
      size: 150
    }))
  ];
};