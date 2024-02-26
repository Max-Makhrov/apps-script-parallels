<script>
  import { quadOut } from "svelte/easing";
  import { tweened } from "svelte/motion";

  export let colorGrid = null;
  export let h = 10;
  export let w = 10;
  export let pixelSize = "3px";
  export function paintSquares() {
    paintProgress.set(0);
    paintProgress.set(100);
  }

  let grid = [];
  const n = h * w;

  const paintProgress = tweened(0, {
    duration: 150,
    easing: quadOut,
  });

  $: {
    let num2Paint = Math.ceil(($paintProgress / 100) * n);
    if ($paintProgress) paintSquare(num2Paint);
  }

  /**
   * @param {Number} index
   */
  function paintSquare(index) {
    let row = Math.ceil(index / w);
    let col = index - (row - 1) * w;
    let color = "#7e7efd";
    for (let i = 0; i < row; i++) {
      for (let ii = 0; ii < col; ii++) {
        if (colorGrid) {
          color = colorGrid[i][ii];
        }
        grid[i][ii] = color;
      }
    }
    return `Painted square #${index}`;
  }

  // Initialize the grid with empty cells
  function initializeGrid() {
    for (let i = 0; i < h; i++) {
      grid[i] = Array(w).fill("#f8f1d2");
    }
  }

  // Call the initializeGrid function to set up the initial grid
  initializeGrid();
</script>

<div
  class="grid-container"
  style="--grid-columns: {w}; --pixel-size: {pixelSize}"
>
  {#each grid as row, rowIndex}
    {#each row as cell, colIndex}
      <div class="cell" style="background-color: {cell}" />
    {/each}
  {/each}
</div>

<style>
  .grid-container {
    display: inline-grid;
    grid-template-columns: repeat(var(--grid-columns), 1fr);
    gap: 0;
  }

  .cell {
    width: var(--pixel-size);
    height: var(--pixel-size);
  }
</style>
