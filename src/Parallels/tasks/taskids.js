import { writable, get } from "svelte/store";

const id = 0;
const taskId = writable(id);

export function getTaskId() {
  const currentId = get(taskId);
  taskId.set(currentId + 1);
  return currentId;
}
