/// <reference path="../steps.d.ts" />

Feature('Metrics Page');

Scenario('should display some metrics', (I) => {
  I.amOnPage('/metrics');
  I.waitForText('e23523', 10);
});