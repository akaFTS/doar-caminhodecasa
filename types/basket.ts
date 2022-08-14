import { Donation } from './campaigns';

export type Basket = {
  [key: string]: BasketItem;
};

export type BasketItem = {
  amount: number;
  product: Donation;
};
