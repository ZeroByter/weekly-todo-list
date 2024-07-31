import { ChangeEvent, FC } from "react";
import css from "./task.module.scss";
import TextareaAutosize from "react-autosize-textarea";
import { Draggable } from "@hello-pangea/dnd";
import TaskType from "../types/task";
import { TaskListName, useTasksData } from "./contexts/tasks";

type Props = {
  listName: TaskListName,
  task: TaskType;
  index: number;
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  ...draggableStyle
})

const Task: FC<Props> = ({ listName, task, index }) => {
  const { setTask } = useTasksData();

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    task.checked = e.target.checked

    setTask(listName, index, task)
  }

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    task.description = e.target.value

    setTask(listName, index, task)
  }

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>{(provided, snapshot) => (
      <div className={css.container} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
        <div className={css.paddingContainer}>
          <div className={css.header}>
            <input type="checkbox" checked={task.checked} onChange={handleCheckboxChange} />
            <button>delete</button>
          </div>
          <div>
            <TextareaAutosize
              className={css.textarea}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              rows={3}
              value={task.description}
              onChange={handleTextareaChange}
            />
          </div>
        </div>
      </div>
    )}</Draggable>
  );
};

export default Task;
