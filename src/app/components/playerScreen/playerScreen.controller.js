(function() {
  'use strict';

  angular
    .module('musicPlayer.controllers')
    .controller('PlayerScreenCtrl', PlayerScreenCtrl);

  PlayerScreenCtrl.$inject = ['PlayerScreenService'];

  function PlayerScreenCtrl(PlayerScreenService) {
    var vm = this;

    vm.songList = [];

    vm.init = function () {
      PlayerScreenService.getSongs()
        .then(getSongsSuccess, getSongsError);
    };

    vm.init();

    function getSongsSuccess(songs) {
      vm.songList = songs;
    }

    function getSongsError(status) {
      console.error(status);
    }
  }
}());
