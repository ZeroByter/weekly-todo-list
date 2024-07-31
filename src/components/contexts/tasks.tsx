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
  deleteTask: (listName: TaskListName, index: number) => void;
  setTask: (listName: TaskListName, index: number, newTask: TaskType) => void;

  moveAllTasks: () => void;
};

export const TasksDataContext = createContext<ContextType>({} as ContextType);

const LOCAL_STORAGE_KEY = "tasksData";

type Props = {
  children: ReactNode;
};

export type TaskListName = "main" | "0" | "1" | "2" | "3" | "4" | "5" | "6";

const getInitialTasks = () => {
  const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}");

  const initialTasks = new Map<string, TaskType[]>();
  initialTasks.set("main", savedData["main"] ?? []);
  initialTasks.set("0", savedData["0"] ?? []);
  initialTasks.set("1", savedData["1"] ?? []);
  initialTasks.set("2", savedData["2"] ?? []);
  initialTasks.set("3", savedData["3"] ?? []);
  initialTasks.set("4", savedData["4"] ?? []);
  initialTasks.set("5", savedData["5"] ?? []);
  initialTasks.set("6", savedData["6"] ?? []);
  return initialTasks;

  // TODO: load tasks from localStorage here
};

const TasksDataContextProvider: FC<Props> = ({ children }) => {
  const tasksCacheRef = useRef<Map<string, TaskType[]>>(getInitialTasks());

  const [tasks, setTasks] = useState<Map<string, TaskType[]>>(
    getInitialTasks()
  );

  const saveCache = () => {
    tasksCacheRef.current = structuredClone(tasks);
  };

  const loadCache = () => {
    setTasks(tasksCacheRef.current);
  };

  const getTasks = (listName: TaskListName) => {
    return tasks.get(listName) as TaskType[];
  };

  const setTasksInList = (listName: TaskListName, newTasksList: TaskType[]) => {
    tasksCacheRef.current.set(listName, newTasksList);
  };

  const addTask = (listName: TaskListName, task: TaskType) => {
    const newTasks = structuredClone(tasks);

    newTasks.get(listName)!.push(task);

    setTasks(newTasks);
  };

  const deleteTask = (listName: TaskListName, index: number) => {
    const newTasks = structuredClone(tasks);

    newTasks.get(listName)!.splice(index, 1);

    setTasks(newTasks);
  };

  const setTask = (listName: string, index: number, task: TaskType) => {
    const newTasks = structuredClone(tasks);

    newTasks.get(listName)!.splice(index, 1, task);

    setTasks(newTasks);
  };

  const moveAllTasks = () => {
    saveCache();

    const mainTasks = getTasks("main");

    for (const [_listName, tasksList] of tasks.entries()) {
      const listName = _listName as TaskListName;

      if (listName === "main") {
        continue;
      }

      const newTasksList: TaskType[] = [];

      for (const task of tasksList) {
        if (!task.checked) {
          mainTasks.push(task);
        }
      }

      setTasksInList(listName, newTasksList);
    }

    setTasksInList("main", mainTasks);

    loadCache();
  };

  useEffect(() => {
    const saveData: { [key: string]: TaskType[] } = {};

    for (const [listName, tasksList] of tasks.entries()) {
      saveData[listName] = tasksList;
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(saveData));
  }, [tasks]);

  return (
    <TasksDataContext.Provider
      value={{
        saveCache,
        loadCache,
        getTasks,
        addTask,
        deleteTask,
        setTasksInList,
        setTask,
        moveAllTasks,
      }}
    >
      {children}
    </TasksDataContext.Provider>
  );
};

export default TasksDataContextProvider;

export const useTasksData = () => {
  return useContext(TasksDataContext);
};
