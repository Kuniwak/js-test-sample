var webdriver = require('selenium-webdriver');
var assert = require('chai').assert;
var createServer = require('../server');
var takeScreenshotIfFailed = require('./helper');


describe('サンプル', function() {
  var driver, server, context = {};


  before(function() {
    context.driver = driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();

    server = createServer(3000, 'localhost');

    return server.start();
  });


  it('タイトルは"Hello, World!"である', function() {
    driver.get('http://localhost:3000');

    return driver.getTitle()
      .then(function(text) {
        assert.strictEqual(text, 'Hello, World!');
      });
  });


  afterEach(takeScreenshotIfFailed(context));


  after(function() {
    return Promise.all([
      server.stop(),
      driver.quit(),
    ]);
  });
});
