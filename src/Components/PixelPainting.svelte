<script>
  import PixelGrid from "./PixelGrid.svelte";
  import { getRangePixelPintingOptions } from "./pixelpainting";

  export let data = {
    ssId: "1tS0HIxwHLL_4MKYmc-wRXl3Msb4zV13V6jX7NnWFCu8",
    sheetName: "Image1Colors",
    rangeAddress: "A1:FC240",
  };

  /**
   * @typedef {import('./pixelpainting').PaintingOptions} Options
   */
  /**  @type {Options} */
  let gridOptions = getRangePixelPintingOptions(data.rangeAddress);

  let children = [];

  /** @type {Array<String>} */
  export const a1Ranges = gridOptions.a1Ranges;
  export const mockResultValues = gridOptions.gridChessColors;

  /**
   * paints all squares in default color
   */
  export function reset() {
    gridOptions.gridColors = gridOptions.gridDefaultColors;
    children.forEach((child) => child.paintSquares());
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
  }
</script>

<div class="grid-container" style="--grid-columns: {gridOptions.squaresWidth}">
  {#each gridOptions.gridsArray as item, i}
    <PixelGrid
      bind:this={children[i]}
      w={item.width}
      h={item.height}
      pixelSize={gridOptions.pixelSize}
      bind:colorGrid={gridOptions.gridColors[i]}
    />
  {/each}
</div>

<style>
  .grid-container {
    display: inline-grid;
    grid-template-columns: repeat(var(--grid-columns), min-content);
    gap: 0;
  }
</style>
