<script>
  import Wrapper from "../Navigation/wrapper.svelte";
  import { Q } from "@/Parallels/q";
  import { getDummyTasks } from "@/Parallels/runtime/dummy";
  import Codebox from "../Navigation/codebox.svelte";

  const qq = new Q();
  const subscription = qq.getStore();

  let statuses = {
    running: true,
    done: false,
    idle: false,
  };

  function addTasksToRun() {
    const n = 100;
    const tasks = getDummyTasks(n, () => Math.floor(Math.random() * 2500));
    qq.addTasks(tasks);
    qq.run();
  }
</script>

<Wrapper>
  <h1>🤹🏼Task Info</h1>
  <button on:click={addTasksToRun}>Run +100 Tasks</button>
  <div class="checkbox-row">
    <label>
      <input type="checkbox" bind:checked={statuses.running} value="running" />
      Running
    </label>
    <label>
      <input type="checkbox" bind:checked={statuses.done} value="done" />
      Done
    </label>
    <label>
      <input type="checkbox" bind:checked={statuses.idle} value="waiting" />
      Waiting
    </label>
  </div>
  <Codebox
    >{JSON.stringify(
      $subscription.tasks.filter((task) => statuses[task.status]).slice(0, 100),
      null,
      2
    )}
  </Codebox>
</Wrapper>

<style>
  .checkbox-row {
    margin-top: 17px;
    margin-bottom: 17px;
    display: flex;
    gap: 12px;
  }
</style>
