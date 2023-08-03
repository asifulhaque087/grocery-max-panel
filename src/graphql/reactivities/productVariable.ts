import { makeVar } from '@apollo/client';

export interface IAttributeValue {
  id: number;
  name: string;
  // images?: IProductImage[];
}

export interface IAttribute {
  id: number;
  name: string;
  values: IAttributeValue[] | [];
}

// product realted
interface IProductGallery {
  id: number;
  url: string;
}

export interface IProductImageRead {
  id: number;
  isFeature: boolean;
  gallery?: IProductGallery;
}

export interface IProductValue {
  id: number;
  valueName: string;
  valueId: number;
  images?: IProductImageRead[];
}

export interface IProductErAttribute {
  id: number;
  attributeName: string;
  attributeId: number;
  values: IProductValue[];
}

interface IProduct {
  id: number;
  name: string;
  slug: string;
  description?: string;
  attributes: IProductErAttribute[] | [];
}

export const singleProductVar = makeVar<IProduct | null>(null);

export const storeSingleProduct = (product: any) => {
  singleProductVar(product);
};

const product = {
  id: 1,
  name: 'Dynamic Customizable Image Product',
  slug: 'dynamic-customizable-image-product',
  description:
    "The 'Dynamic Customizable Image Product' is a powerful and flexible product that allows users to create and customize their own unique images. It is designed to cater to various creative needs, from personalized artworks to customizable merchandise.",
  attributes: [
    {
      id: 1,
      name: 'Customizable Attributes',
      attributeId: 1001,
      values: [
        {
          id: 101,
          name: 'Colors',
          images: [
            {
              id: 1001,
              isFeature: true,
              gallery: {
                id: 10001,
                url: 'https://example.com/gallery/colors',
              },
            },
            {
              id: 1002,
              isFeature: false,
              gallery: {
                id: 10002,
                url: 'https://example.com/gallery/colors2',
              },
            },
            // Add more images as needed
          ],
        },
        {
          id: 102,
          name: 'Patterns',
          images: [
            {
              id: 1003,
              isFeature: true,
              gallery: {
                id: 10003,
                url: 'https://example.com/gallery/patterns',
              },
            },
            // Add more images as needed
          ],
        },
        // Add more attributes as needed
      ],
    },
    {
      id: 2,
      name: 'Feature Selection',
      attributeId: 1002,
      values: [
        {
          id: 103,
          name: 'Featured Images',
          images: [
            // Add featured images as needed
          ],
        },
        // Add more values as needed
      ],
    },
    // Add more attributes as needed
  ],
};
