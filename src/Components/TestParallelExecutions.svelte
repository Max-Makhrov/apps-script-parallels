<script>
  import PixelPainting from "./PixelPainting.svelte";
  import { onMount } from "svelte";
  import { runGas, getTask } from "../gas";
  import { limit } from "../Utils/parallels";

  const paintingData = {
    ssId: "1tS0HIxwHLL_4MKYmc-wRXl3Msb4zV13V6jX7NnWFCu8",
    sheetName: "Image1Colors",
    rangeAddress: "A1:FC240",
  };
  // painting svelte component is binded to this variable
  let painting;
  // list of range A1 notations: ['A1:AA18', 'AB1:BB18', 'BC1:CC18', 'CD1:DD18', ...]
  let a1Ranges = [];
  // list of dummy values to run function locally
  let mockResultValues = [];

  /**
   * @typedef {import('../gas').TaskOptions} TaskOptions
   */
  /** @type {TaskOptions} */
  let options;

  /**
   * creates an array of functions for reading Sheets data
   */
  let tasks = [];
  function createArrayOfGasExecutions() {
    if (!painting) return;
    a1Ranges = painting.a1Ranges;
    mockResultValues = painting.mockResultValues;
    for (let i = 0; i < a1Ranges.length; i++) {
      // tasks.push(getGasDelayedTask("getRangeValues", i));
      options = {
        functionName: "getRangeValues",
        args: [paintingData.ssId, paintingData.sheetName, a1Ranges[i]],
        dummyReturn: mockResultValues[i],
        reject: (err) => console.log(err),
        resolve: (result) => painting.paintSquare(i, result),
      };
      tasks.push(getTask(options));
    }
  }

  // /**
  //  *
  //  * @param {String} functionName
  //  * @param {Number} index
  //  *
  //  * @returns {Function}
  //  */
  // function getGasDelayedTask(functionName, index) {
  //   var plannedExecution = async () => {
  //     let colors = [];
  //     try {
  //       colors = await runGas(
  //         // Apps Script Function name
  //         functionName,
  //         // Dummy result returned in the local enviroment
  //         mockResultValues[index],
  //         // Argument for GAS function
  //         paintingData.ssId,
  //         paintingData.sheetName,
  //         a1Ranges[index]
  //       );
  //     } catch (err) {
  //       console.log(err);
  //     }
  //     painting.paintSquare(index, colors);
  //     return `Painting part #${index + 1} is colored!`;
  //   };
  //   return plannedExecution;
  // }

  onMount(createArrayOfGasExecutions);

  function runTasksParallel() {
    limit(tasks);
  }

  function resetPaintingColors() {
    painting.reset();
  }
</script>

<div class="block">
  <button on:click={runTasksParallel}>Paint squares</button>
  <button on:click={resetPaintingColors}>Reset Colors</button>
  <PixelPainting bind:this={painting} data={paintingData} />
</div>

<style>
  .block {
    display: block;
  }
</style>
