<script>
  import { setSelectedMainItem } from "../Stores/menus";
  import Wrapper from "../Navigation/wrapper.svelte";
  function showScreen() {
    setSelectedMainItem("Runtime");
  }
</script>

<Wrapper>
  <h1>👋🏼Welcome!</h1>
  <p>
    You are in the demo of concurrent executions. This demo was built and can be
    modified using the Svelte framework.
  </p>
  <p>The demo shows the engine executing 30 tasks in "parallel."</p>
  <ul>
    <li>Speed up your Apps Script tasks,</li>
    <li>Bypass maximum execution time,</li>
    <li>Control and set beck-end tasks with a queue.</li>
    <li>And more...</li>
  </ul>

  <button on:click={showScreen}> Show me example</button>
</Wrapper>
