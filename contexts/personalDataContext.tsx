import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
} from 'react';
import { PersonalData } from 'types/checkout';

type PersonalDataContextPayload = {
  personalData: PersonalData;
  setPersonalData: (PersonalData) => void;
  personalDataReady: boolean;
};

type ProviderProps = {
  children: React.ReactNode;
};

const initialPersonalData: PersonalData = {
  name: '',
  email: '',
  cpf: '',
};

export const PersonalDataContext = createContext<PersonalDataContextPayload>({
  setPersonalData: () => {},
  personalData: initialPersonalData,
  personalDataReady: false,
});

export function PersonalDataProvider({ children }: ProviderProps) {
  const [personalData, setPersonalData] =
    useState<PersonalData>(initialPersonalData);
  const [personalDataReady, setPersonalDataReady] = useState(false);

  useEffect(() => {
    setPersonalData(
      JSON.parse(localStorage.getItem('PersonalData')) || initialPersonalData,
    );
    setPersonalDataReady(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('PersonalData', JSON.stringify(personalData));
  }, [personalData]);

  const personalDataContextPayload = useMemo<PersonalDataContextPayload>(
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
