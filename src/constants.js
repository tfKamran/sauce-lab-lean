const selenium = require('selenium-webdriver');
const By = selenium.By;

const Constants = {};

Constants.GENERAL_WAIT_TIMEOUT = 5000; // 5 seconds

Constants.USERNAME = 'standard_user';
Constants.PASSWORD = 'secret_sauce';

// Selector Cache
Constants.Selectors = {};
Constants.Selectors.txtUsername = By.id('user-name');
Constants.Selectors.txtPassword = By.id('password');
Constants.Selectors.btnLogin = By.id('login-button');
Constants.Selectors.txtLoginError = By.className('error-message-container');
Constants.Selectors.itemRandom = By.className('inventory_item_img');
Constants.Selectors.menuBurger = By.id('react-burger-menu-btn');
Constants.Selectors.menuClose = By.id('react-burger-cross-btn');
Constants.Selectors.btnLogout = By.id('logout_sidebar_link');

module.exports = Constants;
