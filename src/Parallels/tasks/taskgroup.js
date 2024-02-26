import { writable } from "svelte/store";
/** @typedef {import("./task").TaskInfo} TaskInfo */

/** @typedef {Object} TaskGroupFullInfo
 * @property {TaskGroupInfo} info
 * @property {Array<TaskInfo>} tasks
 */

/**
 * @typedef {Object} TaskGroupInfo
 * @property {number} total
 * @property {number} done
 * @property {number} running
 * @property {number} paused
 * @property {number} stopped
 * @property {number} failed
 * @property {number} timedout
 */

export class TaskGroup {
  constructor() {
    this.total = 0;
    this.done = 0;
    this.running = 0;
    this.paused = 0;
    this.stopped = 0;
    this.failed = 0;
    this.timedout = 0;
    this.invoker = null;
    this.store = _getTasksGroupStore();
    this.tasks = [];
  }

  /** @param {TaskInfo} taskInfo */
  taskAdded(taskInfo) {
    this.total++;
    this.tasks.push(taskInfo);
    this.updateStore("taskAdded");
  }

  taskStarted() {
    this.running++;
    this.updateStore("taskStarted");
  }

  taskPaused() {
    this.paused++;
    this.updateStore("taskPaused");
  }

  /** @param {Boolean} isPaused */
  taskStopped(isPaused) {
    if (isPaused) {
      this.paused--;
    }
    this.stopped++;
    this.updateStore("taskStopped");
  }

  taskResumed() {
    this.paused--;
    this.updateStore("taskResumed");
  }

  taskFailed() {
    this.failed++;
    this.running--;
    this.updateStore("taskFailed");
  }

  taskTimedout() {
    this.timedout++;
    this.running--;
    this.updateStore("taskTimedOut");
  }

  taskEnded() {
    this.done++;
    this.running--;
    if (this.done + this.failed + this.running > this.total) {
      throw new Error("Processed tasks cannot be greater than total tasks");
    }
    if (this.running < 0) {
      throw new Error("Running tasks cannot be less than zero");
    }
    this.updateStore("taskEnded");
  }

  /** @param {String} invoker */
  updateStore(invoker) {
    this.invoker = invoker;
    this.store.set(this.getState());
  }

  getStore() {
    return this.store;
  }

  getState() {
    return {
      info: {
        total: this.total,
        done: this.done,
        failed: this.failed,
        running: this.running,
        paused: this.paused,
        stopped: this.stopped,
        invoker: this.invoker,
        timedout: this.timedout,
      },
      tasks: this.tasks,
    };
  }
}

function _getTasksGroupStore() {
  /** @type TaskGroupFullInfo */
  const initialTaskGroup = {
    info: {
      total: 0,
      done: 0,
      running: 0,
      paused: 0,
      stopped: 0,
      failed: 0,
      timedout: 0,
    },
    tasks: [],
  };
  const taskGroupStore = writable(initialTaskGroup);
  return taskGroupStore;
}
