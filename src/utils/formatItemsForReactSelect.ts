import { IReactSelect } from '@src/types/lib';

export const formatItemsForReactSelect = (
  items: any,
  getValueFrom: string,
  getLabelFrom: string,
  depth = 0
) => {
  const formattedItems: IReactSelect[] = [];

  for (const item of items) {
    formattedItems.push({
      value: item[getValueFrom],
      label: `${'-'.repeat(depth)} ${item[getLabelFrom]}`,
    });

    if (item.childrens) {
      formattedItems.push(
        ...formatItemsForReactSelect(
          item.childrens,
          getValueFrom,
          getLabelFrom,
          depth + 1
        )
      );
    }
  }

  return formattedItems;
};
