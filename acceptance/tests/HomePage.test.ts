/// <reference path="../steps.d.ts" />

Feature('Home Page');

Scenario('should load a page', (I) => {
  I.amOnPage('/');
  I.see('DDTTTTZMONYY_TGT_NAME_ACTIVITY_ASSET_CLASSIFICATION');
});

Scenario('should allow you to upload a file and display the pngs', (I) => {
  I.amOnPage('/');
  I.attachFile('#uploadButton', 'data/samplepptx.pptx');
  I.waitForText('SAMPLEPPTX.PPTX', 10);
  I.waitForText('sampl.pptx-0001.png', 10);
});
