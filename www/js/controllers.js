angular.module('unitu.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, authService, accountService) {
  var bootstrap = function() {
    accountService.get().then(function(account) {
      $scope.account = account;
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
      bootstrap();
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
      bootstrap();
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

.controller('courseCtrl', function($scope, $stateParams, $ionicModal, courseService, postService) {
  courseService.get($stateParams.courseId).then(function(course) {
    $scope.course = course;
  });
  
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
    var data = {
      CourseId: courseId,
      CreatorId: "7a838b72-8ad3-41a1-bd30-db4130ce731d",
      Text: text,
      PostedAnonymously: anonymous || false
    };
    
    postService.create(data).then(function(post) {
      console.log('-> post', post);
      //@TODO: reload posts.
      $scope.modal.hide();
    });
  };
})

.controller('postCtrl', function($scope, $stateParams, postService) {
  postService.get($stateParams.postId).then(function(post) {
    $scope.post = post;
  });
});
