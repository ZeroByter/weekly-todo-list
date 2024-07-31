import {
  createContext,
  useContext,
  FC,
  ReactNode,
  useState,
} from "react";

type ContextType = {
  isWeekDaysOpen: boolean;
  setIsWeekDaysOpen: (newIsWeekDaysOpen: boolean) => void;
};

export const AppStateContext = createContext<ContextType>({} as ContextType);

type Props = {
  children: ReactNode;
};

const AppStateContextProvider: FC<Props> = ({ children }) => {
  const [isWeekDaysOpen, setIsWeekDaysOpen] = useState<boolean>(false);

  return (
    <AppStateContext.Provider value={{ isWeekDaysOpen, setIsWeekDaysOpen }}>
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateContextProvider;

export const useAppState = () => {
  return useContext(AppStateContext);
};