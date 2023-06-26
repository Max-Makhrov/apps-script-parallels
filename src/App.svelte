<script>
  import { production, runGas } from './gas'
  let name = 'World';
  async function testAppsScript() {
    try {
      name = await runGas("beep", "Dev Server", "Hello");
    } catch (err) {
      console.log(err);
    }
  }
</script>



<div class:sidebar={!production} class="wrapper">
  <p>Hello, {name}!</p>
  <button on:click={testAppsScript}>google.script.run</button>
</div>



<style>
  .wrapper {
    width: 100%;
    height: 100%;
    max-width: 300px;
  }

  /* this class only gets applied during local dev
      keeps it hugged against the right side of the window
      for easy sidebar dev */
  .sidebar {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    border: 1px solid bisque;
  }
</style>