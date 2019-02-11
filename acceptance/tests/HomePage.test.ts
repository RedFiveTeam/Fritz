/// <reference path="../steps.d.ts" />

Feature('Home Page');

Scenario('should load a page', (I) => {
  I.amOnPage('/');
  I.see('Naming Convention');
});