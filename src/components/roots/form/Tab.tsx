'use client';

import { ITab } from '@src/types/roots';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export const Tab = ({ tabs, activeIndex, setActiveIndex, isEdit }: ITab) => {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <div className="w-full flex items-center gap-[20px] bg-white py-[20px] px-[30px]  rounded-[6px] border shadow-custom">
      {tabs.map((tab, i) => (
        <span
          key={i}
          className={`text-[#24334A] text-[14px] tracking-[0.5px] cursor-pointer capitalize
          ${
            i == activeIndex &&
            '!bg-[rgba(115,103,240,0.68)] !text-white !rounded-[6px] !px-[10px] !py-[2px] grid place-items-center'
          }

          ${!isEdit && i !== 0 ? 'opacity-50 pointer-events-none' : null}

          `}
          onClick={() => {
            if (tab.tabLink) router.push(`${pathName}/${tab.tabLink}`);
            setActiveIndex(i);
          }}
        >
          {tab.title}
        </span>
      ))}
    </div>
  );
};
