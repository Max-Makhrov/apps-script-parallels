import {
  splitGridToSquares,
  convA1NotationToGridRange,
  convGridRangeToA1Notation,
  setGridDimentions,
} from "../Utils/range";
import { getFilledRectangle } from "../Utils/rectangles";

/**
 * @typedef {import('../Utils/range').Grid} Grid
 */
/**
 * @typedef {Object} PaintingOptions
 * @property {Number} squaresWidth
 * @property {String} pixelSize
 * @property {Array<Grid>} gridsArray
 * @property {Array} gridColors
 * @property {Array} gridDefaultColors
 * @property {Array} gridChessColors
 * @property {Array<String>} a1Ranges
 */

const max_painting_width = 300 - 15 * 2; // px
const pixels_in_square = 500;
const default_colors = {
  reset: "#f8f1d2",
  chess1: "#F4EAE7",
  chess2: "#4A648B",
};

/**
 * @param {String} rangeAddressA1
 *
 * @returns {PaintingOptions}
 */
export function getRangePixelPintingOptions(rangeAddressA1) {
  const grid = convA1NotationToGridRange(rangeAddressA1);
  const w = grid.endColumnIndex - grid.startColumnIndex;
  const h = grid.endRowIndex - grid.startRowIndex;
  const sq = h * w;
  const totalItems = Math.round(sq / pixels_in_square / 10) * 10;
  const pixelSize = max_painting_width / w + "px";

  let grids = splitGridToSquares(rangeAddressA1, totalItems);
  let gridsArray = grids.flat(1);
  gridsArray.forEach(setGridDimentions);
  let squaresWidth = grids[0].length;

  let gridColors = gridsArray.map(getChessColorGrid.bind(null, squaresWidth));
  let gridDefaultColors = gridsArray.map(getGridResetColors);

  const a1Ranges = gridsArray.map((grid) => convGridRangeToA1Notation(grid));

  return {
    squaresWidth,
    pixelSize,
    gridsArray,
    gridColors,
    gridDefaultColors,
    gridChessColors: gridColors,
    a1Ranges,
  };
}

/**
 * Represents a 2D array.
 * @typedef {Array<Array<*>>} TwoDimensionalArray
 */
/**
 *
 * @param {Number} squaresWidth
 * @param {Grid} grid
 * @param {Number} gridIndex
 *
 * @returns {TwoDimensionalArray}
 */
function getChessColorGrid(squaresWidth, grid, gridIndex) {
  let color = getChessItemColor(gridIndex, squaresWidth);
  const result = getFilledRectangle(grid.height, grid.width, color);
  return result;
}

/**
 *
 * @param {Grid} grid
 *
 * @returns {TwoDimensionalArray} colors
 */
function getGridResetColors(grid) {
  const gridColor = default_colors.reset;
  const colors = getFilledRectangle(grid.height, grid.width, gridColor);
  return colors;
}

/**
 *
 * @param {Number} i
 * @param {Number} squaresWidth
 * @returns {String} color
 */
function getChessItemColor(i, squaresWidth) {
  const row = Math.floor(i / squaresWidth);
  const col = i % squaresWidth;
  const isEvenRow = row % 2 === 0;
  const isEvenCol = col % 2 === 0;

  // Determine the color based on row and column
  if ((isEvenRow && isEvenCol) || (!isEvenRow && !isEvenCol)) {
    return default_colors.chess1;
  }
  return default_colors.chess2;
}
