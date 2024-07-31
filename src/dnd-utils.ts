import { DraggableLocation } from "@hello-pangea/dnd";
import TaskType from "./types/task";

export const reorderTask = (list: TaskType[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const moveTask = (source: TaskType[], destination: TaskType[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  
  destClone.splice(droppableDestination.index, 0, removed);

  const result: {[key: string]: TaskType[]} = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
}