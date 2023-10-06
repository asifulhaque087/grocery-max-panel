import { IProduct } from './Product';
import { IProductCombinationStock } from './ProductCombinationStock';

export interface IProductCombination {
  id: number;
  combinationString: string;
  uniqueStringId: string;
  sku: string;
  price: number;
  availableStock: number;
  product: IProduct;
  stocks: IProductCombinationStock[];
}
