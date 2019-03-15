/// <reference path="../steps.d.ts" />

Feature('Home Page');

Scenario('should allow you to edit the activity of a image', (I) => {
  I.amOnPage('/');
  I.attachFile('#uploadButton', 'data/samplepptx.pptx');
  I.wait(5);
  I.waitForText('DDTTTTZMONYY_TGT_NAME_ACTY_ASSET_CLASSIFICATION', 10);
  I.fillField('e.g. OV', 'activity test');
  I.waitForText('DDTTTTZMONYY_TGT_NAME_ACTIVITY_TEST_ASSET_CLASSIFICATION', 10, '.card-body:first-of-type');
});

Scenario('should allow you to upload a file, validate it, and display the pngs', (I) => {
  I.amOnPage('/');
  I.click('#downloadbutton');
  I.waitForText('You must upload a Powerpoint', 10);
  I.waitForText('Field cannot be empty', 10);
  I.fillField('#opInput', 'op test');
  I.fillField('#classificationInput', 'secret');
  I.fillField('#assetInput', 'ASSET');
  I.attachFile('#uploadButton', 'data/blank.txt');
  I.waitForText('File must be in Powerpoint format', 10);
  I.attachFile('#uploadButton', 'data/samplepptx.pptx');
  I.waitForText('SAMPLEPPTX.PPTX', 10);
  I.waitForText('DDTTTTZMONYY_OP_TEST_ACTY_ASSET_SECRET', 10);
  I.click('#deletePP');
  I.waitForText('Are you sure you want to delete the powerpoint', 10);
  I.click('.btn-primary');
  I.waitForText('Powerpoint File Removed', 10);
  I.waitForText('Drag and drop', 10);
});
