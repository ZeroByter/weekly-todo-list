import { FC, ReactNode } from "react"
import { Droppable } from "@hello-pangea/dnd"
import css from "./tasks-droppable.module.scss"
import { TaskListName } from "./contexts/tasks";

type Props = {
  droppableId: TaskListName;
  children: ReactNode;
}

const getDroppableStyle = (isDraggingOver: boolean) => ({
  // background: isDraggingOver ? "red" : "",
  display: "flex",
  flexDirection: "column" as "column",
  gap: "6px",
})

const droppableNameMap = {
  "main": "Main",
  "0": "Monday",
  "1": "Tuesday",
  "2": "Wednesday",
  "3": "Thursday",
  "4": "Friday",
  "5": "Saturday",
  "6": "Sunday",
}

const TasksDroppable: FC<Props> = ({ droppableId, children }) => {
  return (
    <div className={css.container}>
      <div className={css.header}>{droppableNameMap[droppableId]}</div>
      <div className={css.list}>
        <Droppable droppableId={droppableId}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {children}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  )
}

export default TasksDroppable
