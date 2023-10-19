import { IReactSelect } from '@src/types/lib';
import { IAttributeValue } from '@src/types/models';

export interface IAttributeValueForm {
  attributes: IReactSelect[];
  value?: IAttributeValue | null;
  fetchAgain?: () => void;
}
