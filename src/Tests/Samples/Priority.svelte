<script>
  import Wrapper from "../Navigation/wrapper.svelte";
  import Switch from "../Navigation/switch.svelte";
  // parallels
  import { Q } from "@/Parallels/q";
  import { RunnerOptions } from "@/Parallels/options";
  import { getDummyTasks } from "@/Parallels/runtime/dummy";

  let isChecked = false;

  const blueOptions = new RunnerOptions();
  const yellowOptions = new RunnerOptions();
  $: {
    if (isChecked) {
      blueOptions.setHighPriority();
      yellowOptions.setLowPriority();
    } else if (!isChecked) {
      blueOptions.setLowPriority();
      yellowOptions.setHighPriority();
    }
  }

  const yellowQ = new Q();
  const blueQ = new Q();
  const yellowSubscription = yellowQ.getStore();
  const blueSubscription = blueQ.getStore();
  $: ({ running: yellowRunning } = $yellowSubscription.info);
  $: ({ running: blueRunning } = $blueSubscription.info);

  const tasks = getDummyTasks(80, () => Math.random() * 1200);
  function handleButtonClick() {
    yellowQ.addTasks(tasks);
    blueQ.addTasks(tasks);
    blueQ.run(blueOptions);
    yellowQ.run(yellowOptions);
  }
</script>

<Wrapper>
  <h1>👨🏼‍🚀Priority</h1>
  <div class="button-group">
    <Switch onText="Blue ↑" offText="Yellow ↑" bind:isChecked />
    <button on:click={handleButtonClick}>Blue → Yellow</button>
  </div>
  <table>
    <tr>
      <td>{"🟡 ".repeat(yellowRunning)}</td>
      <td>{"🔵 ".repeat(blueRunning)}</td>
    </tr>
  </table>
</Wrapper>

<style>
  table {
    width: 100%;
  }

  td {
    word-wrap: break-word;
    vertical-align: top;
    font-size: xx-large;
    line-height: 1.4;
  }

  .button-group {
    margin-right: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
