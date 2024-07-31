import {
  createContext,
  useContext,
  FC,
  ReactNode,
  useState,
  useEffect,
  useRef,
} from "react";
import TaskType from "../../types/task";

type ContextType = {
  saveCache: () => void;
  loadCache: () => void;

  getTasks: (listName: TaskListName) => TaskType[];
  setTasksInList: (listName: TaskListName, newTasksList: TaskType[]) => void;
  addTask: (listName: TaskListName, newTask: TaskType) => void;
};

export const TasksDataContext = createContext<ContextType>({} as ContextType);

type Props = {
  children: ReactNode;
};

export type TaskListName = "main" | "0" | "1" | "2" | "3" | "4" | "5" | "6"

const getInitialTasks = () => {
  const initialTasks = new Map<string, TaskType[]>();
  initialTasks.set("main", [])
  initialTasks.set("0", [])
  initialTasks.set("1", [])
  initialTasks.set("2", [])
  initialTasks.set("3", [])
  initialTasks.set("4", [])
  initialTasks.set("5", [])
  initialTasks.set("6", [])
  return initialTasks

  // TODO: load tasks from localStorage here
}

const TasksDataContextProvider: FC<Props> = ({ children }) => {
  const tasksCacheRef = useRef<Map<string, TaskType[]>>(getInitialTasks());

  const [tasks, setTasks] = useState<Map<string, TaskType[]>>(getInitialTasks());

  const saveCache = () => {
    tasksCacheRef.current = structuredClone(tasks)
  }

  const loadCache = () => {
    setTasks(tasksCacheRef.current)
  }

  const getTasks = (listName: TaskListName) => {
    return tasks.get(listName) as TaskType[]
  }

  const setTasksInList = (listName: TaskListName, newTasksList: TaskType[]) => {
    tasksCacheRef.current.set(listName, newTasksList)
  }

  const addTask = (listName: TaskListName, task: TaskType) => {
    const newTasks = structuredClone(tasks)

    newTasks.get(listName)!.push(task)

    setTasks(newTasks)
  }

  return (
    <TasksDataContext.Provider value={{ saveCache, loadCache, getTasks, addTask, setTasksInList }}>
      {children}
    </TasksDataContext.Provider>
  );
};

export default TasksDataContextProvider;

export const useTasksData = () => {
  return useContext(TasksDataContext);
};