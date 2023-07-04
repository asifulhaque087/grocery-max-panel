import { ICategory, IProduct } from '../roots';

export interface ICategoryProductPage {
  // loading: boolean;
  categories: ICategory[];
  products: IProduct[];
  categoryId: string;
}
