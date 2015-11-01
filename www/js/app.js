angular.module('unitu', ['ionic', 'unitu.controllers', 'unitu.services', 'unitu.directives'])

.run(function($ionicPlatform, $http, authService) {
  $http.defaults.headers.common.Authorization = authService.token();
  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.constant('API_ADDRESS', 'https://api.unitu.co.uk')
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.main', {
    url: '/playlists',
    views: {
      'menuContent': {
        templateUrl: 'templates/main.html',
        controller: 'mainCtrl'
      }
    }
  })

  .state('app.course', {
    url: '/course/:courseId',
    views: {
      'menuContent': {
        templateUrl: 'templates/course.html',
        controller: 'courseCtrl'
      }
    }
  })
  
  .state('app.post', {
    url: '/post/:postId',
    views: {
      'menuContent': {
        templateUrl: 'templates/post.html',
        controller: 'postCtrl'
      }
    }
  });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/main');
});
