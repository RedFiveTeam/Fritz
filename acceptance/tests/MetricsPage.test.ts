/// <reference path="../steps.d.ts" />

Feature('Metrics Page');

Scenario('should display some metrics and the average time for the actions', (I) => {
  I.amOnPage('/metrics');
  I.waitForText('e23523', 10);
  I.see('Avg. Workflow Time');
  I.see('Avg. Upload Time');
  I.see('Avg. Rename Time');
  I.see('Avg. Download Time');
});