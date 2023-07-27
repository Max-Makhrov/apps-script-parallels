<script>
  import { production } from "./gas";
  import TestParallelExecutions from "./Components/TestParallelExecutions.svelte";
</script>

<div class:sidebar={!production} class="wrapper">
  <div class="content">
    <TestParallelExecutions />
  </div>
</div>

<style>
  .wrapper {
    overflow-x: auto;
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

  .content {
    padding: 15px;
    display: flex;
  }
</style>
