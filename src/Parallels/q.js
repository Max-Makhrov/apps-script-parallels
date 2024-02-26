import Engine from "./engine";
import { TaskGroup } from "./tasks/taskgroup";
import { getEngineTasks } from "./tasks/getqtasks";
import { qTasksDone } from "./tasks/qtasksdone";
/** @typedef {import("./tasks/task").TaskInfo} TaskInfo */
/** @typedef {import("./tasks/taskgroup").TaskGroupFullInfo} TaskGroupFullInfo */
/** @typedef {import("./options").RunnerOptions} RunnerOptions */

export function Q() {
  const self = this;
  self.engine = Engine;
  self.todos = [];
  self.processed = [];
  self.taskGroups = [];
  self.taskGroup = new TaskGroup();
  self.taskGroup.getStore().subscribe(_onTaskGroupChanged);

  self.addTasks = function (tasks) {
    let engineTasks = getEngineTasks(tasks, self.taskGroup);
    self.todos = self.todos.concat(engineTasks);
  };

  self.getStore = function () {
    return self.taskGroup.getStore();
  };

  /** @param {RunnerOptions} [options] */
  self.run = function (options) {
    self.processed.forEach((task) => task.markIdle());
    const idleTasks = self.processed.filter((task) => task.isIdle());
    self.todos = idleTasks.concat(self.todos);
    self.engine.addTasks(self.todos, options);
    self.processed = self.processed.concat(self.todos);
    self.todos = [];
  };

  self.pause = function () {
    self.processed.forEach((task) => task.markPaused());
  };

  self.stop = function () {
    self.processed.forEach((task) => task.markStopped());
  };

  function _onTaskGroupChanged(taskGroup) {
    if (!qTasksDone(taskGroup)) {
      return;
    }
    // TODO => end execution routines
    // console.log("🍎All tasks ended, done = " + taskGroup.info.done);
  }
}
