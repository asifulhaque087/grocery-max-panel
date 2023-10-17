import { IAttribute } from '@src/types/models';

export interface IAttributeForm {
  fetchAgain?: () => void;
  attribute?: IAttribute | null;
}
