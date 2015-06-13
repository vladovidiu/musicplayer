(function() {
  'use strict';

  angular
    .module('musicPlayer.controllers')
    .controller('PlayerScreenCtrl', PlayerScreenCtrl);

  PlayerScreenCtrl.$inject = ['PlayerScreenService', '$scope'];

  function PlayerScreenCtrl(PlayerScreenService, $scope) {
    var vm = this;

    vm.songList = [];
    vm.playlist = [];
    vm.gridOptionsSong = {};
    vm.gridOptionsPlaylist = {};

    vm.init = function () {
      PlayerScreenService.getSongs()
        .then(getSongsSuccess, getSongsError);

      PlayerScreenService.getPlaylist()
        .then(getPlaylistSuccess, getPlaylistError);
    };

    vm.init();

    function getSongsSuccess(songs) {
      vm.songList = songs;
      vm.gridOptionsSong.data = songs;
    }

    function getSongsError(status) {
      console.error(status);
    }

    function getPlaylistSuccess(data) {
      vm.playlist = data;
      $scope.$parent.setCurrentPlaylist(data);
      vm.gridOptionsPlaylist.data = data;
    }

    function getPlaylistError(status) {
      console.error(status);
    }

    // Custom add to playlist cell template
    var addTemplate = '<div><input type="button" ng-click="grid.appScope.addSongToPlaylist(row)" value="Add"></input></div>';
    var playTemplate = '<div><input type="button" ng-click="grid.appScope.playSong(row)" value="Play"></input></div>';

    // Grid Options
    vm.gridOptionsSong = {
      enableFiltering: true,
      columnDefs: [
        { field: 'songName' },
        { field: 'artist' },
        { field: 'genre' },
        { field: 'add to playlist', cellTemplate: addTemplate, enableFiltering: false, width: '15%'}
      ]
    };

    vm.gridOptionsPlaylist = {
      enableFiltering: true,
      columnDefs: [
        { field: 'songName' },
        { field: 'artist' },
        { field: 'genre' },
        { field: 'play', cellTemplate: playTemplate, enableFiltering: false, width: '15%'}
      ]
    };

    $scope.addSongToPlaylist = function (row) {
      var index = vm.gridOptionsSong.data.indexOf(row.entity);
      // do somehting with index
      PlayerScreenService.updatePlaylist(vm.songList[index]).then(function(response) {
        console.log(response);
        PlayerScreenService.getPlaylist()
          .then(getPlaylistSuccess, getPlaylistError);
      });
    };

    $scope.playSong = function (row) {
      var index = vm.gridOptionsPlaylist.data.indexOf(row.entity);
      $scope.$parent.setCurrentSong(vm.playlist[index]);
    };

  }
}());
