import { useState, useEffect, useMemo, useContext, createContext } from 'react';

export const PersonalDataContext = createContext({
  setPersonalData: () => {},
  personalData: {},
});

export function PersonalDataProvider({ children }) {
  const [personalData, setPersonalData] = useState({});
  const [personalDataReady, setPersonalDataReady] = useState(false);

  useEffect(() => {
    setPersonalData(
      JSON.parse(localStorage.getItem('PersonalData')) || {
        name: '',
        email: '',
        cpf: '',
      },
    );
    setPersonalDataReady(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('PersonalData', JSON.stringify(personalData));
  }, [personalData]);

  const personalDataContextPayload = useMemo(
    () => ({ personalData, personalDataReady, setPersonalData }),
    [personalData, personalDataReady],
  );

  return (
    <PersonalDataContext.Provider value={personalDataContextPayload}>
      {children}
    </PersonalDataContext.Provider>
  );
}

export const usePersonalData = () => useContext(PersonalDataContext);
