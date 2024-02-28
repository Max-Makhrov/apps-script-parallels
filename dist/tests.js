/**
 * @param {String} ssId
 * @returns {Array<Array>} data
 */
function getSpreadsheetData(ssId) {
  var ss = SpreadsheetApp.openById(ssId);
  var sheets = ss.getSheets();
  var sheet = sheets[0];
  var data = sheet.getDataRange().getValues();
  // due to limitations have to convert to JSON
  return JSON.stringify(data);
}
