import { Task } from "./task.js";

/** @typedef {import("./task").TaskInfo} TaskInfo */
/** @typedef {import("./taskgroup").TaskGroup} TaskGroup */

/**
 * @param {Array<TaskInfo|Function>} tasks
 * @param {TaskGroup} taskGroup
 *
 * @returns {Array<TaskInfo>}
 */
export function getEngineTasks(tasks, taskGroup) {
  let engineTasks = [];
  for (const task of tasks) {
    engineTasks.push(new Task(task, taskGroup));
  }
  return engineTasks;
}
