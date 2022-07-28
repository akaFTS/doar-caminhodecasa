import { useContext, createContext } from 'react';

export const BasketContext = createContext({
  setBasket: () => {},
  basket: {},
});

export const useBasket = () => useContext(BasketContext);
