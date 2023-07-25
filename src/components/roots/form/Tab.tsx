import { ITab } from '@src/types/roots';

export const Tab = ({ tabs, activeIndex, setActiveIndex }: ITab) => {
  return (
    <div className="w-full flex items-center gap-[20px] bg-white py-[20px] px-[30px]  rounded-[6px] shadow-custom">
      {tabs.map((tab, i) => (
        <span
          key={i}
          className={`text-[#24334A] text-[14px] tracking-[0.5px] cursor-pointer capitalize
          ${
            i == activeIndex &&
            '!bg-[rgba(115,103,240,0.68)] !text-white !rounded-[6px] !px-[10px] !py-[2px] grid place-items-center'
          }
          `}
          onClick={() => setActiveIndex(i)}
        >
          {tab.title}
        </span>
      ))}
    </div>
  );
};
