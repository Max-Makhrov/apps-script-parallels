<script>
  import Wrapper from "../Navigation/wrapper.svelte";
  import { Q } from "@/Parallels/q";
  import { RunnerOptions } from "@/Parallels/options";
  import { getDummyTasks } from "@/Parallels/runtime/dummy";
  import Slider from "../Navigation/slider.svelte";

  const qq = new Q();
  const subscription = qq.getStore();
  const options = new RunnerOptions();

  const minMax = [1000, 3000];
  let msTimeouts = [1200, 1400, 2800];

  $: options.setTimeouts(msTimeouts);

  $: ({ running, done, timedout, total } = $subscription.info);

  let disabled = false;

  $: disabled = running > 0;

  const n = 40;
  const ithFunctionTime = () =>
    Math.round(minMax[0] + Math.random() * (minMax[1] - minMax[0]));
  const tasks = getDummyTasks(n, ithFunctionTime);

  function addRunTasks() {
    qq.addTasks(tasks);
    qq.run(options);
  }
</script>

<Wrapper>
  <h1>🎱Tries</h1>
  <p>The engine will try 3 times before timeout.</p>
  <Slider
    {disabled}
    {minMax}
    bind:value={msTimeouts[0]}
    label="Set maximum time per msTimeouts:"
  />
  <Slider {disabled} {minMax} bind:value={msTimeouts[1]} />
  <Slider {disabled} {minMax} bind:value={msTimeouts[2]} />

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
