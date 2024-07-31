import { FC } from "react"
import css from "./header.module.scss"
import { useTasksData } from "./contexts/tasks"
import { randomId } from "../utils"
import { useAppState } from "./contexts/app-state"

const Header: FC = () => {
  const { addTask } = useTasksData()
  const { isWeekDaysOpen, setIsWeekDaysOpen } = useAppState()

  const handleOpenWeekDays = () => {
    setIsWeekDaysOpen(!isWeekDaysOpen)
  }

  const handleNewTask = () => {
    addTask("main", {
      id: randomId(),
      timeCreated: Date.now(),
      timeModified: Date.now(),
      description: "",
      checked: false,
    })
  }

  return (
    <div className={css.container}>
      <div>Daily Todo List</div>
      <div><button onClick={handleNewTask}>New task</button></div>
      {/* <div className={css.spacer}></div>
      <div><button onClick={handleOpenWeekDays}>view week</button></div> */}
    </div>
  )
}

export default Header
