// Based on:
// https://maximorlov.com/parallel-tasks-with-pure-javascript

import { writable, get } from "svelte/store";

export let tasksRunning = writable(0);

/**
 * @param {Array} tasks
 * @param {Number} concurrency
 * @returns
 */
export async function limit(tasks, concurrency = 10) {
  const results = [];

  async function runTasks(tasksIterator) {
    for (const [index, task] of tasksIterator) {
      // console.log(index, "launched");
      await doTask(index, task);
    }
  }

  async function doTask(index, task) {
    tasksRunning.set(get(tasksRunning) + 1);
    results[index] = await task();
    tasksRunning.set(get(tasksRunning) - 1);
  }

  const workers = new Array(concurrency).fill(tasks.entries()).map(runTasks);

  await Promise.allSettled(workers);

  // console.log("Ended all parallel executions!", results);
  return results;
}

/**
 *
 * @param {Number} time, ms
 * @returns
 */
function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

/**
 *
 * @param {function} func
 * @param {Array} params
 * @param {Number} timeout
 */
export function getDummyTask(func, params = [], timeout = 1000) {
  let task = async () => {
    await delay(Math.random() * timeout);
    return func(...params);
  };
  return task;
}
