const selenium = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const until = selenium.until;

const Constants = require('./constants');

const Utils = {};

Utils.driver = null;

Utils.exitHandler = function (options, err) {
  Utils.getDriver().quit();
};

Utils.getDriver = function () {
  if (Utils.driver == null) {
    Utils.driver = new selenium.Builder()
      .forBrowser(selenium.Browser.CHROME)
      .build();

    // Handle exit
    process.on('exit', Utils.exitHandler.bind(null, { cleanup: true }));

    // Handle manual exit (Ctrl + C)
    process.on('SIGINT', Utils.exitHandler.bind(null, { exit: true }));

    // Handle process kill
    process.on('SIGUSR1', Utils.exitHandler.bind(null, { exit: true }));
    process.on('SIGUSR2', Utils.exitHandler.bind(null, { exit: true }));

    // Handle uncaught exceptions
    process.on('uncaughtException', Utils.exitHandler.bind(null, { exit: true }));
  }

  return Utils.driver;
}

Utils.waitForItemToLoad = function (locator) {
  return Utils.getDriver().wait(
    until.elementLocated(locator),
    Constants.GENERAL_WAIT_TIMEOUT
  );
};

Utils.waitForItemToShowUp = function (locator) {
  return Utils.getDriver().wait(
    until.elementLocated(locator),
    Constants.GENERAL_WAIT_TIMEOUT
  );
};

Utils.waitForItemToLoadSafe = async function (locator) {
  try {
    await Utils.waitForItemToLoad(locator);
  } catch (ex) {
  }
};

Utils.waitForItemToShowUpSafe = async function (locator) {
  try {
    await Utils.waitForItemToShowUp(locator);
  } catch (ex) {
  }
};

Utils.findElementSafe = async function (locator) {
  let element = null;

  try {
    element = await Utils.getDriver().findElement(locator);
  } catch (ex) {
  }

  return element;
};

Utils.clickElementSafe = async function (locator) {
  await Utils.waitForItemToShowUpSafe(locator);

  const element = await Utils.findElementSafe(locator);
  if (element != null) {
    element.click();
  }
};

Utils.sleep = async function (timeout) {
  await new Promise(resolve => setTimeout(resolve, timeout));
};

module.exports = Utils;
