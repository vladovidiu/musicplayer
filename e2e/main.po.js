/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
  this.previousButton = element(by.css('.previousButton'));
  this.playButton = element(by.css('.playButton'));
  this.pauseButton = element(by.css('.pauseButton'));
  this.nextButton = element(by.css('.nextButton'));

  this.songName = element(by.css('.songName'));
  this.artistName = element(by.css('.artistName'));

  this.leftTimer = element(by.css('.leftTimer'));
};

module.exports = new MainPage();
