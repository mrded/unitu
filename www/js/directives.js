angular.module('starter.directives', [])

.directive('post', function() {
  return {
    restrict: 'E',
    scope: {
      post: '=data'
    },
    templateUrl: 'templates/post-directive.html'
  };
})

.directive('comment', function() {
  return {
    restrict: 'E',
    scope: {
      comment: '=data'
    },
    templateUrl: 'templates/comment-directive.html'
  };
});
