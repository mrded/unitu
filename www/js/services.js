angular.module('starter.services', [])

.factory('localStorage', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
})

.service('auth', function($q, $http, $log, localStorage) {
  return {
    token: function() {
      return localStorage.get('access_token', '');
    },
    login: function(username, password) {
      var deferred = $q.defer();
      
      var url = "https://api.unitu.co.uk/v1/auth/token?username=:username&password=:password"
        .replace(':username', username)
        .replace(':password', password);
      
      $http.post(url).then(function(response) { // Success.
        localStorage.set('access_token', response.data.access_token);
        deferred.resolve(response.data.access_token);
      }, function(response) { // Error.
        $log.error(response);
        deferred.reject(response.data.Message);
      });
      
      return deferred.promise;
    },
    logout: function() {
      localStorage.set('access_token', '');
    }
  }
})
;
