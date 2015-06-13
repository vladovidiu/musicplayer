(function() {
  'use strict';

  angular
    .module('musicPlayer.controllers')
    .controller('MainCtrl', MainCtrl)
    .filter('secondsToTime', [secondsToTime]);

  MainCtrl.$inject= ['$scope', '$interval'];

  function MainCtrl($scope, $interval) {

    // Variables
    $scope.currentSong = {};
    $scope.currentPlaylist = [];
    $scope.pauseFlag = false;

    $scope.mode = 'determinate';
    $scope.determinateValue = 0;
    $scope.percentageValue = 0;

    var temporaryDeterminateValue, temporaryPercentageValue,
      interval;

    $scope.playSong = function () {
      $scope.pauseFlag = true;
      if (temporaryDeterminateValue) {
        $scope.determinateValue = temporaryDeterminateValue;
        $scope.percentageValue = temporaryPercentageValue;
      }
      interval = $interval(function() {
        $scope.determinateValue += 1;
        $scope.percentageValue += 100 / $scope.timeRemaining;
        if ($scope.determinateValue >= $scope.timeRemaining) {
          $scope.determinateValue = 0;
          $scope.percentageValue = 0;
          $scope.nextSong();
        }
      }, 1000, $scope.timeRemaining, true);
    };

    $scope.pauseSong = function() {
      $scope.pauseFlag = false;
      temporaryDeterminateValue = $scope.determinateValue;
      temporaryPercentageValue = $scope.percentageValue;
      $interval.cancel(interval);
    };

    $scope.nextSong = function() {
      $scope.currenSong = angular.copy({});
      var index = parseInt(findIndex());
      if (index < $scope.currentPlaylist.length - 1) {
        $scope.setCurrentSong($scope.currentPlaylist[index + 1]);
      } else {
        $scope.setCurrentSong($scope.currentPlaylist[0]);
      }
    };

    $scope.previousSong = function() {
      $scope.currenSong = angular.copy({});
      var index = parseInt(findIndex());
      if (index > 0) {
        $scope.setCurrentSong($scope.currentPlaylist[index - 1]);
      } else {
        $scope.setCurrentSong($scope.currentPlaylist[$scope.currentPlaylist.length - 1]);
      }
    };

    // Setters and Getters
    $scope.setCurrentSong = function(song) {
      clearVars();
      $scope.currentSong = song;
      $scope.timeRemaining = $scope.currentSong.duration;
      $scope.playSong();
    };

    $scope.setCurrentPlaylist = function(playlist) {
      $scope.currentPlaylist = playlist;
    };

    function clearVars() {
      $interval.cancel(interval);
      $scope.determinateValue = 0;
      $scope.percentageValue = 0;
      temporaryPercentageValue = null;
      temporaryDeterminateValue = null;
    }

    function findIndex() {
      for (var song in $scope.currentPlaylist) {
        if ($scope.currentPlaylist.hasOwnProperty(song)) {
          if ($scope.currentPlaylist[song].songName === $scope.currentSong.songName) {
            return song;
          }
        }
      }
    }
  }

  function secondsToTime() {
    return function (seconds) {
      return new Date (1970, 0, 1).setSeconds(seconds);
    };
  }

}());
