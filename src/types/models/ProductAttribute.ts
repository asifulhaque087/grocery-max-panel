import { IProductAttributeValue } from './ProductAttributeValue';

export interface IProductAttribute {
  id: number;
  attributeName: string;
  attributeId: number;
  values: IProductAttributeValue[];
}
