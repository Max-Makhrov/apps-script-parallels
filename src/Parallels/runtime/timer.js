import { writable } from "svelte/store";

/**
 * @param {Number} inteval - ms to update
 * @returns
 */
export function Timer(inteval = 1000) {
  let interval;
  let start;
  let elapsed = 0;
  let isRunning = false;

  const { subscribe, set } = writable(0);

  function run() {
    if (isRunning) return;
    isRunning = true;
    start = Date.now();
    clearInterval(interval);
    interval = setInterval(() => {
      const newElapsed = Date.now() - start;
      elapsed += newElapsed;
      set(elapsed);
      start = Date.now();
    }, inteval);
  }

  function pause() {
    clearInterval(interval);
    isRunning = false;
  }

  function stop() {
    clearInterval(interval);
    start = undefined;
    elapsed = 0;
    set(0);
    isRunning = false;
  }

  return { subscribe, run, pause, stop };
}
