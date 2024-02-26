import { writable, derived } from "svelte/store";
import { runTask } from "./runner/runner";
import { mapOptions } from "./engine/mapoptions";
import { RunnerOptions } from "./options";

/**  @typedef {import('./tasks/task').Task} Task */

/** @class */
class _Engine {
  constructor(limit = 30) {
    this.concurrency = limit;
    this.running = writable(0);
    this.tasks = writable([]);
    this.checker = derived([this.running, this.tasks], this.check, []);
    this.optionsMap = {};
  }

  /**
   * @method
   * @param {Number} limit
   */
  setConcurrency(limit) {
    if (limit < 1) {
      limit = 1;
    }
    limit = Math.round(limit);
    this.concurrency = limit;
  }

  /**
   * @method
   * @param {Array<Task>} tasks - The tasks to add
   * @param {RunnerOptions} [options]
   */
  addTasks(tasks, options) {
    options = options || new RunnerOptions();
    mapOptions(tasks, options, this.optionsMap);
    if (options.priority === 1) {
      this.tasks.update((value) => [...tasks, ...value]);
    } else {
      this.tasks.update((value) => [...value, ...tasks]);
    }
  }

  /**
   * @method
   * @param {Task} task - The task to run.
   */
  async runTask(task) {
    if (task.status !== "idle") {
      return;
    }

    this.running.update((value) => value + 1);

    try {
      await runTask(task, this.optionsMap[task.id]);
    } finally {
      this.running.update((value) => value - 1);
    }
  }

  /** @method */
  check = ([running, tasks]) => {
    if (tasks.length === 0) {
      return;
    }
    if (running === this.concurrency) {
      return;
    }

    // Start a new task
    const newTask = tasks.shift();
    this.runTask(newTask);
    this.tasks.set(tasks);
  };

  /** @method */
  getTasksRunning() {
    return this.running;
  }
}

const Engine = new _Engine();
Engine.checker.subscribe(() => {});
export default Engine;
export const running = Engine.getTasksRunning();
