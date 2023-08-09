/**
 * @method generateCombinations
 * @param {number} i
 * @param {string[][]} res
 * @param {IProductApi} product
 * @returns {string[][]}
 * @description this function will genarate all the combinations based on attribute value and return all the combination arary
 */

import { IProductApi } from '@src/graphql/reactivities/productVariable';

export interface IDyCombinationObj {
  [key: string]: string;
}

export const generateCombinations = (
  i: number,
  res: IDyCombinationObj[],
  product: IProductApi
) => {
  const ans: IDyCombinationObj[][] = [];
  const rec = (i: number, res: IDyCombinationObj[]) => {
    if (i == product.attributes.length) {
      ans.push([...res]);
      return;
    }

    for (let j = 0; j < product.attributes[i].values.length; j++) {
      let value = product.attributes[i].values[j].valueName;
      // res.push(value);
      let key = product.attributes[i].attributeName;
      res.push({ [key]: value });
      // res = {key: "hi"}

      rec(i + 1, res);
      res.pop();
    }
  };

  //   rec(0, []);
  rec(i, res);

  return ans;
};
