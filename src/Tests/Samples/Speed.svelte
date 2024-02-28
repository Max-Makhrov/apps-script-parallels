<script>
  import Wrapper from "../Navigation/wrapper.svelte";
  import { Q } from "@/Parallels/q";
  import { readSheetsTasks } from "../GAS Tasks/readSpreadsheets";

  const qq = new Q();
  const subscription = qq.getStore();
  $: ({ total, done, running } = $subscription.info);

  function run() {
    if (running > 0) {
      console.log("Please wait this tasks to end...");
      return;
    }
    qq.addTasks(readSheetsTasks);
    qq.run();
  }

  let total2 = 0;
  let running2 = 0;
  let done2 = 0;
  async function run2() {
    if (running2 > 0) {
      console.log("Please wait this tasks to end...");
      return;
    }
    running2 = 1;
    total2 += readSheetsTasks.length;
    for (let i = 0; i < readSheetsTasks.length; i++) {
      await readSheetsTasks[i]();
      done2 += 1;
    }
    running2 = 0;
  }
</script>

<Wrapper>
  <h1>⏱️Compare the speed</h1>
  <p>Here we read the data from Spreadsheets.</p>
  <div>
    <div>
      <button disabled={running > 0} on:click={run}>Run 🏎️Concurrent</button>
    </div>
    <pre>{JSON.stringify({ total, running, done }, null, 2)}</pre>
    <div>
      <button disabled={running2 > 0} on:click={run2}>Run 🚜Sequential</button>
    </div>
    <pre>{JSON.stringify(
        { total: total2, running: running2, done: done2 },
        null,
        2
      )}</pre>
  </div>
</Wrapper>
