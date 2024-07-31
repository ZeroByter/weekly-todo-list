import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Task from "./components/task";

function App() {
  const onDragEnd = (result: DropResult) => {
    console.log(result);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <Task />
          <Task />
          <Task />
          <Task />
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;

//test