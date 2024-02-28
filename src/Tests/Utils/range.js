import { isUndefined } from "./datatypes";
/**
 * @typedef {Object} Grid
 * @property {Number} startRowIndex
 * @property {Number} endRowIndex
 * @property {Number} startColumnIndex
 * @property {Number} endColumnIndex
 * @property {Number} [width] - Optional: The width of the grid.
 * @property {Number} [height] - Optional: The height of the grid.
 */

/**
 *
 * @param {Grid} grid
 * @param {Array<Array>} data
 *
 * @returns {Array<Array>} data
 */
export function extractDataByGrid(grid, data) {
  var result = [],
    row = [];
  for (var i = grid.startRowIndex; i < grid.endRowIndex; i++) {
    row = [];
    for (var ii = grid.startColumnIndex; ii < grid.endColumnIndex; ii++) {
      row.push(data[i][ii]);
    }
    result.push(row);
  }
  return result;
}

/**
 *
 * @param {Grid} grid
 */
export function setGridDimentions(grid) {
  grid.width = grid.endColumnIndex - grid.startColumnIndex;
  grid.height = grid.endRowIndex - grid.startRowIndex;
}

/**
 *
 * tries to split grid by even number of parts
 * if numParts is not even, the script will chose smaller number
 * the script will respect range ratios and try to create square parts
 *
 * @param {String} rangeA1
 * @param {Number} numParts
 *
 * @returns {Array} [[rangeA1]]
 */
export function splitGridToSquares(rangeA1, numParts) {
  if (numParts < 0) return [rangeA1];
  numParts = Math.round(numParts);
  if (numParts % 2 !== 0) {
    numParts--;
  }
  const grid = convA1NotationToGridRange(rangeA1);
  const grid_w = grid.endColumnIndex - grid.startColumnIndex;
  const grig_h = grid.endRowIndex - grid.startRowIndex;

  let grids = splitGrid_(grig_h, grid_w, numParts);
  return grids;
}

/**
 * Function to split a grid into sub-grids
 * @param {number} h - The height of the grid
 * @param {number} w - The width of the grid
 * @param {number} n - The number of sub-grids
 * @returns {Array} - An array of sub-grids with their row index, column index, width, and height
 */
function splitGrid_(h, w, n) {
  // Calculate the dimensions of the sub-grids
  const ratio = h / w;
  let subGridHeight = Math.floor(h / Math.sqrt(n) / ratio);
  let subGridWidth = Math.floor((w / Math.sqrt(n)) * ratio);

  // Adjust the dimensions if the grid cannot be evenly divided
  if (h % Math.sqrt(n) !== 0) subGridHeight++;
  if (w % Math.sqrt(n) !== 0) subGridWidth++;

  let subGrids = [],
    subGridsRow = [];

  // Create the sub-grids
  for (let i = 0; i < h; i += subGridHeight) {
    subGridsRow = [];
    for (let j = 0; j < w; j += subGridWidth) {
      subGridsRow.push({
        startRowIndex: i,
        startColumnIndex: j,
        endRowIndex: i + Math.min(subGridHeight, h - i),
        endColumnIndex: j + Math.min(subGridWidth, w - j),
      });
    }
    subGrids.push(subGridsRow);
  }

  return subGrids;
}

/**
 * Converting a1Notation to gridrange.
 * Ref: https://gist.github.com/tanaikech/95c7cd650837f33a564babcaf013cae0
 * @param {String} a1Notation
 * @param {String} sheetName
 * @returns {Grid} Gridrange

 */
export function convA1NotationToGridRange(a1Notation, sheetName = "") {
  const { col, row } = a1Notation
    .toUpperCase()
    .split("!")
    .map((f) => f.split(":"))
    .pop()
    .reduce(
      (o, g) => {
        var [r1, r2] = ["[A-Z]+", "[0-9]+"].map((h) => g.match(new RegExp(h)));
        o.col.push(r1 && columnLetterToIndex_(r1[0]));
        o.row.push(r2 && Number(r2[0]));
        return o;
      },
      { col: [], row: [] }
    );
  col.sort((a, b) => (a > b ? 1 : -1));
  row.sort((a, b) => (a > b ? 1 : -1));
  const [start, end] = col.map((e, i) => ({ col: e, row: row[i] }));
  const gridrange = {
    startRowIndex: start?.row && start.row - 1,
    endRowIndex: end?.row ? end.row : start.row,
    startColumnIndex: start && start.col,
    endColumnIndex: end ? end.col + 1 : start.col + 1,
  };
  if (gridrange.startRowIndex === null) {
    gridrange.startRowIndex = 0;
    delete gridrange.endRowIndex;
  }
  if (gridrange.startColumnIndex === null) {
    gridrange.startColumnIndex = 0;
    delete gridrange.endColumnIndex;
  }
  if (sheetName !== "") {
    gridrange.sheetName = sheetName;
  }
  return gridrange;
}

/**
 * Converting gridrange to a1Notation.
 * Ref: https://gist.github.com/tanaikech/95c7cd650837f33a564babcaf013cae0
 * @param {Object} gridrange Gridrange of range.
 * @param {Boolean} isAbsolute - true to convert A1 to $A$1
 * @returns {String} A1Notation.
 */
export function convGridRangeToA1Notation(gridrange, isAbsolute = false) {
  if (!gridrange) {
    throw "gridrange is required parameter";
  }
  let { startRowIndex, endRowIndex, startColumnIndex, endColumnIndex } =
    gridrange;

  // start and end row indesex by default - 1 cell
  if (isUndefined(endRowIndex)) {
    endRowIndex = startRowIndex + 1;
  }
  if (isUndefined(endColumnIndex)) {
    endColumnIndex = startColumnIndex + 1;
  }

  var dollar = "";
  if (isAbsolute) dollar = "$";
  const start = {};
  const end = {};
  if (!isUndefined(startColumnIndex)) {
    start.col = columnIndexToLetter_(startColumnIndex);
  } else if (isUndefined(startColumnIndex) && !isUndefined(endColumnIndex)) {
    start.col = "A";
  }
  if (!isUndefined(startRowIndex)) {
    start.row = startRowIndex + 1;
  } else if (isUndefined(startRowIndex) && !isUndefined(endRowIndex)) {
    start.row = endRowIndex;
  }

  end.col = columnIndexToLetter_(endColumnIndex - 1);

  end.row = endRowIndex;
  start.col = dollar + start.col;
  start.row = dollar + start.row;
  end.col = dollar + end.col;
  end.row = dollar + end.row;

  const k = ["col", "row"];
  const st = k.map((e) => start[e]).join("");
  const en = k.map((e) => end[e]).join("");
  const a1Notation = st == en ? st : `${st}:${en}`;
  return a1Notation;
}

/**
 * Converting colum letter to column index. Start of column index is 0.
 * @param {String} letter Column letter.
 * @return {Number} Column index.
 */
function columnLetterToIndex_(letter = null) {
  letter = letter.toUpperCase();
  return [...letter].reduce(
    (c, e, i, a) =>
      (c += (e.charCodeAt(0) - 64) * Math.pow(26, a.length - i - 1)),
    -1
  );
}

/**
 * Converting colum index to column letter. Start of column index is 0.
 * Ref: https://stackoverflow.com/a/53678158
 * @param {Number} index Column index.
 * @return {String} Column letter.
 */
function columnIndexToLetter_(index = null) {
  var a;
  return (a = Math.floor(index / 26)) >= 0
    ? columnIndexToLetter_(a - 1) + String.fromCharCode(65 + (index % 26))
    : "";
}
