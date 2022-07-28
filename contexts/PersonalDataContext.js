import { useContext, createContext } from 'react';

export const PersonalDataContext = createContext({
  setPersonalData: () => {},
  personalData: {},
});

export const usePersonalData = () => useContext(PersonalDataContext);
