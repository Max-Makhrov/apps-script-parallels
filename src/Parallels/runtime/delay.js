/**
 *
 * @param {Number} time, ms
 * @returns
 */
export function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
