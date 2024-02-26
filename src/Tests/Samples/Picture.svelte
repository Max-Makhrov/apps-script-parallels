<script>
  // visual
  import Wrapper from "../Navigation/wrapper.svelte";
  import PixelPainting from "../PixelPainting/Painting.svelte";
  import { getPictureDemoRunOptions_, paintingData } from "../Stores/picture";
  import { docstore } from "../PixelPainting/pixeldoc";

  // "Parallel" executions
  import { getDummyFunction } from "@/Parallels/runtime/dummy";
  import { Q } from "@/Parallels/q";
  import { running } from "@/Parallels/engine";

  /** @type {Object}*/
  const qq = new Q();

  let showPainting = false;
  let isDisabled = true;
  setTimeout(() => {
    showPainting = true; // for loading image visually
    isDisabled = false;
  }, 200);
  let docpainting;
  let colors = null;
  let label = "Run";
  function switchTask() {
    if (label === "Run") {
      isDisabled = true;
      run();
      isDisabled = false;
      label = "Reset";
    } else {
      reset();
      label = "Run";
    }
  }
  function run() {
    if (!colors) colors = getPictureDemoRunOptions_(docpainting);
    let task,
      tasks = [];
    for (var i = 0; i < colors.length; i++) {
      task = getDummyFunction(docpainting.paintSquare, [i, colors[i]]);
      tasks.push(task);
    }
    qq.addTasks(tasks);
    // 🧐↓ adding and running tasks
    qq.run();
  }
  async function reset() {
    isDisabled = true;
    await docpainting.reset();
    isDisabled = false;
  }
</script>

<Wrapper>
  <h1>🖼️Visual Demo</h1>
  <div class="painting-container">
    <button disabled={isDisabled} on:click={switchTask}>{label}</button>
    {#if !showPainting || !$docstore}
      <p>⌛Loading...</p>
    {:else}
      <p>Running {$running} tasks</p>
      <PixelPainting bind:this={docpainting} data={paintingData} />
    {/if}
  </div>
</Wrapper>
