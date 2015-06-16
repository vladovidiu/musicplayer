'use strict';

describe('controller: MainCtrl', function() {
  var scope;
  var mockSong = {
    "songName": "If I die young",
    "genre": "Rock",
    "artist": "The Band Perry",
    "duration": 340,
    "rating": 0
  };
  var mockRatedSong = {
    "songName": "If I die young",
    "genre": "Rock",
    "artist": "The Band Perry",
    "duration": 340,
    "rating": 5
  };
  var malformedSong = {
    "genre": "Rock",
    "duration": 340,
    "rating": 0
  };
  var mockPlaylist = [{
    "songName": "If I die young",
    "genre": "Rock",
    "artist": "The Band Perry",
    "duration": 340,
    "rating": 0
  },
  {
    "songName": "Keep your head up",
    "genre": "Rock",
    "artist": "Andy Grammer",
    "duration": 220,
    "rating": 0
  }];
  var mockRates = ['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'];
  var ctrl;
  var PlayerScreenService;

  beforeEach(module('musicPlayer'));

  beforeEach(inject(function($rootScope, $controller, _PlayerScreenService_, $q) {
    scope = $rootScope.$new();
    PlayerScreenService = _PlayerScreenService_;
    ctrl = $controller('MainCtrl', {
      $scope: scope
    });

    spyOn(PlayerScreenService, 'getRates').and.callFake(function() {
      var deferred = $q.defer();
      deferred.resolve(mockRates);
      return deferred.promise;
    });
  }));

  it('should define variables', inject(function($rootScope, $httpBackend) {
    expect(angular.isObject(scope.currentSong)).toBeTruthy();
    expect(angular.isArray(scope.currentPlaylist)).toBeTruthy();

    var result;
    $httpBackend.whenGET('http://localhost:3002/rates').respond(200, mockRates);

    PlayerScreenService.getRates()
      .then(function(returnFromPromise) {
        result = returnFromPromise;
      });

    $httpBackend.flush();
    expect(result).toBe(mockRates);
  }));

  it('should set the song', function() {
    scope.setCurrentSong(mockSong);
    expect(scope.currentSong).toBe(mockSong);
    expect(scope.rate).toBe(mockSong.rating);
    expect(scope.timeRemaining).toBe(mockSong.duration);

    spyOn(scope, 'playSong');
    scope.playSong();
    expect(scope.playSong).toHaveBeenCalled();
  });

  it('should not set a malformed song', function() {
    scope.setCurrentSong(malformedSong);
    expect(scope.currentSong.songName).toBe(undefined);
  });

  it('should play the song', function() {
    scope.setCurrentSong(mockSong);
    scope.playSong();
    expect(scope.pauseFlag).toBeTruthy();
    expect(scope.determinateValue).toBeLessThan(scope.timeRemaining + 1);
  });

  it('should pause the song', function() {
    scope.pauseSong();
    expect(scope.pauseFlag).toBeFalsy();
  });

  it('should play next song', function() {
    scope.setCurrentPlaylist(mockPlaylist);
    scope.setCurrentSong(mockSong);

    var currentSongName = scope.currentSong.songName;
    expect(currentSongName).toBe(mockSong.songName);

    scope.nextSong();
    expect(scope.currentSong.songName).not.toBe(currentSongName);
  });

  it('should play previous song', function() {
    scope.setCurrentPlaylist(mockPlaylist);
    scope.setCurrentSong(mockSong);

    var currentSongName = scope.currentSong.songName;
    expect(currentSongName).toBe(mockSong.songName);

    scope.previousSong();
    expect(scope.currentSong.songName).not.toBe(currentSongName);
  });

  it('should set the playlist', function() {
    scope.setCurrentPlaylist(mockPlaylist);
    expect(scope.currentPlaylist).toBe(mockPlaylist);
  });
});
