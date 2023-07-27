// Apps Script (Servrer) Code goes here
// Note: we save the file as *.js here, Clasp converts it to *.gs

function onOpen(e) {
  SpreadsheetApp.getUi()
    .createAddonMenu()
    .addItem("Show sidebar", "showSidebar")
    /* more menu items if needed */
    .addToUi();
}
function onInstall(e) {
  onOpen(e);
}
function showSidebar() {
  var ui = HtmlService.createTemplateFromFile("dist/ui/index")
    .evaluate()
    .setTitle("Add-On Menu Name");
  SpreadsheetApp.getUi().showSidebar(ui);
}

/**
 * Say "Hello"
 * @param {String} message
 */
function beep(message) {
  Browser.msgBox(message);
  return "Apps Script";
}

/**
 *
 * @param {String} ssId
 * @param {String} sheetName
 * @param {String} a1Range
 */
function getRangeValues(ssId, sheetName, a1Range) {
  var ss = SpreadsheetApp.openById(ssId);
  var s = ss.getSheetByName(sheetName);
  var r = s.getRange(a1Range);
  var v = r.getValues();
  return v;
}
