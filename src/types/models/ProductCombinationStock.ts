import { IProductCombination } from './ProductCombination';

export interface IProductCombinationStock {
  id: number;
  totalStock: number;
  unitPrice: number;
  totalPrice: number;
  combination: IProductCombination;
}
