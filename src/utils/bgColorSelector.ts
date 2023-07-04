/**
 * @method bgColorSelector
 * @param {string} colorName
 * @returns {string}
 * @description this function will receive bgType and return font color
 */

export const bgColorSelector = (colorName: string) => {
  switch (colorName) {
    case 'green':
      return '#33a148';

    case 'white':
      return '#fff';

    case 'orange':
      return '#eb8a21';
  }
};
