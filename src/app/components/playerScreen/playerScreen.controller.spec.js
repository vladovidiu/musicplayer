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
    var mockSongList = [
      {
        "songName": "If I die young",
        "genre": "Rock",
        "artist": "The Band Perry",
        "duration": 220,
        "rating": 0
      },
      {
        "songName": "For you",
        "genre": "Pop",
        "artist": "Timeflies",
        "duration": 420,
        "rating": 0
      },
      {
        "songName": "Boom Clap",
        "genre": "Pop",
        "artist": "Charli XCX",
        "duration": 210,
        "rating": 0
      },
      {
        "songName": "Keep your head up",
        "genre": "Rock",
        "artist": "Andy Grammer",
        "duration": 220,
        "rating": 0
      }
    ];
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
    var PlayerScreenService;
    var mockRates = ['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'];

    beforeEach(module('musicPlayer'));

    beforeEach(inject(function($controller, $rootScope, _PlayerScreenService_, $q) {
      scope = $rootScope.$new();
      scope.$parent = {
        setCurrentPlaylist: function(data) {
        	return true;
      	}
      };
      mainScope = $rootScope.$new();
      PlayerScreenService = _PlayerScreenService_;
      PlayerScreenCtrl = $controller('PlayerScreenCtrl as ps', {
        $scope: scope
      });
      MainCtrl = $controller('MainCtrl', {
        $scope: mainScope
      });
      spyOn(PlayerScreenService, 'getSongs').and.callFake(function() {
        var deferred = $q.defer();
        deferred.resolve(mockSongList);
        return deferred.promise;
      });

      spyOn(PlayerScreenService, 'getPlaylist').and.callFake(function() {
        var deferred = $q.defer();
        deferred.resolve(mockPlaylist);
        return deferred.promise;
      });
    }));

    it('should create empty arrays', function() {
      expect(angular.isArray(scope.ps.songList)).toBeTruthy();
      expect(scope.ps.songList.length === 0).toBeTruthy();

      expect(angular.isArray(scope.ps.playlist)).toBeTruthy();
      expect(scope.ps.playlist.length === 0).toBeTruthy();
    });

    it('should get the available songs', inject(function($httpBackend) {
      scope.ps.init();
      var result;
      $httpBackend.whenGET('http://localhost:3002/songs').respond(200, mockSongList);
      $httpBackend.whenGET('http://localhost:3002/playlist').respond(200, mockPlaylist);
      $httpBackend.whenGET('http://localhost:3002/rates').respond(200, mockRates);

      PlayerScreenService.getSongs()
        .then(function(returnFromPromise) {
          result = returnFromPromise;
        });

      $httpBackend.flush();
      expect(result).toBe(mockSongList);
    }));

    it('should get the playlist', inject(function($httpBackend) {
      scope.ps.init();
      var result;
      $httpBackend.whenGET('http://localhost:3002/songs').respond(200, mockSongList);
      $httpBackend.whenGET('http://localhost:3002/playlist').respond(200, mockPlaylist);
      $httpBackend.whenGET('http://localhost:3002/rates').respond(200, mockRates);

      PlayerScreenService.getPlaylist()
        .then(function(returnFromPromise) {
          result = returnFromPromise;
        });

      $httpBackend.flush();
      expect(result).toBe(mockPlaylist);
    }));

    it('should play a selected song', function() {
      mainScope.setCurrentSong(mockSong);

      expect(mainScope.currentSong).toBe(mockSong);
    });
  });
}());
