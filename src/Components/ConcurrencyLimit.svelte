<script>
  import PixelPainting from "./PixelPainting/Painting.svelte";
  import { getTask } from "../gas";
  import { limit, tasksRunning } from "../Utils/parallels";

  const paintingData1 = {
    ssId: "1tS0HIxwHLL_4MKYmc-wRXl3Msb4zV13V6jX7NnWFCu8",
    sheetName: "Lion1Colors",
    rangeAddress: "A1:IF159",
  };
  const paintingData2 = {
    ssId: "1tS0HIxwHLL_4MKYmc-wRXl3Msb4zV13V6jX7NnWFCu8",
    sheetName: "Lion2Colors",
    rangeAddress: "A1:IF159",
  };
  // painting svelte component is binded to this variable
  let paintingLions1;
  let paintingLions2;

  /**
   * @typedef {import('../gas').TaskOptions} TaskOptions
   */
  /** @type {TaskOptions} */
  let options;

  /**
   *
   */

  /**
   * creates a sample array of tasks
   * each task is GAS function for reading Sheets data
   * @param {Object} painting
   * @returns {Array} tasks
   */
  function getSampleGasTasks(painting) {
    let tasks = [];
    if (!painting) return;
    let a1Ranges = painting.a1Ranges;
    let mockResultValues = painting.mockResultValues;
    let data = painting.getData();
    for (let i = 0; i < a1Ranges.length; i++) {
      // tasks.push(getGasDelayedTask("getRangeValues", i));
      options = {
        functionName: "getRangeValues",
        args: [data.ssId, data.sheetName, a1Ranges[i]],
        dummyReturn: mockResultValues[i],
        reject: (err) => console.log(err),
        resolve: (result) => painting.paintSquare(i, result),
      };
      tasks.push(getTask(options));
    }
    return tasks;
  }

  function runTasksParallel1() {
    let tasks = getSampleGasTasks(paintingLions1);
    limit(tasks);
  }

  function resetPaintingColors1() {
    paintingLions1.reset();
  }

  function runTasksParallel2() {
    let tasks = getSampleGasTasks(paintingLions2);
    limit(tasks);
  }

  function resetPaintingColors2() {
    paintingLions2.reset();
  }
</script>

<div class="block">
  <div class="painting-container">
    <button on:click={runTasksParallel1}>Paint squares</button>
    <button on:click={resetPaintingColors1}>Reset Colors</button>
    <PixelPainting bind:this={paintingLions1} data={paintingData1} />
  </div>

  <div class="painting-container">
    <button on:click={runTasksParallel2}>Paint squares</button>
    <button on:click={resetPaintingColors2}>Reset Colors</button>
    <PixelPainting bind:this={paintingLions2} data={paintingData2} />
  </div>

  <p>{$tasksRunning} tasks running</p>
</div>

<style>
  .block {
    display: block;
  }
  .painting-container {
    margin-bottom: 25px;
  }
</style>
