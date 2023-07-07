import { ICategory } from '../roots';

export interface IRecursiveSidebar {
  categories: ICategory[];
  currentParam: string;
  selectParentCategory: (category: ICategory) => void;
}
