<script>
  import { Q } from "@/Parallels/q";
  import { getDummyTasks } from "@/Parallels/runtime/dummy";

  const qq1 = new Q();
  const qq2 = new Q();
  const subscription = qq1.getStore();
  const subscription2 = qq2.getStore();

  const n = 100;
  function getTasks_() {
    const tasks = getDummyTasks(n);
    return tasks;
  }

  function addTasks_() {
    const tasks1 = getTasks_();
    qq1.addTasks(tasks1);
    const tasks2 = getTasks_();
    qq2.addTasks(tasks2);
  }

  function runTasks() {
    addTasks_();
    qq1.run();
    qq2.run();
  }

  $: ({ running, done } = $subscription.info);
  $: ({ running: running2, done: done2 } = $subscription2.info);
  // $: ({ tasks: tasks2 } = $subscription2);
</script>

<h2>Module 2: Two task queues</h2>
<button on:click={runTasks}>Run +{n}</button>
<p><code>{running}</code> / <code>{done}</code></p>
<p><code>{running2}</code> / <code>{done2}</code></p>
