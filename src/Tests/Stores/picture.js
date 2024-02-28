import { extractDataByGrid } from "../Utils/range";
import { docstore } from "../PixelPainting/pixeldoc";
import { get } from "svelte/store";
/** @typedef {import('../Utils/range').Grid} Grid */

/**
 * @param {Object} painting
 *
 * @returns {Array<Array>} square_colors
 */
export function getPictureDemoRunOptions_(painting) {
  const gridsArray = painting.getOptions().gridsArray;
  /** @type Grid */
  let grid;
  const squareColors = [];
  for (var i = 0; i < gridsArray.length; i++) {
    grid = gridsArray[i];
    squareColors.push(extractDataByGrid(grid, get(docstore).pixels));
  }
  return squareColors;
}

export const paintingData = { rangeAddress: "A1:IF240" }; // for image size
