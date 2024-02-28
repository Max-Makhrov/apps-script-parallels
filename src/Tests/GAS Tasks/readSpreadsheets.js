/** @typedef {import('@/gas').TaskOptions} TaskOptions */
import { getTask } from "@/gas";

// task is read data from Spreadsheets
export const readSheetsTasks = [];
/** Adds task in a loop
 * @param {String} spreadsheetId
 */
function _addTask(spreadsheetId) {
  /** @type TaskOptions*/
  const options = {
    args: [spreadsheetId],
    functionName: "getSpreadsheetData", // real GAS function
    dummyReturn: JSON.stringify([[spreadsheetId]]), // similar to function return
  };
  const task = getTask(options);
  readSheetsTasks.push(task);
}
const spreadsheetIds = [
  "1B__K19JEtc25S8X9Nx0ghiWDgTglb6uJ3O2Z8TpXJUY",
  "1FBAzb9TaV1wI0M6XV1M0a4uYcHT-7eT00RXDPoSYD4M",
  "1H6ugXYHN9Mk3oRsChv_JtDp7w3c3VqI8LWCY72ky5oM",
  "1qkv32xjcZrZ401FWYP58wKaPcg2VnjCk6iFOEH0E4bc",
  "16jA_ZegsZQC50ueC0dMKzyZ_zQeygY2a3fBCVb8EH6o",
  "18IkmJA1hOP8XsKJhwa0-HcAuD2Yic-WeeaacPVQ2I7g",
  "1R7nGzT3tK0R2weJysJKhF3suHCdM1g90V-HIjVantng",
  "1XAkHLq4ak4zH73VN13f8WiOKn8As81vca7yqJVsB0C4",
  "1gRaWX8sY-ei0uCSDYIMZsumY8ax5NauNcXeF0CAVnRo",
  "1-ZJNKqny6Ge180hSDFztcuW9H-KDIuiJZX-ImR1FhcU",
  "1AGt9DrAlMKp-_71nNkruItzly1CcfcBPF9SR1_FOfCo",
  "1DYeZmUIosEGUJBK5h6JqVjzyJ-7eVldzjcfRoRLnqlE",
  "1n7g2P0dlZxXIJTFgSgLsvG12LHSmFjHSZGcyirDP0JU",
  "1nx1qGgMpOybosMz3RARyWGLbtuD0fs7rEaJYPPulHro",
  "1ioyLMh-yzNrk8HVo6T1FG_GYqtQaE6qkTkdny1r9mSE",
  "1WU1ICn-o0BloQ8uOL7RvSTGNIiSTFJGEZKjvjzRva9M",
  "1U2NYukVwTli-apClSu2cNPINxPNAsFwRQoCaiMLbYHY",
  "1bYj-_6bv-spvqg3UjXLrOV-jvwTJ_F4SyleQKwLgURU",
  "1f3IIHt3S75x2U5Mph-8vOHd3JLXVdrYD0UftYdbxEgw",
  "1nZlX5WB3dPV-Wj_-SvoHkJqNZK--KAp-5D1aH5r0x8g",
  "1C-S39DnQOo6YY5Wy7H7KbiFcbFCcNrIpCmfoxQkEsOQ",
  "1c9xPESVYBQwL76pv4BSBfm-kAZiOo1yviyC9-5kbnJE",
  "1THP0S6-bXu2EIK-HWY7MT-8KJTyYH7Yy5d3W0mSbCBU",
  "1IB8FzczQxdZAQDViTE6RzTVSUt2gDnFCybH67dDAQOQ",
  "1ou_5zX0gfFBkrVJDs_ITJGttWiRUUm8JWSFn0uelvo0",
  "1fRDamMANmAbUF1FX3jU6-VWren9kbjZxzdH4lD_-4JQ",
  "1FVDQm-Thjhak_mPs-l3BSrZ7-Zj-3FCmZjCefR72iGM",
  "1hBBSMoJDL5vyIRd3cDpgHKn_7UTkvb_mzWFaJ91QlLY",
];
spreadsheetIds.forEach(_addTask);
