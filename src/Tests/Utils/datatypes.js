export function isObject(val) {
  if (typeof val === "object" && !Array.isArray(val) && val !== null) {
    return true;
  }
  return false;
}

export function isUndefined(val) {
  return typeof val === "undefined";
}

export function isNull(value) {
  return value === null;
}

export function isArray(val) {
  Array.isArray(val);
}

export function isError(value) {
  return value instanceof Error;
}

export function isSheetsError(val) {
  var errorTexts = [
    "#NULL!",
    "#DIV/0!",
    "#VALUE!",
    "#REF!",
    "#NAME?",
    "#NUM!",
    "#N/A",
    "#ERROR!",
  ];
  return errorTexts.indexOf(val) > -1;
}

export function isString(val) {
  return typeof val === "string" || val instanceof String;
}

/**
 * param {Array[[]]} array
 */
export function isValidRangeArray(array) {
  if (!Array.isArray(array) || array.length < 1 || !Array.isArray(array[0])) {
    return false; // Array must be two-dimensional.
  }
  var numRows = array.length;
  var numCols = array[0].length;
  for (var i = 1; i < numRows; i++) {
    if (array[i].length !== numCols) {
      return false; // All rows must have the same length.
    }
  }
  return true; // Array is valid for range.
}
