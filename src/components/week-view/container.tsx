import { FC } from "react"
import css from "./container.module.scss"
import { useAppState } from "../contexts/app-state"
import classNames from "classnames"
import TasksDroppable from "../tasks-droppable"
import { useTasksData, TaskListName } from "../contexts/tasks"
import Task from "../task"

const WeekDaysContainer: FC = () => {
  const { isWeekDaysOpen, setIsWeekDaysOpen } = useAppState()
  const { getTasks } = useTasksData();

  const handleCloseWeek = () => {
    setIsWeekDaysOpen(!isWeekDaysOpen)
  }

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
    <div className={classNames(css.container, isWeekDaysOpen && css.open)}>
      <div className={css.buttons}>
        <div className={css.spacer}></div>
        <div><button onClick={handleCloseWeek}>close week</button></div>
      </div>
      <div className={css.days}>{renderDays}</div>
    </div>
  )
}

export default WeekDaysContainer
