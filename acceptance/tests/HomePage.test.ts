/// <reference path="../steps.d.ts" />

let assert = require('assert');

Feature('Home Page');

Scenario('should allow you to edit the activity and time of a image and view image in expanded view', (I) => {
  I.amOnPage('/');
  I.waitForText('TEST11', 10);
  I.click('.testId');
  I.waitForText('Mission: TEST11', 10);
  I.attachFile('#uploadButton', 'data/AcceptanceMission.pdf');
  I.wait(5);
  I.waitForText('291235ZAPR19_OP_LEPRECHAUN_PHASE_8_ACTY_STEPHEN_13_RELEASABILITY', 10);
  I.fillField('.slideCardContainer:first-of-type > .slideCard > .card > ' +
    '.row > .col-md-8 > .slidesInputs > .activityInputField > input', 'activity test');
  I.fillField('.slideCardContainer:first-of-type > .slideCard > .card > ' +
    '.row > .col-md-8 > .slidesInputs > .timeInputField > input', '1234');
  I.waitForText('291234ZAPR19_OP_LEPRECHAUN_PHASE_8_ACTIVITY_TEST_STEPHEN_13_RELEASABILITY', 10, '.card-body:first-of-type');
  I.click('.slideCard:first-of-type > .card > .row > .col-md-4 > img');
  I.waitForText('291234ZAPR19_OP_LEPRECHAUN_PHASE_8_ACTIVITY_TEST_STEPHEN_13_RELEASABILITY', 10);
  I.fillField('.carousel-item:first-of-type > .slidesInputs > .activityInputField > input', 'new activity test');
  I.fillField('.carousel-item:first-of-type > .slidesInputs > .timeInputField > input', '5678');
  I.waitForText('295678ZAPR19_OP_LEPRECHAUN_PHASE_8_NEW_ACTIVITY_TEST_STEPHEN_13_RELEASABILITY', 10);
  I.click('.exitExpand');
  I.waitForText('JPEG Renamer - Details', 10);
});

Scenario('should allow you to upload a file and display the jpgs', (I) => {
  I.amOnPage('/');
  I.waitForText('TEST11', 10);
  I.click('.testId');
  I.waitForText('Mission: TEST11', 10);
  I.click('#downloadButton');
  I.waitForText('You must upload a PDF', 10);
  I.attachFile('#uploadButton', 'data/blank.txt');
  I.waitForText('File must be a PDF', 10);
  I.attachFile('#uploadButton', 'data/AcceptanceMission.pdf');
  I.waitForText('ACCEPTANCEMISSION.PDF', 10);
  assert(I.grabValueFrom('#dateInput'), '04/29/2019');
  assert(I.grabValueFrom('#opInput'), 'OP LEPRECHAUN PHASE 8');
  assert(I.grabValueFrom('#assetInput'), 'STEPHEN 13');
  I.waitForText('291235ZAPR19_OP_LEPRECHAUN_PHASE_8_ACTY_STEPHEN_13_RELEASABILITY', 10);
  I.click('#deletePP');
  I.waitForText('Are you sure you want to delete the PDF', 10);
  I.click('.btn-primary');
  I.waitForText('PDF File Removed', 10);
  I.waitForText('Drag and drop', 10);
});

Scenario('should validate fields before download', (I) => {
  I.amOnPage('/');
  I.waitForText('TEST11', 10);
  I.click('.testId');
  I.waitForText('Mission: TEST11', 10);
  I.attachFile('#uploadButton', 'data/AcceptanceMission.pdf');
  I.waitForText('ACCEPTANCEMISSION.PDF', 10);

  I.waitForText('291235ZAPR19_OP_LEPRECHAUN_PHASE_8_ACTY_STEPHEN_13_RELEASABILITY', 10);
  I.waitForText('The callsign does not match selected mission', 5);
  I.waitForText('The releasability field must be chosen', 5);

  I.fillField('#dateInput', '05/21/2019');
  I.pressKey('Backspace');
  I.fillField('#opInput', 'd');
  I.pressKey('Backspace');
  I.fillField('#assetInput', 'TEST11');
  I.dontSee('The callsign does not match selected mission');

  I.fillField('#assetInput', 'a');
  I.pressKey('Backspace');
  I.dontSee('The date field must not be empty');
  I.dontSee('The op name field must not be empty');
  I.dontSee('The callsign field must not be empty');

  I.click('#downloadButton');
  I.waitForText('The date field must not be empty', 5);
  I.waitForText('The op name field must not be empty', 5);
  I.waitForText('The callsign field must not be empty', 5);
  I.waitForText('The releasability field must be chosen', 5);

  I.fillField('#dateInput', '05/14/2019');
  I.dontSee('The date field must not be empty');
  I.waitForText('The op name field must not be empty', 5);
  I.waitForText('The callsign field must not be empty', 5);
  I.waitForText('The releasability field must be chosen', 5);

  I.fillField('#opInput', 'op test');
  I.dontSee('The op name field must not be empty');
  I.waitForText('The callsign field must not be empty', 5);
  I.waitForText('The releasability field must be chosen', 5);

  I.fillField('#assetInput', 'asset');
  I.dontSee('The callsign field must not be empty');
  I.waitForText('The callsign does not match selected mission', 5);
  I.waitForText('The releasability field must be chosen', 5);

  I.fillField('#assetInput', 'TEST11');
  I.dontSee('The callsign does not match selected mission');
  I.waitForText('The releasability field must be chosen', 5);

  I.click('div[data-option="FOUO"]');
  I.dontSee('The releasability field must be chosen');
});
