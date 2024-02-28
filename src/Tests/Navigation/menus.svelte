<script>
  import { mainOptions, subOptions, mainSelected } from "../Stores/menus";
  import { activeScreen } from "../Stores/screen";
  import Options from "./options.svelte";

  let selectedSubMenu;
  let subOptionsToSelect = [];
  $: _updateSubNenuOptions($mainSelected.id);
  $: activeScreen.set(selectedSubMenu.label);

  function _updateSubNenuOptions(mainId) {
    subOptionsToSelect = $subOptions[mainId];
    selectedSubMenu = subOptionsToSelect[0];
  }
</script>

<div class="grid-container">
  <div class="grid-item">
    <Options bind:options={$mainOptions} bind:selected={$mainSelected} />
  </div>
  <div class="grid-item">
    {#if subOptionsToSelect.length > 1}
      <Options
        bind:options={subOptionsToSelect}
        bind:selected={selectedSubMenu}
      />
    {/if}
  </div>
</div>
<hr />

<style>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Two equal columns */
    gap: 10px;
  }

  .grid-item {
    align-self: flex-start;
    justify-self: flex-start;
  }
</style>
