import { FinancialData } from "@/types/index";
import { monthNames } from '@/constants/index';

export const generateTableData = (data: FinancialData, displayMonths: string[]) => {
  return [
    {
      firstColumn: 'Manager',
      secondColumn: 'Total amount:',
      ...Object.fromEntries(displayMonths.map(month => {
        const monthIndex = monthNames.indexOf(month);
        const item = data.total[monthIndex];
        return [
          month,
          { 
            plan: item?.plan.income,
            fact: item?.fact.income
          }
        ];
      }))
    },
    {
      firstColumn: '',
      secondColumn: 'Total active partners:',
      ...Object.fromEntries(displayMonths.map(month => {
        const monthIndex = monthNames.indexOf(month);
        const item = data.total[monthIndex];
        return [
          month,
          { 
            plan: item?.plan.activePartners,
            fact: item?.fact.activePartners
          }
        ];
      }))
    },
    ...data.table.flatMap(admin => [
      {
        firstColumn: admin.adminName,
        secondColumn: 'Amount:',
        ...Object.fromEntries(displayMonths.map(month => {
          const monthIndex = monthNames.indexOf(month);
          const monthData = admin.months[monthIndex];
          return [
            month,
            monthData ? { 
              plan: monthData.income,
              fact: monthData.income
            } : null
          ];
        }))
      },
      {
        firstColumn: '',
        secondColumn: 'Active partners:',
        ...Object.fromEntries(displayMonths.map(month => {
          const monthIndex = monthNames.indexOf(month);
          const monthData = admin.months[monthIndex];
          return [
            month,
            monthData ? { 
              plan: monthData.activePartners,
              fact: monthData.activePartners
            } : null
          ];
        }))
      }
    ])
  ];
};

export const generateColumns = (displayMonths: string[], data: FinancialData) => {
  return [
    {
      header: '',
      accessorKey: 'firstColumn',
      cell: (info: any) => {
        const rowIndex = info.row.index;
        const value = info.getValue();
        const isManagerFirstRow = info.row.original.firstColumn === 'Manager';
        const isManagerSecondRow = rowIndex === 1 && info.row.original.firstColumn === '';
        const isAdminRow = data.table.some(admin => admin.adminName === info.row.original.firstColumn);
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
      size: 200
    },
    {
      header: '',
      accessorKey: 'secondColumn',
      cell: (info: any) => {
        const row = info.row;
        const isTotalAmountRow = row.original.secondColumn === 'Total amount:';
        const isTotalActivePartnersRow = row.original.secondColumn === 'Total active partners:';
        
        return (
          <div className="flex items-center h-full">
            <span className={`text-sm ${
              isTotalAmountRow || isTotalActivePartnersRow ? 'text-[#4F669D]' : 'text-[#A6B1B9]'
            }`}>
              {info.getValue()}
            </span>
          </div>
        );
      },
      size: 200
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
      cell: (info: any) => {
        const value = info.getValue();
        
        return (
          <div className="flex flex-col justify-center h-full border-r border-[#D6E3EC] px-4 py-3">
            <div className="flex justify-between">
              <span className="text-sm text-[#A6B1B9]">
                {value?.plan ? `$${value.plan.toLocaleString()}` : 'No data'}
              </span>
              <span className="text-sm text-[#A6B1B9]">
                {value?.fact ? `$${value.fact.toLocaleString()}` : 'No data'}
              </span>
            </div>
          </div>
        );
      },
      size: 150
    }))
  ];
};