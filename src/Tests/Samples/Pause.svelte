<script>
  import Wrapper from "../Navigation/wrapper.svelte";
  import { Q } from "@/Parallels/q";
  import { getDummyTasks } from "@/Parallels/runtime/dummy";

  const qq = new Q();

  const subscription = qq.getStore();
  $: ({ total, done, running, paused, stopped } = $subscription.info);

  function addTasksToRun() {
    const n = 100;
    const tasks = getDummyTasks(n, () => Math.random() * 2500);
    qq.addTasks(tasks);
  }

  addTasksToRun();
</script>

<Wrapper>
  <h1>▶️Run, Pause, Stop</h1>
  <button on:click={addTasksToRun}>+100 Tasks</button>
  <div class="button-group">
    <button on:click={() => qq.run()}>Run</button>
    <button on:click={() => qq.pause()}>Pause</button>
    <button on:click={() => qq.stop()}>Stop</button>
  </div>
  <pre>{JSON.stringify({ total, running, paused, done, stopped }, null, 2)}
  </pre>
</Wrapper>

<style>
  .button-group {
    display: flex;
    justify-content: space-between;
    margin: 15px;
  }
</style>
