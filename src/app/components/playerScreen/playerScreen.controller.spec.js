(function() {
  'use strict';

  describe('controllers', function() {
    var scope, PlayerScreenCtrl;
    var mockObject = [{
      "id": 1,
      "songName": "If I die young",
      "genre": "Rock",
      "artist": "The Band Perry",
      "duration": "3:40",
      "rating": "Not yet rated."
    }];

    beforeEach(module('musicPlayer'));

    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      PlayerScreenCtrl = $controller('PlayerScreenCtrl as ps', {
        $scope: scope
      });
    }));

    it('should create empty arrays', function () {
      expect(angular.isArray(scope.ps.songList)).toBeTruthy();
      expect(scope.ps.songList.length === 0).toBeTruthy();

      expect(angular.isArray(scope.ps.playlist)).toBeTruthy();
      expect(scope.ps.playlist.length === 0).toBeTruthy();
    });
  });
}());
