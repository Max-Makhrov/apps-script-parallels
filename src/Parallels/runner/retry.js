/** @typedef {import("../tasks/task").Task} Task */
export const timeOutErrorText = "Timeout";
/**
 * @param {Task} task
 * @param {Array<Number>} [ms_timeouts]
 *
 * @returns {Promise}
 */
export async function retry(task, ms_timeouts) {
  ms_timeouts = ms_timeouts || [0];
  const func = task.func;
  let result;
  let ms_timeout = 0; // 0 means no timeout
  const numTries = ms_timeouts.length;
  for (let i = 0; i < numTries; i++) {
    try {
      ms_timeout = ms_timeouts[i];
      task.addTries(); // update task info
      if (ms_timeout) {
        const timeout = new Promise((resolve, reject) =>
          setTimeout(reject, ms_timeout, timeOutErrorText)
        );
        result = await Promise.race([func(), timeout]);
      } else {
        result = await func();
      }
      break;
    } catch (error) {
      console.log(`${ms_timeout} ms, #${i + 1}/${numTries} failed.`);
      if (i === numTries - 1) throw error;
    }
  }
  task.markEnded(result);
  return result;
}
