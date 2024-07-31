import { FC } from "react";
import css from "./header.module.scss";
import { useTasksData } from "./contexts/tasks";
import { randomId } from "../utils";
import getTranslation from "../translations";

const Header: FC = () => {
  const { addTask, moveAllTasks } = useTasksData();
  // const { isWeekDaysOpen, setIsWeekDaysOpen } = useAppState();

  // const handleOpenWeekDays = () => {
  //   setIsWeekDaysOpen(!isWeekDaysOpen);
  // };

  const handleNewTask = () => {
    addTask("main", {
      id: randomId(),
      timeCreated: Date.now(),
      timeModified: Date.now(),
      description: "",
      checked: false,
    });
  };

  const handleMoveAll = () => {
    if (window.confirm(getTranslation("confirmMoveAll"))) {
      moveAllTasks();
    }
  };

  return (
    <div className={css.container}>
      <div>Daily Todo List</div>
      <div>
        <button onClick={handleNewTask}>{getTranslation("newTask")}</button>
      </div>
      <div>
        <button onClick={handleMoveAll}>{getTranslation("moveAll")}</button>
      </div>
      {/* <div className={css.spacer}></div>
      <div><button onClick={handleOpenWeekDays}>view week</button></div> */}
    </div>
  );
};

export default Header;
