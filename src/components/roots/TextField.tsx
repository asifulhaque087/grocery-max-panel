'use client';

import { useField, ErrorMessage } from 'formik';

export const TextField = ({ label, ...props }: any) => {
  const [field, meta] = useField<{}>(props);

  return (
    <div className="flex flex-wrap">
      <div className="relative w-full appearance-none label-floating">
        <input
          className={`tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full
            rounded border border-gray-400  focus:outline-none focus:bg-white focus:border-2 focus:border-green-500  
           ${meta.touched && meta.error && 'border border-red-500'}`}
          {...field}
          {...props}
        />
      </div>
      <ErrorMessage
        component="div"
        name={field.name}
        className="text-red-500"
      />
    </div>
  );
};
