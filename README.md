# Sauce Lab Automation Test

## Dependencies

- [Node.js](https://nodejs.org/en/download/package-manager)
- [NPM](https://docs.npmjs.com/cli/v10/configuring-npm/install)
- [Chrome Web Driver](https://chromedriver.storage.googleapis.com/index.html)
- [Firefox Web Driver](https://github.com/mozilla/geckodriver/releases/)

## Installation

    npm install

## Usage

    npm test

## Setup

This repository contains a collection of automated web tests utilizing Selenium with the Firefox and Chrome Web Drivers. These tests open a webpage in Mozilla Firefox or Google Chrome and execute a series of test cases to verify application functionality.

The test suite is built using the popular JavaScript testing framework, [Mocha]([https://mochajs.org/](https://mochajs.org/)).

The `package.json` file includes script commands that leverage the Node Package Manager (npm) to run Mocha tests through the command-line interface (CLI). These commands are triggered by the `npm test` and `npm start` commands, respectively.
