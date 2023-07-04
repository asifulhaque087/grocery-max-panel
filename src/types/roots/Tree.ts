import { Dispatch, SetStateAction } from 'react';
import { IOpenId } from './Row';
import { ICategory } from './Category';

export interface ITree {
  treeData: ICategory[];
  parentId?: string | null;
  level: number;
  toggleActive: (id: string) => void;
  activeId: string;
  openIds: IOpenId[];
  setOpenIds: Dispatch<SetStateAction<IOpenId[]>>;
}
