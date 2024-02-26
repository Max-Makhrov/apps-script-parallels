import { delay } from "./delay";

/**
 *
 * @param {function} func
 * @param {Array} [params]
 * @param {Number} [timeout]
 * @returns {Function}
 */
export function getDummyFunction(func, params = [], timeout) {
  timeout = timeout || Math.random() * 1000;
  let task = async () => {
    await delay(timeout);
    return func(...params);
  };
  return task;
}

/**
 *
 * @param {Number} howMuch
 * @param {Function} [timerFunction]
 * @returns {Array<Function>}
 */
export function getDummyTasks(howMuch, timerFunction) {
  const func = (a, b, c) => a + b + c;
  timerFunction = timerFunction || ((i) => Math.random() * 1000);
  let tasks = [],
    task,
    executionMs;
  for (let i = 0; i < howMuch; i++) {
    executionMs = timerFunction(i);
    task = getDummyFunction(func, [i, i + 1, i + 2], executionMs);
    tasks.push(task);
  }
  return tasks;
}
