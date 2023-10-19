import { IProduct } from '@src/types/models';
import { Dispatch, SetStateAction } from 'react';

export interface IProductInformation {
  setActiveIndex: Dispatch<SetStateAction<number>>;
  product?: IProduct;
}
