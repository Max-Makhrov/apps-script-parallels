<script>
  import { fly } from "svelte/transition";
  export let duration = 200;
  export let visible = true;
</script>

{#if visible}
  <div style="overflow-x: hidden">
    <div in:fly={{ x: 100, duration }}>
      <slot />
    </div>
  </div>
{/if}
