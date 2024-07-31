import React from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Task from "./components/task";
import TasksDroppable from "./components/tasks-droppable";
import TaskType from "./types/task";
import { TaskListName, useTasksData } from "./components/contexts/tasks";
import Header from "./components/header";
import { moveTask, reorderTask } from "./dnd-utils";

function App() {
  const { saveCache, loadCache, getTasks, setTasksInList } = useTasksData()

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) {
      return;
    }

    const sourceId = source.droppableId as TaskListName
    const destinationId = destination.droppableId as TaskListName

    if (sourceId == destinationId) {
      const items = reorderTask(getTasks(sourceId), source.index, destination.index)
      saveCache()
      setTasksInList(sourceId, items)
      loadCache()
    } else {
      const result = moveTask(getTasks(sourceId), getTasks(destinationId), source, destination)
      saveCache()
      setTasksInList(sourceId, result[sourceId])
      setTasksInList(destinationId, result[destinationId])
      loadCache()
    }
  };

  const renderMainTasks = getTasks("main").map((task, index) => {
    return <Task key={task.id} task={task} index={index} />
  })

  return (
    <div>
      <Header />
      <DragDropContext onDragEnd={onDragEnd}>
        <TasksDroppable droppableId="main">
          {renderMainTasks}
        </TasksDroppable>
      </DragDropContext>
    </div>
  );
}

export default App;
