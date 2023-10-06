import { IProduct } from './Product';

export interface IProductCach {
  id: number;
  slug: string;
  data: string;
  product: IProduct;
}
