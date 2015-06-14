'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('musicPlayer'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should define variables', inject(function ($controller) {
    expect(scope.currentSong).toBeUndefined();
    expect(scope.currentPlaylist).toBeUndefined();

    $controller('MainCtrl', {
      $scope: scope
    });

    expect(angular.isObject(scope.currentSong)).toBeTruthy();
    expect(angular.isArray(scope.currentPlaylist)).toBeTruthy();
  }));
});
