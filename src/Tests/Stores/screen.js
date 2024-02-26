import { writable } from "svelte/store";

export const screens = {
  Main: {
    welcome: "Welcome",
  },
  Runtime: {
    pause: "Pause",
    taskinfo: "Task info",
    components: "Components",
    picture: "Picture",
  },
  Options: {
    timeout: "Timeout",
    tries: "Tries",
    priority: "Priority",
  },
  Engine: {
    limit: "Limit",
    speed: "Speed",
  },
};

export let activeScreen = writable(screens.Main.welcome);
