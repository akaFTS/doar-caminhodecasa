import { useState, useEffect, useMemo, useContext, createContext } from 'react';

const BasketContext = createContext({
  setBasket: () => {},
  basket: {},
});

export function BasketProvider({ children }) {
  const [basket, setBasket] = useState({});
  const [basketReady, setBasketReady] = useState(false);

  useEffect(() => {
    setBasket(JSON.parse(localStorage.getItem('Basket')) || {});
    setBasketReady(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('Basket', JSON.stringify(basket));
  }, [basket]);

  const basketContextPayload = useMemo(
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
