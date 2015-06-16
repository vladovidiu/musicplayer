'use strict';

describe('The main view', function() {
  var page;
  var uiGridTest;

  beforeEach(function() {
    browser.get('http://localhost:3000/index.html');
    page = require('./main.po');
    uiGridTest = require('./gridTestUtils.spec.js');
  });

  it('should lock the button when no song is playing', function() {
    expect(page.previousButton.getAttribute('disabled')).toBeTruthy();
    expect(page.playButton.getAttribute('disabled')).toBeTruthy();
    expect(page.pauseButton.getCssValue('display')).toBe('none');
    expect(page.nextButton.getAttribute('disabled')).toBeTruthy();
  });

  it('should display all the available songs', function() {
    uiGridTest.expectRowCount('songsGrid', 8);
  });

  it('should display all songs in the playlist', function() {
    uiGridTest.expectRowCount('playlistGrid', 3);
  });

  it('should display a song name correctly', function() {
    var firstElem = uiGridTest.dataCell('songsGrid', 0, 0);
    expect(firstElem.getText()).toBe('If I die young');
  });

  it('should display a playlist song name correctly', function() {
    var firstElem = uiGridTest.dataCell('playlistGrid', 0, 0);
    expect(firstElem.getText()).toBe('Alpha');
  });

  it('should add a song to the playlist', function() {
    var addCell = uiGridTest.dataCell('songsGrid', 1, 3);
    addCell.click();
    var newPlaylistItem = uiGridTest.dataCell('playlistGrid', 3, 4);
    expect(addCell.getText()).toBe(newPlaylistItem.getText());
    browser.sleep(2000);

    // Remove it due to being persistent;
    newPlaylistItem.click();
  });

  it('should remove existing element from the playlist', function() {
    var elemToRemove = uiGridTest.dataCell('playlistGrid', 2, 4);
    elemToRemove.click();

    browser.sleep(2000);

    // add the song back for being persistent
    var addCell = uiGridTest.dataCell('songsGrid', 4, 3);
    addCell.click();
  });

  it('should play a song', function() {
    var elemToPlay = uiGridTest.dataCell('playlistGrid', 0, 3);
    elemToPlay.click();
    var elemName = uiGridTest.dataCell('playlistGrid', 0, 0);
    var artist = uiGridTest.dataCell('playlistGrid', 0, 1);

    browser.sleep(2000);
    expect(page.songName.getText()).toBe(elemName.getText());
    expect(page.artistName.getText()).toBe(artist.getText());
  });

  it('should pause the song', function() {
    var elemToPlay = uiGridTest.dataCell('playlistGrid', 0, 3);
    elemToPlay.click();
    browser.sleep(5000);
    expect(page.leftTimer.getText()).toBe('00:05');

    page.pauseButton.click();
    browser.sleep(5000);

    expect(page.leftTimer.getText()).toBe('00:05');
  });

  it('should play next song', function() {
    var elemToPlay = uiGridTest.dataCell('playlistGrid', 0, 3);
    elemToPlay.click();
    browser.sleep(5000);

    expect(page.songName.getText()).toBe('Alpha');

    page.nextButton.click();
    expect(page.songName.getText()).toBe('Beautiful things');

    browser.sleep(1000);
  });

  it('should play the previous song', function() {
    var elemToPlay = uiGridTest.dataCell('playlistGrid', 0, 3);
    elemToPlay.click();
    browser.sleep(5000);

    expect(page.songName.getText()).toBe('Alpha');

    page.previousButton.click();
    expect(page.songName.getText()).toBe('Love me like you do');

    browser.sleep(1000);
  });
});
