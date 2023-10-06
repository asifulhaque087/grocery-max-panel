import { IAttributeValue } from './AttributeValue';

export interface IAttribute {
  id: number;
  name: string;
  values: IAttributeValue[];
}
