import { LabelInput } from '@src/components/roots';
import { ILabelInput } from '@src/types/roots';
import type { Meta, StoryObj } from '@storybook/react';
import { ChangeEvent, useState } from 'react';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const meta: Meta<typeof LabelInput> = {
  title: 'Roots/Form/LabelInput',
  component: LabelInput,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof LabelInput>;

const Wrapper = (args: ILabelInput) => {
  // Sets the hooks for both the label and primary props

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onFormSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <LabelInput
        {...args}
        disabled={isLoading}
        register={register}
        errors={errors}
      />
    </form>
  );
};

export const Primary: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    id: 'email',
    label: 'Email',
    required: true,
  },

  render: (args) => <Wrapper {...args} />,
};
