import { statuses } from "../config/config.js";
import { getTaskId } from "./taskids";

/**
 * @typedef {Object} TaskInfo
 * @property {Function} func
 * @property {Number} [id]
 * @property {String} [status]
 * @property {Number} [pool_index]
 * @property {Number} [timeout]
 * @property {Number} [max_attempts]
 * @property {Number} [started]
 * @property {Number} [ended]
 * @property { *} [result]
 *
 * @property {Number} [tries]
 * @property {Number} [ms_timeout]
 */

/** @typedef {import('./taskgroup.js').TaskGroup} TaskGroup */

export class Task {
  #taskGroup = null;
  /**
   * Creates a new Task instance.
   * @param {TaskInfo|Function} taskInfo - Information about the task.
   * @param {TaskGroup} taskGroup - The task group to which the task belongs.
   */
  constructor(taskInfo, taskGroup) {
    /** @type {TaskInfo} */
    let taskInfoObject = null;
    if (typeof taskInfo === "function") {
      this.func = taskInfo;
    } else {
      taskInfoObject = taskInfo;
      Object.assign(this, taskInfo);
    }
    this.tries = taskInfoObject?.max_attempts || 0;
    this.ms_timeout = taskInfoObject?.ms_timeout || 0;
    if (!this.func) {
      throw new Error("Task must have a function");
    }
    this.id = getTaskId();
    this.status = statuses.idle;
    this.#taskGroup = taskGroup;
    this.#taskGroup.taskAdded(this);
  }

  markStarted() {
    this.#taskGroup.taskStarted();
    if (!this.isIdle()) {
      throw new Error("Task already started");
    }
    this.status = statuses.running;
    this.started = Date.now();
  }

  /**
   * Set the task result.
   * @param {*} [result] - The result to set.
   */
  markEnded(result) {
    if (this.ended) {
      throw new Error("Task already ended");
    }
    if (this.status !== statuses.running) {
      throw new Error("Task must be running to end it");
    }
    this.#taskGroup.taskEnded();
    this.status = statuses.done;
    this.ended = Date.now();
    if (result !== undefined) {
      this.result = result;
    }
  }

  markFailed(error) {
    if (this.status !== statuses.running) {
      throw new Error("Task must be running before it can fail");
    }
    this.#taskGroup.taskFailed();
    this.status = statuses.failed;
    this.ended = Date.now();
    throw error;
  }

  markTimedout() {
    if (this.status !== statuses.running) {
      throw new Error("Task must be running before it can timeout");
    }
    this.#taskGroup.taskTimedout();
    this.status = statuses.timedout;
    this.ended = Date.now();
  }

  markStopped() {
    const onldStatus = this.status;
    if (onldStatus !== statuses.idle && onldStatus !== statuses.paused) {
      return;
    }
    this.status = statuses.stopped;
    this.ended = Date.now();
    this.#taskGroup.taskStopped(onldStatus === statuses.paused);
  }

  markPaused() {
    if (this.status !== statuses.idle) {
      return;
    }
    this.status = statuses.paused;
    this.#taskGroup.taskPaused();
  }

  markIdle() {
    if (this.status !== statuses.paused) {
      return;
    }
    this.status = statuses.idle;
    this.#taskGroup.taskResumed();
  }

  addTries() {
    this.tries++;
  }

  isIdle() {
    return this.status === statuses.idle;
  }

  isEnded() {
    return [statuses.done, statuses.failed].indexOf(this.status) !== -1;
  }

  /**
   * Set the task status.
   * @param {String} status - The status to set.
   */
  setStatus(status) {
    this.status = status;
  }
}
