import { FC, ReactNode } from "react";
import { Droppable } from "@hello-pangea/dnd";
import css from "./tasks-droppable.module.scss";
import { TaskListName } from "./contexts/tasks";
import classNames from "classnames";
import getTranslation from "../translations";

type Props = {
  droppableId: TaskListName;
  children: ReactNode;
};

// const getDroppableStyle = (isDraggingOver: boolean) => ({
//   // background: isDraggingOver ? "red" : "",
//   display: "flex",
//   flexDirection: "column" as "column",
//   gap: "6px",
// })

const TasksDroppable: FC<Props> = ({ droppableId, children }) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div className={css.container}>
          <div
            className={classNames(
              css.header,
              snapshot.isDraggingOver && css.isDraggingOver
            )}
          >
            {getTranslation(`taskListName_${droppableId}`)}
          </div>
          <div
            className={classNames(
              css.list,
              snapshot.isDraggingOver && css.isDraggingOver
            )}
          >
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {children}
              {provided.placeholder}
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default TasksDroppable;
