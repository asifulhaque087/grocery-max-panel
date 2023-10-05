import { SelectField } from '@src/components/roots';
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';

const meta: Meta<typeof SelectField> = {
  title: 'Roots/Form/SelectField',
  component: SelectField,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SelectField>;

const Wrapper = () => {
  const [brands, setBrands] = useState<any[]>([]);

  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      unit: '',
      video_link: '',
      product_price: '',
      stock: '',
      discount: '',
      description: '',
      short_description: '',
      type: '',
      brand_id: '',
      category_id: [],
      featured_image: '',
      multi_image: [],
      status: 0,
    },
  });
  const requiredSelectionMessage: string = 'Select an option';

  return (
    <>
      <SelectField
        isMulti={false}
        control={control}
        controller={Controller}
        selectLabel="Brand"
        selectName="brand_id"
        // defaultValue={[{ value: 'RED', label: 'Red' }]}
        selectOptions={brands?.map((brand) => ({
          value: brand.id,
          label: brand.name,
        }))}
        required={register('brand_id', {
          required: requiredSelectionMessage,
        })}
      />
    </>
  );
};

export const Primary: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  render: (args) => <Wrapper {...args} />,
};
