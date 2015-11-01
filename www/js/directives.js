angular.module('starter.directives', [])

.directive('comment', function() {
  return {
    restrict: 'E',
    scope: {
      comment: '=data'
    },
    templateUrl: 'templates/comment.html'
  };
});
