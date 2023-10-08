import { FilesField } from '@src/components/roots';
import type { Meta, StoryObj } from '@storybook/react';

import { DevTool } from '@hookform/devtools';

import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useEffect, useState } from 'react';

const meta: Meta<typeof FilesField> = {
  title: 'Roots/Form/FilesField',
  component: FilesField,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof FilesField>;

const Wrapper = () => {
  const [images, setImages] = useState([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      cover_image: [],
    },
  });

  const onFormSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const removeImageFromServer = async () => {
    console.log('image remove from server');
    return true;
  };

  useEffect(() => {
    // This code will run when the component mounts
    const timer = setTimeout(() => {
      reset({
        cover_image: [
          'https://chaldn.com/_mpimage/potato-regular-50-gm-1-kg?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D81244&q=best&v=1&m=400&webp=1',
        ],
      });
      // setMessage('Delayed message after 2 seconds');
    }, 2000); // Delay for 2 seconds (2000 milliseconds)

    // Cleanup function to clear the timer when the component unmounts or when dependencies change
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <FilesField
          removeImageFromServer={removeImageFromServer}
          isMulti
          control={control}
          controller={Controller}
          label="Cover image"
          fieldName="cover_image"
        />
      </form>

      <DevTool control={control} />
    </div>
  );
};

export const Primary: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },

  render: () => <Wrapper />,
};
