import {
  IAttributeValue,
  IProductErAttribute,
} from '@src/graphql/reactivities/productVariable';
import { Dispatch, SetStateAction } from 'react';

export interface IAttributeSelectFormat {
  value: number;
  label: string;
}

export interface IProductAttributeAndSendValues extends IProductErAttribute {
  apiValues: IAttributeValue[] | [];
}

export interface IProductAttribute {
  setActiveIndex: Dispatch<SetStateAction<number>>;
}
