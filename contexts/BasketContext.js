import { useState, useEffect, useMemo, useContext, createContext } from 'react';

const BasketContext = createContext({
  setBasket: () => {},
  basket: {},
});

export function BasketProvider({ children }) {
  const [basket, setBasket] = useState({});

  useEffect(() => {
    setBasket(JSON.parse(localStorage.getItem('Basket')) || {});
  }, []);

  useEffect(() => {
    localStorage.setItem('Basket', JSON.stringify(basket));
  }, [basket]);

  const basketContextPayload = useMemo(() => ({ basket, setBasket }), [basket]);
  return (
    <BasketContext.Provider value={basketContextPayload}>
      {children}
    </BasketContext.Provider>
  );
}

export const useBasket = () => useContext(BasketContext);
