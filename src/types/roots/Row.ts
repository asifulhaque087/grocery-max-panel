import { Dispatch, SetStateAction } from 'react';
import { ICategory } from './Category';

export interface IOpenId {
  id: string;
  level: number;
}

export interface IRow {
  item: ICategory;
  level: number;
  children: React.ReactNode;

  toggleActive: (id: string) => void;

  activeId: string;
  openIds: IOpenId[];

  setOpenIds: Dispatch<SetStateAction<IOpenId[]>>;

  childIsAParent: boolean;
}
