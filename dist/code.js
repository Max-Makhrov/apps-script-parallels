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
