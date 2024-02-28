<script>
  import Wrapper from "../Navigation/wrapper.svelte";
  import Slider from "../Navigation/slider.svelte";

  // parallels
  import { Q } from "@/Parallels/q";
  import { RunnerOptions } from "@/Parallels/options";
  import { getDummyTasks } from "@/Parallels/runtime/dummy";

  const qq = new Q();
  const subscription = qq.getStore();
  const options = new RunnerOptions();

  let timeoutMs = 2000;
  const minMax = [1000, 3000];
  const label = "Maximum time per task, ms:";

  $: options.setTimeout(timeoutMs);

  $: ({ running, done, timedout, total } = $subscription.info);

  let disabled = false;

  $: disabled = running > 0;

  const n = 40;
  const tasks = getDummyTasks(n, (i) => i * 100);

  function addRunTasks() {
    // const tasks = getTasks_();
    qq.addTasks(tasks);
    qq.run(options);
  }
</script>

<Wrapper>
  <h1>⏳Timeout</h1>
  <Slider {disabled} {minMax} bind:value={timeoutMs} {label} />
  <button style="display:block; margin:10px;" on:click={addRunTasks}
    >Run +{n} tasks</button
  >

  <pre>{JSON.stringify(
      { running, done, "☝🏼timedout": timedout, total },
      null,
      2
    )}
  </pre>
</Wrapper>
