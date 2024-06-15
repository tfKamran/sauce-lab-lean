// Imports
const assert = require('assert');

const Utils = require('../utils');
const Constants = require('../constants');

const Authentication = {};

Authentication.login = async function (username, password) {
  await Utils.waitForItemToLoadSafe(Constants.Selectors.btnLogin);

  await Utils.getDriver().findElement(Constants.Selectors.txtUsername).sendKeys(username);
  await Utils.getDriver().findElement(Constants.Selectors.txtPassword).sendKeys(password);

  await Utils.getDriver().findElement(Constants.Selectors.btnLogin).click();
};

Authentication.logout = async function () {
  await Utils.clickElementSafe(Constants.Selectors.menuBurger);
  await Utils.sleep(300); // Wait for animation
  await Utils.clickElementSafe(Constants.Selectors.btnLogout);

  await Utils.waitForItemToLoadSafe(Constants.Selectors.btnLogin);
};

describe('# Authentication', function () {
  before(function () {
    Utils.getDriver().get('https://www.saucedemo.com');
  });

  it('should be able to login with standard user', async function () {
    await Authentication.login(Constants.USERNAME, Constants.PASSWORD);

    await Utils.waitForItemToLoadSafe(Constants.Selectors.itemRandom);

    assert.equal((await Utils.findElementSafe(Constants.Selectors.btnLogin)), null,
      'Login button should not be visible after logging in');
    assert.notEqual((await Utils.findElementSafe(Constants.Selectors.itemRandom)), null,
      'List of inventory items should be visible after login');

    await Authentication.logout();
  });

  it('should not be able to login with wrong password', async function () {
    await Authentication.login(Constants.USERNAME, 'Constants.PASSWORD');

    assert.notEqual((await Utils.findElementSafe(Constants.Selectors.btnLogin)), null,
      'Login button should be visible if credentials are wrong');
    assert.notEqual((await Utils.findElementSafe(Constants.Selectors.txtLoginError)), null,
      'Error about the credentials should be visible');
  });
});

module.exports = Authentication;
