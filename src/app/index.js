(function() {
  'use strict';

  angular.module('musicPlayer', ['ngAnimate', 'ngCookies', 'ngTouch',
    'ngSanitize', 'ui.router', 'ngMaterial', 'ui.grid',
    'musicPlayer.controllers', 'musicPlayer.services'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'app/main/main.html',
          controller: 'MainCtrl'
        });

      $urlRouterProvider.otherwise('/');
    });

    angular.module('musicPlayer.controllers', []);
    angular.module('musicPlayer.services', []);
}());
