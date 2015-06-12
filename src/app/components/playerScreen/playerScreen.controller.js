(function() {
  'use strict';

  angular
    .module('musicPlayer.controllers')
    .controller('PlayerScreenCtrl', PlayerScreenCtrl);

  PlayerScreenCtrl.$inject = ['PlayerScreenService'];

  function PlayerScreenCtrl(PlayerScreenService) {
    var vm = this;

    vm.songList = [];

    PlayerScreenService.getSongs()
      .then(getSongsSuccess);

    function getSongsSuccess(songs) {
      vm.songList = songs;
    }
  }
}());
