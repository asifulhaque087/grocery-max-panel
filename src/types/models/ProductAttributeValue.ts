import { IProductImage } from './ProductImage';

export interface IProductAttributeValue {
  id: number;
  valueName: string;
  valueId: number;
  images: IProductImage[];
}
