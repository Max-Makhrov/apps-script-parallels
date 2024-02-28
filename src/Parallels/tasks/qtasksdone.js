/** @typedef { import("./taskgroup").TaskGroupFullInfo} TaskGroupFullInfo */

/**
 * @param {TaskGroupFullInfo} groupInfo
 *
 * @returns {boolean}
 */
export function qTasksDone(groupInfo) {
  if (groupInfo.info.running > 0) return false;
  const totalTasks = groupInfo.info.total;
  const endedTasks = _getEndedTasks(groupInfo);
  if (totalTasks === undefined) return false;
  if (endedTasks === undefined) return false;
  if (endedTasks === 0) return false;
  if (totalTasks !== endedTasks) return false;
  return true;
}

/**
 * @param {TaskGroupFullInfo} groupInfo
 * @returns {Number}
 */
function _getEndedTasks(groupInfo) {
  const doneTasks = groupInfo.info.done || 0;
  const timedOutTasks = groupInfo.info.timedout || 0;
  const failedTasks = groupInfo.info.failed || 0;
  const stoppedTasks = groupInfo.info.stopped || 0;
  return doneTasks + timedOutTasks + failedTasks + stoppedTasks;
}
