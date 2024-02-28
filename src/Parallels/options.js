/** @class */
export class RunnerOptions {
  constructor() {
    this.ms_timeouts = null;
    this.priority = 0;
  }

  /**
   * @method
   * @param {Number} msTimeout
   */
  setTimeout(msTimeout) {
    this.ms_timeouts = [msTimeout];
  }

  /**
   * @method
   * @param {Array<Number>} msTimeouts
   */
  setTimeouts(msTimeouts) {
    this.ms_timeouts = msTimeouts;
  }

  setHighPriority() {
    this.priority = 1;
  }

  setLowPriority() {
    this.priority = 0;
  }
}
