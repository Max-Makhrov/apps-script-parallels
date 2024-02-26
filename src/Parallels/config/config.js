import { Enum } from "./enum";

export const statuses = Enum({
  idle: "idle",
  running: "running",
  paused: "paused",
  stopped: "stopped",
  done: "done",
  failed: "failed",
  timedout: "timedout",
});
