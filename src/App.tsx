import React from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Task from "./components/task";
import TasksDroppable from "./components/tasks-droppable";
import TaskType from "./types/task";

const exampleTask: TaskType = {
  id: "memes",
  checked: false,
  description: "lol memes",
  timeCreated: 0,
  timeModified: 0,
}

function App() {
  const onDragEnd = (result: DropResult) => {
    console.log(result);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <TasksDroppable droppableId="main">
          <Task task={exampleTask} index={0} />
        </TasksDroppable>
      </DragDropContext>
    </div>
  );
}

export default App;
