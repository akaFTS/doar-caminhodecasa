import { Donation } from './campaigns';

export type Basket = {
  [key: string]: BasketItem;
};

export type BasketItem = {
  amount: number;
  product: Donation;
};

export type SimpleBasketItem = {
  name: string;
  amount: number;
  price: number;
};
