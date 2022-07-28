import { useState, useEffect, useMemo, useContext, createContext } from 'react';

export const PersonalDataContext = createContext({
  setPersonalData: () => {},
  personalData: {},
});

export function PersonalDataProvider({ children }) {
  const [personalData, setPersonalData] = useState({});

  useEffect(() => {
    setPersonalData(
      JSON.parse(localStorage.getItem('PersonalData')) || {
        name: '',
        email: '',
        cpf: '',
      },
    );
  }, []);

  useEffect(() => {
    localStorage.setItem('PersonalData', JSON.stringify(personalData));
  }, [personalData]);

  const personalDataContextPayload = useMemo(
    () => ({ personalData, setPersonalData }),
    [personalData],
  );

  return (
    <PersonalDataContext.Provider value={personalDataContextPayload}>
      {children}
    </PersonalDataContext.Provider>
  );
}

export const usePersonalData = () => useContext(PersonalDataContext);
