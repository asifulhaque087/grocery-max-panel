import { makeVar } from '@apollo/client';

export const currentParamVarible = makeVar<string>('');

export const setCurrentParam = (param: string) => {
  currentParamVarible(param);
};
