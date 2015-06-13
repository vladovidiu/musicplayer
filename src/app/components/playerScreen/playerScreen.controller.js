(function() {
  'use strict';

  angular
    .module('musicPlayer.controllers')
    .controller('PlayerScreenCtrl', PlayerScreenCtrl);

  PlayerScreenCtrl.$inject = ['PlayerScreenService'];

  function PlayerScreenCtrl(PlayerScreenService) {
    var vm = this;

    vm.songList = [];
    vm.playlist = [];

    vm.init = function () {
      PlayerScreenService.getSongs()
        .then(getSongsSuccess, getSongsError);

      PlayerScreenService.getPlaylist()
        .then(getPlaylistSuccess, getPlaylistError);
    };

    vm.init();

    function getSongsSuccess(songs) {
      vm.songList = songs;
    }

    function getSongsError(status) {
      console.error(status);
    }

    function getPlaylistSuccess(data) {
      vm.playlist = data;
    }

    function getPlaylistError(status) {
      console.error(status);
    }
  }
}());
