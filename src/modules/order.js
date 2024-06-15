// Imports
const selenium = require('selenium-webdriver');
const By = selenium.By;

const assert = require('assert');

const Authentication = require('./authentication');
const Utils = require('../utils');
const Constants = require('../constants');

const Order = {};

Order.addItemToCart = async function (index) {
  await Utils.waitForItemToLoadSafe(Constants.Selectors.itemRandom);

  await Utils.clickElementSafe(By.css(`.inventory_item:nth-child(${index}n) .btn`));
};

Order.startCheckout = async function () {
  await Utils.clickElementSafe(Constants.Selectors.btnCart);
  await Utils.clickElementSafe(Constants.Selectors.btnCheckout);

  await Utils.waitForItemToLoadSafe(Constants.Selectors.txtCheckoutFirstName);
};

Order.fillCheckoutDetails = async function () {
  await Utils.waitForItemToLoadSafe(Constants.Selectors.txtCheckoutFirstName);

  (await Utils.findElementSafe(Constants.Selectors.txtCheckoutFirstName)).sendKeys('John');
  (await Utils.findElementSafe(Constants.Selectors.txtCheckoutLastName)).sendKeys('Doe');
  (await Utils.findElementSafe(Constants.Selectors.txtCheckoutPostalCode)).sendKeys('111111');
  await Utils.clickElementSafe(Constants.Selectors.txtCheckoutContinue);

  await Utils.waitForItemToLoadSafe(Constants.Selectors.txtCheckoutFinish);
};

Order.finishCheckout = async function () {
  await Utils.clickElementSafe(Constants.Selectors.txtCheckoutFinish);
};

describe('# Order', function () {
  before(async function () {
    Utils.getDriver().navigate().refresh();

    Authentication.login(Constants.USERNAME, Constants.PASSWORD);

    await Utils.waitForItemToLoadSafe(Constants.Selectors.itemRandom);
  });

  it('should be able to add an item to cart', async function () {
    await Order.addItemToCart(1);
    await Order.addItemToCart(2);
    await Order.addItemToCart(3);

    assert.equal((await (await Utils.findElementSafe(Constants.Selectors.txtCartCountBadge)).getText()), 3,
      'Cart should now have 3 items');
  });

  it('should be able to continue with checkout while fillig up', async function () {
    await Order.startCheckout();
    await Order.fillCheckoutDetails();
    
    // TODO add asserts
  });

  it('should be able to continue with checkout while fillig up', async function () {
    // Check total price and assert
    await Order.finishCheckout();
  });

  after(async function () {
    await Authentication.logout();
  });
});

module.exports = Order;
