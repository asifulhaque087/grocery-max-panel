export const organizeRecursiveItems = (
  categories: any,
  parentIdKey: string,
  parentId: number | null = null
) => {
  const organizedCategories = [];

  for (const category of categories) {
    if (category[parentIdKey] === parentId) {
      const childrens = organizeRecursiveItems(
        categories,
        parentIdKey,
        category.id
      );
      if (childrens.length > 0) {
        category.childrens = childrens;
      }
      organizedCategories.push(category);
    }
  }

  return organizedCategories;
};
