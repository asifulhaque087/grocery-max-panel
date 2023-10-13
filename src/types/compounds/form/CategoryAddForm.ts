import { IReactSelect } from '@src/types/lib';
import { ICategory } from '@src/types/models';

export interface ICategoryAddForm {
  cats: IReactSelect[];
  fetchAgain?: () => void;
  category?: ICategory;
}
