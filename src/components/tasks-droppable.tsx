import { FC, ReactNode } from "react"
import { Droppable } from "@hello-pangea/dnd"
import css from "./tasks-droppable.module.scss"

type Props = {
    droppableId: string;
    children: ReactNode;
}

const TasksDroppable: FC<Props> = ({ droppableId, children }) => {
    return (
        <Droppable droppableId={droppableId}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className={css.container}>
                    {children}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default TasksDroppable
