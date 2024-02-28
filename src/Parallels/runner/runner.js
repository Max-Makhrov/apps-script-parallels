/** @typedef {import("../tasks/task").Task} Task */
import { RunnerOptions } from "../options";

import { retry, timeOutErrorText } from "./retry";

/**
 * @param {Task} task
 * @param {RunnerOptions} [options]
 */
export async function runTask(task, options) {
  options = options || new RunnerOptions();
  task.markStarted();
  try {
    await retry(task, options.ms_timeouts);
  } catch (error) {
    if (error === timeOutErrorText) {
      task.markTimedout();
      return;
    }
    task.markFailed(error);
  }
}
