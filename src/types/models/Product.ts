import { ICategory } from './Category';
import { IProductAttribute } from './ProductAttribute';
import { IProductCach } from './ProductCach';
import { IProductCombination } from './ProductCombination';

export interface IProduct {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  categoryName?: string | null;
  previewing?: string | null;
  category?: ICategory | null;
  attributes: IProductAttribute[];
  combinations: IProductCombination[];
  cache: IProductCach;
}
