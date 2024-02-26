<script>
  import { Q } from "@/Parallels/q";
  import { getDummyTasks } from "@/Parallels/runtime/dummy";

  const qq = new Q();
  const subscription = qq.getStore();

  $: ({ done, running } = $subscription.info);

  const n = 40;

  function addRunTasks() {
    const tasks = getDummyTasks(n, (i) => i * 300);
    qq.addTasks(tasks);
    qq.run();
  }
</script>

<h2>Module 1: Slowing tasks</h2>
<button on:click={addRunTasks}>Run +{n}</button>
<p><code>{running}</code> / <code>{done}</code></p>
