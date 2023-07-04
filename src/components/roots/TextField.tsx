'use client';
import { useField, ErrorMessage } from 'formik';

export const TextField = ({ label, ...props }: any) => {
  const [field, meta] = useField<{}>(props);

  return (
    <div>
      <div className="my-3">
        <label
          htmlFor={label.replace(/ /g, '')}
          className="py-2 block capitalize"
        >
          {label}
        </label>
        <div className="mb-3s pt-0">
          <input
            className={`px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white  rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full border ${
              meta.touched && meta.error && ' border-red-500'
            }`}
            {...field}
            {...props}
          />
        </div>
      </div>
      <ErrorMessage
        component="div"
        name={field.name}
        className="text-red-500"
      />
    </div>
  );
};
