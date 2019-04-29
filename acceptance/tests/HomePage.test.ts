/// <reference path="../steps.d.ts" />

Feature('Home Page');

Scenario('should allow you to edit the activity and time of a image and view image in expanded view', (I) => {
  I.amOnPage('/');
  I.waitForText('TEST11', 10);
  I.click('.testId');
  I.waitForText('Mission: TEST11', 10);
  I.attachFile('#uploadButton', 'data/PDFExample.pdf');
  I.wait(5);
  I.waitForText('DD1525ZMONYY_OP_XXXX_ACTY_ASSET_RELEASABILITY', 10);
  I.fillField('.slideCardContainer:first-of-type > .slideCard > .card > .row > .col-md-8 > .slidesInputs > .activityInputField > input', 'activity test');
  I.fillField('.slideCardContainer:first-of-type > .slideCard > .card > .row > .col-md-8 > .slidesInputs > .timeInputField > input', '1234');
  I.waitForText('DD1234ZMONYY_OP_XXXX_ACTIVITY_TEST_ASSET_RELEASABILITY', 10, '.card-body:first-of-type');
  I.click('.slideCard:first-of-type > .card > .row > .col-md-4 > img');
  I.waitForText('DD1234ZMONYY_OP_XXXX_ACTIVITY_TEST_ASSET_RELEASABILITY', 10);
  I.fillField('.carousel-item:first-of-type > .slidesInputs > .activityInputField > input', 'new activity test');
  I.fillField('.carousel-item:first-of-type > .slidesInputs > .timeInputField > input', '5678');
  I.waitForText('DD5678ZMONYY_OP_XXXX_NEW_ACTIVITY_TEST_ASSET_RELEASABILITY', 10);
  I.click('.exitExpand');
  I.waitForText('JPEG Renamer - Details', 10);
});

Scenario('should allow you to upload a file, validate it, and display the jpgs', (I) => {
  I.amOnPage('/');
  I.waitForText('TEST11', 10);
  I.click('.testId');
  I.waitForText('Mission: TEST11', 10);
  I.click('#downloadbutton');
  I.waitForText('You must upload a PDF', 10);
  I.waitForText('Field cannot be empty', 10);
  I.fillField('#opInput', 'op test');
  I.fillField('#assetInput', 'ASSET');
  I.attachFile('#uploadButton', 'data/blank.txt');
  I.waitForText('File must be a PDF', 10);
  I.attachFile('#uploadButton', 'data/PDFExample.pdf');
  I.waitForText('PDFEXAMPLE.PDF', 10);
  I.waitForText('DD1525ZMONYY_OP_XXXX_ACTY_ASSET_RELEASABILITY', 10);
  I.click('#deletePP');
  I.waitForText('Are you sure you want to delete the PDF', 10);
  I.click('.btn-primary');
  I.waitForText('PDF File Removed', 10);
  I.waitForText('Drag and drop', 10);
});
