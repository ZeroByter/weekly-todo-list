import { ChangeEvent, FC } from "react";
import css from "./task.module.scss";
import TextareaAutosize from "react-autosize-textarea";
import { Draggable } from "@hello-pangea/dnd";
import TaskType from "../types/task";
import { TaskListName, useTasksData } from "./contexts/tasks";
import classNames from "classnames";
import getTranslation from "../translations";

type Props = {
  listName: TaskListName;
  task: TaskType;
  index: number;
};

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  ...draggableStyle,
});

const Task: FC<Props> = ({ listName, task, index }) => {
  const { setTask, deleteTask } = useTasksData();

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    task.checked = e.target.checked;

    setTask(listName, index, task);
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    task.description = e.target.value;

    setTask(listName, index, task);
  };

  const handleDeleteClick = () => {
    if (window.confirm(getTranslation("confirmTaskDelete"))) {
      deleteTask(listName, index);
    }
  };

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={css.container}
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <div
            className={classNames(
              css.paddingContainer,
              snapshot.isDragging && css.isDragging
            )}
          >
            <div className={css.header}>
              <input
                type="checkbox"
                checked={task.checked}
                onChange={handleCheckboxChange}
              />
              <div className={css.dragHere} {...provided.dragHandleProps}></div>
              <button onClick={handleDeleteClick}>
                {getTranslation("deleteTask")}
              </button>
            </div>
            <div>
              <TextareaAutosize
                className={css.textarea}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                rows={2}
                value={task.description}
                onChange={handleTextareaChange}
              />
            </div>
            <div
              {...provided.dragHandleProps}
              className={css.bottomDragHere}
            ></div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
