const { ELEMENT_WAIT_LONGER_TIME } = require('../core/constants');
const e = require('../core/elements');
const { expect } = require('@playwright/test');

async function startSharedNotes(test) {
  await test.waitAndClick(e.sharedNotes);
  await test.waitForSelector(e.hideNotesLabel, ELEMENT_WAIT_LONGER_TIME);
  await test.hasElement(e.etherpadFrame);
}

function getNotesLocator(test) {
  return test.page.frameLocator(e.etherpadFrame)
    .frameLocator(e.etherpadOuter)
    .frameLocator(e.etherpadInner)
    .locator(e.etherpadEditable);
}

function getShowMoreButtonLocator(test) {
  return test.page.frameLocator(e.etherpadFrame).locator(e.showMoreSharedNotesButton);
}

function getExportButtonLocator(test) {
  return test.page.frameLocator(e.etherpadFrame).locator(e.exportSharedNotesButton);
}

function getExportPlainTextLocator(test) {
  return test.page.frameLocator(e.etherpadFrame).locator(e.exportPlainButton);
}

function getMoveToWhiteboardLocator(test) {
  return test.page.locator(e.sendNotesToWhiteboard);
}

function getSharedNotesUserWithoutPermission(test) {
  return test.page.frameLocator(e.sharedNotesViewingMode)
    .locator('body');
}

exports.startSharedNotes = startSharedNotes;
exports.getNotesLocator = getNotesLocator;
exports.getShowMoreButtonLocator = getShowMoreButtonLocator;
exports.getExportButtonLocator = getExportButtonLocator;
exports.getExportPlainTextLocator = getExportPlainTextLocator;
exports.getMoveToWhiteboardLocator = getMoveToWhiteboardLocator;
exports.getSharedNotesUserWithoutPermission = getSharedNotesUserWithoutPermission;