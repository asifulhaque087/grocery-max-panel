import { makeVar } from '@apollo/client';

interface IGallery {
  id?: number;
  url?: string;
}

interface IImage {
  id?: number;
  isFeature?: boolean;
  gallery?: IGallery[];
}

interface IValue {
  id?: number;
  name?: string;
  images?: IImage[];
}

interface IAttribute {
  id?: number;
  name?: string;
  attributeId?: number;
  values?: IValue[];
}

interface IProduct {
  id?: number;
  name?: string;
  slug?: string;
  description?: string;
  attributes?: IAttribute[];
}

export const singleProductVar = makeVar<IProduct | null>(null);

export const storeSingleProduct = (product: any) => {
  singleProductVar(product);
};
