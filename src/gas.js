export let production = window.hasOwnProperty("google");

/**
 * Function to run and test the Apps Script Locally
 * If we are in Apps Script, it will actually run "functionName"
 *
 * @param {String} functionName
 * @param {*} mockResults
 * @param {*} args
 * @returns
 */
export async function runGas(functionName, mockResults, ...args) {
  if (!production) {
    let result = mockAppsScriptExecution(mockResults);
    return result;
  }
  return new Promise((resolve, reject) => {
    // @ts-ignore
    google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)
      [functionName](...args);
  });
}

/**
 * Function mocks waiting for the server responce
 * and returning mockResults
 *
 * Used to mock google.script.run
 * @param {*} mockResults
 */
function mockAppsScriptExecution(mockResults) {
  const minDelay = 300; // Minimum delay in milliseconds
  const maxDelay = 900; // Maximum delay in milliseconds
  const delay =
    Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockResults);
    }, delay);
  });
}

/**
 * @typedef {Object} TaskOptions
 * @property {String} functionName - GAS function name
 * @property {Array} [args] - GAS function arguments
 * @property {*} [dummyReturn] - dummy value for function to return in local dev
 * @property {Function} [reject] - handle error
 * @property {Function} [resolve] - handle result
 */

/**
 * @param {TaskOptions} options
 * @returns {Function} task
 */
export function getTask(options) {
  var task = async () => {
    let result;
    let resolve = options.resolve || ((data) => {});
    let reject = options.reject || ((err) => {});
    let dymmmyReturn = options.dummyReturn || null;
    let args = options.args || [];
    try {
      result = await runGas(options.functionName, dymmmyReturn, ...args);
    } catch (err) {
      console.log(err, err.stack);
      reject(err);
    }
    resolve(result);
    return result;
  };
  return task;
}
