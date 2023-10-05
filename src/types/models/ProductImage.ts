import { IImageGallery } from './ImageGallery';
import { IProductAttributeValue } from './ProductAttributeValue';

export interface IProductImage {
  id: number;
  isFeatured: boolean;
  value: IProductAttributeValue;
  gallery: IImageGallery;
}
