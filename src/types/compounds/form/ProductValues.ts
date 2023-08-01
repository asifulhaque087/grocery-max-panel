import {
  IAttributeValue,
  IProductValue,
} from '@src/graphql/reactivities/productVariable';

export interface IProductValues {
  productAttributeId: number;
  addedValues: IProductValue[] | [];
  apiValues: IAttributeValue[] | [];
}
