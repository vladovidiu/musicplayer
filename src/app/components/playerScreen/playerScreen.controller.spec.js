(function() {
  'use strict';

  describe('controllers', function() {
    var scope, PlayerScreenCtrl;
    var mainScope, MainCtrl;
    var mockSong = {
      "songName": "If I die young",
      "genre": "Rock",
      "artist": "The Band Perry",
      "duration": 340,
      "rating": "Not yet rated."
    };
    var mockPlaylist = [{
      "songName": "Keep your head up",
      "genre": "Rock",
      "artist": "Andy Grammer",
      "duration": 220,
      "rating": 0
    }];
    var updatedMockPlaylist = [{
      "songName": "If I die young",
      "genre": "Rock",
      "artist": "The Band Perry",
      "duration": 340,
      "rating": "Not yet rated."
    },
    {
      "songName": "Keep your head up",
      "genre": "Rock",
      "artist": "Andy Grammer",
      "duration": 220,
      "rating": 0
    }];
    var row = {
      entity: mockSong
    };

    beforeEach(module('musicPlayer'));

    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      mainScope = $rootScope.$new();
      PlayerScreenCtrl = $controller('PlayerScreenCtrl as ps', {
        $scope: scope
      });
      MainCtrl = $controller('MainCtrl', {
        $scope: mainScope
      })
    }));

    it('should create empty arrays', function() {
      expect(angular.isArray(scope.ps.songList)).toBeTruthy();
      expect(scope.ps.songList.length === 0).toBeTruthy();

      expect(angular.isArray(scope.ps.playlist)).toBeTruthy();
      expect(scope.ps.playlist.length === 0).toBeTruthy();
    });

    it('should play a selected song', function() {
      mainScope.setCurrentSong(mockSong);

      expect(mainScope.currentSong).toBe(mockSong);
    })
  });
}());
