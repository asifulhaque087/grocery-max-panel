import { IReactSelect } from '@src/types/lib';

export interface ICategoryAddForm {
  cats: IReactSelect[];
  fetchAgain: () => void;
}
