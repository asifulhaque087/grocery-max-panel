import { IProductValue } from '@src/graphql/reactivities/productVariable';

export interface IProductImageInput {
  url: string;
  isFeatured: boolean;
}

export interface IProductValueInput {
  valueName: string;
  valueId: number;
  productAttributeId: number;
}

export interface IProductImage {
  unSelectValue: (id: number) => void;
  productId: number;
  createApiCallData?: IProductValueInput;
  addedValue?: IProductValue;
}

// productAttributeValueId?: number;
