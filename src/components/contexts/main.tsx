import {
  createContext,
  useContext,
  FC,
  ReactNode,
  useState,
} from "react";
import TaskType from "../../types/task";

type ContextType = {
  mainTasks: TaskType[];
  setMainTasks: (newMainTasks: TaskType[]) => void;
  
  // TODO: add daily tasks here
};

export const MainContext = createContext<ContextType>({} as ContextType);

type Props = {
  children: ReactNode;
};

const MainContextProvider: FC<Props> = ({ children }) => {
  const [mainTasks, setMainTasks] = useState<TaskType[]>([]);

  return (
    <MainContext.Provider value={{ mainTasks, setMainTasks }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;

export const useMain = () => {
  return useContext(MainContext);
};