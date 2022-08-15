import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
} from 'react';
import { Basket } from 'types/basket';

type BasketContextPayload = {
  basket: Basket;
  setBasket: (Basket) => void;
  basketReady: boolean;
};

type ProviderProps = {
  children: React.ReactNode;
};

const BasketContext = createContext<BasketContextPayload>({
  setBasket: () => {},
  basket: {},
  basketReady: false,
});

export function BasketProvider({ children }: ProviderProps) {
  const [basket, setBasket] = useState<Basket>({});
  const [basketReady, setBasketReady] = useState(false);

  useEffect(() => {
    setBasket(JSON.parse(localStorage.getItem('Basket')) || {});
    setBasketReady(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('Basket', JSON.stringify(basket));
  }, [basket]);

  const basketContextPayload = useMemo<BasketContextPayload>(
    () => ({ basket, basketReady, setBasket }),
    [basket, basketReady],
  );
  return (
    <BasketContext.Provider value={basketContextPayload}>
      {children}
    </BasketContext.Provider>
  );
}

export const useBasket = () => useContext(BasketContext);
