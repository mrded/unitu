angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, auth, course, department, university) {
  var bootstrap = function() {
    course.all().then(function(courses) {
      $scope.courses = courses;
    });
    
    department.all().then(function(departments) {
      $scope.departments = departments;
    });
    
    university.get().then(function(university) {
      $scope.university = university;
    });  
  };
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    
    if (auth.token() === '') {
      $scope.modal.show();  
    } else {
      bootstrap();
    }
  });

  // Delete access_token and open the login modal.
  $scope.logout = function() {
    auth.logout();
    $scope.modal.show();
  };
  
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    auth.login($scope.loginData.username, $scope.loginData.password).then(function() {
      $scope.modal.hide();
      bootstrap();
    }, function(message) {
       $ionicPopup.alert({
         title: 'Something wrong',
         template: 'It may be username with password, or just internet connection.'
       });
    });
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
