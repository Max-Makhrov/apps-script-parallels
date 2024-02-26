import { writable } from "svelte/store";
import { screens } from "./screen";

let mainMenuOptions = [];
let subMenusOptions = {};

/**
 * @typedef {Object} SelectItem
 * @prop {String} id
 * @prop {String} label
 */

/**
 *
 * @param {Object} obj
 * @returns {Array<SelectItem>}
 */
function _getSubmenu(obj) {
  let submenu = [];
  for (let k in obj) {
    submenu.push({
      id: k,
      label: obj[k],
    });
  }
  return submenu;
}
/** @type SelectItem */
let mainMenuItem = null;
for (const key in screens) {
  mainMenuItem = {
    id: key,
    label: key,
  };
  mainMenuOptions.push(mainMenuItem);
  subMenusOptions[key] = _getSubmenu(screens[key]);
}

export let mainSelected = writable(mainMenuOptions[0]);
export let mainOptions = writable(mainMenuOptions);
export let subOptions = writable(subMenusOptions);

export function setSelectedMainItem(itemId) {
  const newSelected = mainMenuOptions.find((option) => option.id === itemId);
  mainSelected.set(newSelected);
}
