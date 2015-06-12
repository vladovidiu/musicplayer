(function() {
  'use strict';

  angular
    .module('musicPlayer.services')
    .factory('PlayerScreenService', PlayerScreenService);

    PlayerScreenService.$inject = ['$http', '$q'];

    function PlayerScreenService($http, $q) {
      return {
        getSongs: getSongs,
        getPlaylist: getPlaylist,
        updatePlaylist: updatePlaylist
      };

      function getSongs() {
        var d = $q.defer();
        var URL = 'http://localhost:3002/songs';

        $http({
          method: 'GET',
          url: URL
        })
        .success(function(data) {
          d.resolve(data);
        })
        .error(function(data) {
          d.reject(data);
        });

        return d.promise;
      }

      function getPlaylist() {

      }

      function updatePlaylist() {

      }
    }
}());
