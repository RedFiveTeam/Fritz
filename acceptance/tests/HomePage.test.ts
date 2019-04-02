/// <reference path="../steps.d.ts" />

Feature('Home Page');

Scenario('should allow you to edit the activity and time of a image and view image in expanded view', (I) => {
  I.amOnPage('/');
  I.attachFile('#uploadButton', 'data/');
  I.wait(5);
  I.waitForText('DDTTTTZMONYY_TGT_NAME_ACTY_ASSET_CLASSIFICATION', 10);
  I.fillField('.slideCardContainer:first-of-type > .slideCard > .card > .row > .col-md-8 > .slidesInputs > .activityInputField > input', 'activity test');
  I.fillField('.slideCardContainer:first-of-type > .slideCard > .card > .row > .col-md-8 > .slidesInputs > .timeInputField > input', '1234');
  I.waitForText('DD1234ZMONYY_TGT_NAME_ACTIVITY_TEST_ASSET_CLASSIFICATION', 10, '.card-body:first-of-type');
  I.click('.slideCard:first-of-type > .card > .row > .col-md-4 > img');
  I.waitForText('DD1234ZMONYY_TGT_NAME_ACTIVITY_TEST_ASSET_CLASSIFICATION', 10);
  I.fillField('.carousel-item:first-of-type > .slidesInputs > .activityInputField > input', 'new activity test');
  I.fillField('.carousel-item:first-of-type > .slidesInputs > .timeInputField > input', '5678');
  I.waitForText('DD5678ZMONYY_TGT_NAME_NEW_ACTIVITY_TEST_ASSET_CLASSIFICATION', 10);
  I.click('.exitExpand');
  I.waitForText('JPEG Renamer - Details', 10);
});

Scenario('should allow you to upload a file, validate it, and display the pngs', (I) => {
  I.amOnPage('/');
  I.click('#downloadbutton');
  I.waitForText('You must upload a folder', 10);
  I.waitForText('Field cannot be empty', 10);
  I.fillField('#opInput', 'op test');
  I.fillField('#classificationInput', 'secret');
  I.fillField('#assetInput', 'ASSET');
  I.attachFile('#uploadButton', 'data/');
  I.waitForText('SAMPLEPPTX.JPG', 10);
  I.waitForText('DDTTTTZMONYY_OP_TEST_ACTY_ASSET_SECRET', 10);
  I.click('#deleteFolder');
  I.waitForText('Are you sure you want to delete these JPGs', 10);
  I.click('.btn-primary');
  I.waitForText('JPGs Removed', 10);
  I.waitForText('Drag and drop', 10);
});

Scenario('should display a classification banner on the homepage', (I) => {
  I.amOnPage('/');
  I.waitForText('UNCLASSIFIED');
});
