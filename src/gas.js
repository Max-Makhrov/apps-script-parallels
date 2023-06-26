export let production = window.hasOwnProperty('google');

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
  const minDelay = 500; // Minimum delay in milliseconds
  const maxDelay = 1500; // Maximum delay in milliseconds
  const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay; 
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockResults);
    }, delay);
  }); 
}