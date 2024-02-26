<script>
  import Wrapper from "../Navigation/wrapper.svelte";
  import Slider from "../Navigation/slider.svelte";

  // parallels
  import { Q } from "@/Parallels/q";
  import { getDummyTasks } from "@/Parallels/runtime/dummy";
  import Engine from "@/Parallels/engine";

  const qq = new Q();
  const subscription = qq.getStore();
  $: ({ total, done, running } = $subscription.info);

  let limit = 30;
  // Note: the limit will work globally, for all modules
  $: Engine.setConcurrency(limit);
  $: if (running === 0) limit = 30; // reset the limit

  const tasks = getDummyTasks(80, () => Math.random() * 1200);
  function handleButtonClick() {
    qq.addTasks(tasks);
    qq.run();
  }
</script>

<Wrapper>
  <h1>🪜Limit</h1>
  <p>In Apps Script recommended limit is 30, but you can play with it:</p>
  <Slider minMax={[10, 50]} label="Set the limit" bind:value={limit} />
  <div class="button-group">
    <button on:click={handleButtonClick}
      >Press the button and watch the speed</button
    >
  </div>
  <pre>{JSON.stringify({ total, "👆🏼running": running, done }, null, 2)}
  </pre>
</Wrapper>

<style>
  .button-group {
    margin: 15px;
    margin-left: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
