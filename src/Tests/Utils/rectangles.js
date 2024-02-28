/**
 *
 * @param {Number} h
 * @param {Number} w
 * @param {String} value
 *
 * @returns {Array<Array<*>>}
 */
export function getFilledRectangle(h, w, value) {
  const array = [];
  for (let i = 0; i < h; i++) {
    const row = Array(w).fill(value);
    array.push(row);
  }
  return array;
}
