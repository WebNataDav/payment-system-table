import { handleMonthNavigation } from '@/helpers/index';

interface TableControlsProps {
  currentStartMonth: number;
  setCurrentStartMonth: React.Dispatch<React.SetStateAction<number>>;
}

export const TableControls = ({ currentStartMonth, setCurrentStartMonth }: TableControlsProps) => {
  return (
    <div className="p-6 flex justify-between items-center border-b border-[#D6E3EC]">
      <button className="w-[130px] h-10 border border-[#D6E3EC] rounded-md flex items-center justify-between px-3">
        <span className="text-[#4F669D] text-sm font-medium">Year 2025</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 10L12 15L17 10H7Z" fill="#4F669D"/>
        </svg>
      </button>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button 
            className="w-10 h-10 border border-[#DDDEDF] rounded-md flex items-center justify-center"
            onClick={() => handleMonthNavigation(currentStartMonth, setCurrentStartMonth, 'left')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#202F55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            className="w-10 h-10 border border-[#DDDEDF] rounded-md flex items-center justify-center"
            onClick={() => handleMonthNavigation(currentStartMonth, setCurrentStartMonth, 'right')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="#202F55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <button className="w-[109px] h-10 bg-[#202F55] rounded-md flex items-center justify-center gap-2">
          <span className="text-white text-sm font-medium">+ Add plan</span>
        </button>
      </div>
    </div>
  );
};