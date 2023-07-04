// colorSchemeType
// export type colorSchemeType = 'green' | 'white' | 'orange';

import { IBanner, IProduct } from '../roots';

export interface IHomePage {
  bannerLoading: boolean;
  banners: IBanner[];
  mostDiscountLoading: boolean;
  mostDiscountProducts: IProduct[];
  newArrivalLoading: boolean;
  newArrivalProducts: IProduct[];
  bestSellingLoading: boolean;
  bestSellingProducts: IProduct[];
}
