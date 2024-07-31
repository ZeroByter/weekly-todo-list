import { FC } from "react";
import css from "./task.module.scss";
import TextareaAutosize from "react-autosize-textarea";

const Task: FC = () => {
  return (
    <div className={css.container}>
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
  );
};

export default Task;
