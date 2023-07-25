import { Dispatch, SetStateAction } from 'react';

export interface ITab {
  tabs: { title: string }[];
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
}
