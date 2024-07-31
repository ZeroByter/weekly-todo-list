import React from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Task from "./components/task";
import TasksDroppable from "./components/tasks-droppable";
import TaskType from "./types/task";
import { TaskListName, useTasksData } from "./components/contexts/tasks";
import Header from "./components/header";
import { moveTask, reorderTask } from "./dnd-utils";
import WeekDaysContainer from "./components/week-view/container";
import css from "./app.module.scss"

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
    return <Task key={task.id} listName="main" task={task} index={index} />
  })

  const renderDays = []

  for (let i = 0; i < 7; i++) {
    const stringId = `${i}` as TaskListName

    const renderMainTasks = getTasks(stringId).map((task, index) => {
      return <Task key={task.id} listName={stringId} task={task} index={index} />
    })

    renderDays.push(
      <TasksDroppable key={i} droppableId={stringId}>
        {renderMainTasks}
      </TasksDroppable>
    )
  }

  return (
    <div className={css.container}>
      <Header />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={css.list}>
          <TasksDroppable droppableId="main">
            {renderMainTasks}
          </TasksDroppable>
          {renderDays}
        </div>
        {/* <WeekDaysContainer /> */}
      </DragDropContext>
    </div>
  );
}

export default App;
