/// <reference path="../steps.d.ts" />

Feature('Home Page');

Scenario('should allow you to upload a file and display the pngs', (I) => {
  I.amOnPage('/');
  I.fillField('#opInput', 'op test');
  I.fillField('#classificationInput', 'secret');
  I.fillField('#assetInput', 'ASSET');
  I.attachFile('#uploadButton', 'data/samplepptx.pptx');
  I.waitForText('SAMPLEPPTX.PPTX', 10);
  I.waitForText('DDTTTTZMONYY_OP_TEST_ACTIVITY_ASSET_SECRET', 10);
});
