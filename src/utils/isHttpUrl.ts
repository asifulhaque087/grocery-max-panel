export const isHttpUrl = (str: string) => {
  const httpUrlPattern = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/i;
  return httpUrlPattern.test(str);
};
