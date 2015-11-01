angular.module('starter.services', [])

.factory('storageService', function($window) {
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

.service('authService', function($q, $http, $log, storageService, API_ADDRESS) {
  return {
    token: function() {
      return storageService.get('access_token', '');
    },
    login: function(username, password) {
      var deferred = $q.defer();
      
      var url = API_ADDRESS + "/v1/auth/token?username=:username&password=:password"
        .replace(':username', username)
        .replace(':password', password);
      
      $http.post(url).then(function(response) { // Success.
        var token = response.data.token_type + ' ' + response.data.access_token;
        
        storageService.set('access_token', token);
        $http.defaults.headers.common.Authorization = token;
        
        deferred.resolve(response.data.access_token);
      }, function(response) { // Error.
        $log.error(response);
        deferred.reject(response.data.Message);
      });
      
      return deferred.promise;
    },
    logout: function() {
      storageService.set('access_token', '');
    }
  }
})

.service('accountService', function($q, $http, $log, API_ADDRESS) {
  return {
    get: function() {
      var deferred = $q.defer();
      
      $http.get(API_ADDRESS + '/v1/Account').then(function(response) { // Success.
        deferred.resolve(response.data);
      }, function(response) { // Error.
        $log.error(response);
        deferred.reject(response.data.Message);
      });
      
      return deferred.promise;
    }
  }
})

.service('courseService', function($q, $http, $log, API_ADDRESS) {
  return {
    get: function(id) {
      var deferred = $q.defer();
      
      $http.get(API_ADDRESS + '/v1/Courses/' + id).then(function(response) { // Success.
        deferred.resolve(response.data);
      }, function(response) { // Error.
        $log.error(response);
        deferred.reject(response.data.Message);
      });
      
      return deferred.promise;
    }
  }
});