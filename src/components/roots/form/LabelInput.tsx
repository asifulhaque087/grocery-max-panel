'use client';
import { ILabelInput } from '@src/types/roots';

export const LabelInput = ({
  htmlFor,
  name,
  label,
  type = 'text',
  disabled,
  formatPrice,
  register,
  required,
  errors,
}: ILabelInput) => {
  return (
    <div className="flex flex-col gap-y-[5px]">
      <label
        htmlFor={htmlFor}
        className="text-[13px] text-[#292D32] capitalize"
      >
        {label}
      </label>
      <input
        id={htmlFor}
        disabled={disabled}
        {...register(name, { required })}
        placeholder=" "
        type={type}
        className="w-full outline-none text-[rgba(47,43,61,0.68)] placeholder:text-[rgba(47,43,61,0.48)] placeholder:capitalize border rounded-[6px] px-[16px] py-[8px] focus:shadow-[0px_2px_4px_rgba(47,43,61,.12)] focus:border-[#7367f0] focus:placeholder:pl-[10px] focus:transition-all focus:placeholder:transition-all placeholder:transition-all transition-all"
      />
    </div>
  );
};
