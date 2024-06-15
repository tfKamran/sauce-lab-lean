const Utils = require('./utils');

describe('# Sauce Labs', function () {
  after(function () {
    Utils.getDriver().quit();
  });

  require('./modules/authentication');
  require('./modules/order');
});
