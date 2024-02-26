/** @typedef {import("../tasks/task").Task} Task */
/** @typedef {import("../options").RunnerOptions} Options */
import { RunnerOptions } from "../options";

/**
 * @param {Array<Task>} tasks
 * @param {Options} options
 * @param {Object} [map]
 *
 * @returns {Object}
 */
export function mapOptions(tasks, options, map = {}) {
  options = options || new RunnerOptions();
  const _assignTask = (task) => {
    map[task.id] = options;
  };
  tasks.forEach(_assignTask);
  return map;
}
