<script>
  import PixelGrid from "./grid.svelte";
  import { getRangePixelPintingOptions } from "./painting";

  /**
   * @typedef {Object} PaintingData
   * @property {String} [ssId]
   * @property {String} [sheetName]
   * @property {String} rangeAddress
   */
  /** @type PaintingData */
  export let data = {
    ssId: "1tS0HIxwHLL_4MKYmc-wRXl3Msb4zV13V6jX7NnWFCu8",
    sheetName: "Image1Colors",
    rangeAddress: "A1:FC240",
  };

  let visible = true;

  export function getData() {
    return data;
  }

  /**
   * @typedef {import('./painting').PaintingOptions} Options
   */
  /**  @type {Options} */
  let gridOptions = getRangePixelPintingOptions(data.rangeAddress);
  export function getOptions() {
    return gridOptions;
  }

  let children = [];

  /** @type {Array<String>} */
  export const a1Ranges = gridOptions.a1Ranges;
  export const mockResultValues = gridOptions.gridChessColors;

  /**
   * paints all squares in default color
   */
  export function reset() {
    // gridOptions.gridColors = gridOptions.gridDefaultColors;
    // children.forEach((child) => child.paintSquares());

    visible = false;

    setTimeout(() => (visible = true), 0);
    console.log("reset");
  }

  /**
   * paints 1 square in selected colors
   * @param {Number} index
   * @param {Array<Array>} [colors]
   */
  export function paintSquare(index, colors) {
    colors = colors || gridOptions.gridChessColors[index];
    gridOptions.gridColors[index] = colors;
    children[index].paintSquares();
    return `Painted square #${index}`;
  }
</script>

<div class="grid-container" style="--grid-columns: {gridOptions.squaresWidth}">
  {#if visible}
    {#each gridOptions.gridsArray as item, i}
      <PixelGrid
        bind:this={children[i]}
        w={item.width}
        h={item.height}
        pixelSize={gridOptions.pixelSize}
        bind:colorGrid={gridOptions.gridColors[i]}
      />
    {/each}
  {/if}
</div>

<style>
  .grid-container {
    display: inline-grid;
    grid-template-columns: repeat(var(--grid-columns), min-content);
    gap: 0;
  }
</style>
