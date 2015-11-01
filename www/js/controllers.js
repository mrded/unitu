angular.module('unitu.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, authService, accountService) {
  $scope.refresh = function() {
    accountService.get().then(function(account) {
      $scope.account = account;
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    
    if (authService.token() === '') {
      $scope.modal.show();
    } else {
      $scope.refresh();
    }
  });

  // Delete access_token and open the login modal.
  $scope.logout = function() {
    authService.logout();
    $scope.modal.show();
  };
  
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    authService.login($scope.loginData.username, $scope.loginData.password).then(function() {
      $scope.modal.hide();
      $scope.refresh();
    }, function(message) {
       $ionicPopup.alert({
         title: 'Something wrong',
         template: 'It may be username with password, or just internet connection.'
       });
    });
  };
})

.controller('mainCtrl', function($scope) {
})

.controller('courseCtrl', function($scope, $stateParams, $ionicModal, courseService, postService, accountService) {
  $scope.refresh = function() {
    courseService.get($stateParams.courseId).then(function(course) {
      $scope.course = course;
      $scope.$broadcast('scroll.refreshComplete');
    });
  } ;
  
  $scope.refresh();
  
  $ionicModal.fromTemplateUrl('templates/post-create.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.addPost = function() {
    $scope.modal.show();
  };
  
  $scope.close = function() {
    $scope.modal.hide();
  };
  
  $scope.post = function(courseId, text, anonymous) {
    accountService.get().then(function(account) {
      var data = {
        CourseId: courseId,
        CreatorId: account.Id,
        Text: text,
        PostedAnonymously: anonymous || false
      };
      
      postService.create(data).then(function(post) {
        $scope.refresh();
        $scope.modal.hide();
      });
    });
  };
})

.controller('postCtrl', function($scope, $stateParams, postService) {
  postService.get($stateParams.postId).then(function(post) {
    $scope.post = post;
  });
});
