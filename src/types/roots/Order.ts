import { IProduct } from './Product';

export interface IUser {
  name: string;
  email: string;
  role: string;
}

export interface IOrderItem {
  id: string;
  name: string;
  count: string;
  photo: string;
  price: string;
  product: IProduct;
}

export interface IShippingAddress {
  phone: string;
  address: string;
}

export interface IOrder {
  id: string;
  user: IUser;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  itemPrice: string;
  taxPrice: string;
  shippingPrice: string;
  totalPrice: string;
  isPaid: boolean;
  isDelivered: boolean;
}
