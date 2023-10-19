export const organizeRecursiveItems = (
  categories: any,
  parentIdKey: string,
  parentId: number | null = null
) => {
  const organizedCategories = [];

  for (let category of categories) {
    category = { ...category };
    if (category[parentIdKey] === parentId) {
      const childrens = organizeRecursiveItems(
        categories,
        parentIdKey,
        category.id
      );

      if (childrens.length > 0) {
        category['childrens'] = childrens;
      }
      organizedCategories.push(category);
    }
  }

  return organizedCategories;
};
