import { FC } from "react";
import css from "./task.module.scss";
import TextareaAutosize from "react-autosize-textarea";
import { Draggable } from "@hello-pangea/dnd";
import TaskType from "../types/task";

type Props = {
  task: TaskType;
  index: number;
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  ...draggableStyle
})

const Task: FC<Props> = ({ task, index }) => {
  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>{(provided, snapshot) => (
      <div className={css.container} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
        <div className={css.header}>
          <input type="checkbox" />
          <button>delete</button>
        </div>
        <div>
          <TextareaAutosize
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            rows={3}
          />
        </div>
      </div>
    )}</Draggable>
  );
};

export default Task;
