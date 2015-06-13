(function() {
  'use strict';

  angular
    .module('musicPlayer.controllers')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject= ['$timeout', '$interval'];

  function MainCtrl($timeout, $interval) {
    var vm = this;

    vm.mode = 'determinate';
    vm.determinateValue = 0;

    $interval(function() {
      vm.determinateValue += 1;
      if (vm.determinateValue > 100) {
        vm.determinateValue = 0;
      }
    }, 1000, 0, true);

    angular.forEach(vm.awesomeThings, function(awesomeThing) {
      awesomeThing.rank = Math.random();
    });
  }

}());
