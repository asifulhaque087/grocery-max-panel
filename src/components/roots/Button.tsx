'use client';

import { IButton } from '@src/types/roots';
import { bgColorSelector } from '@src/utils';

export const Button = ({ label, colorScheme, outline, onSubmit }: IButton) => {
  const bgColor = bgColorSelector(colorScheme);

  // outline
  //   ? `bg-[${bgColor}] text-[${bgColor}]`
  //   : `bg-[${bgColor}] text-[#fff]`

  return (
    <button
      className={`p-[30px] rounded-lg px-[19px] py-[6px] text-[14px] font-[700]`}
      style={{
        backgroundColor: outline ? 'transparent' : bgColor,
        color: outline ? bgColor : '#fff',
        border: outline ? `3px solid ${bgColor}` : 'none',
      }}
    >
      {label}
    </button>
  );
};
