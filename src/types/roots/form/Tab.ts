import { Dispatch, SetStateAction } from 'react';

export interface ITab {
  tabs: { title: string; tabLink: string }[];
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  isEdit: boolean;
}
