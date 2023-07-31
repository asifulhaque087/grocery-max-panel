const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    let baseURL: any = '';
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      baseURL = reader.result;
      // finally
      resolve(baseURL);
    };
  });
};

interface IInputImage {
  url: string;
  isFeatured: boolean;
}

export const convertToBase64 = async (files: FileList) => {
  let new_list: IInputImage[] = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    let result = await getBase64(file);
    new_list = [...new_list, { url: result, isFeatured: false }];
  }

  return new_list;
};
