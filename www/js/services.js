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

.service('auth', function($q, $http, $log, localStorage, API_ADDRESS) {
  return {
    token: function() {
      return localStorage.get('access_token', '');
    },
    login: function(username, password) {
      var deferred = $q.defer();
      
      var url = API_ADDRESS + "/v1/auth/token?username=:username&password=:password"
        .replace(':username', username)
        .replace(':password', password);
      
      $http.post(url).then(function(response) { // Success.
        var token = response.data.token_type + ' ' + response.data.access_token;
        
        localStorage.set('access_token', token);
        $http.defaults.headers.common.Authorization = token;
        
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

.service('course', function($q, $http, $log, API_ADDRESS) {
  return {
    all: function() {
      var deferred = $q.defer();
      
      $http.get(API_ADDRESS + '/v1/Account').then(function(response) { // Success.
        deferred.resolve(response.data.Courses);
      }, function(response) { // Error.
        $log.error(response);
        deferred.reject(response.data.Message);
      });
      
      return deferred.promise;
    }
  }
})

.service('department', function($q, $http, $log, API_ADDRESS) {
  return {
    all: function() {
      var deferred = $q.defer();
      
      $http.get(API_ADDRESS + '/v1/Account').then(function(response) { // Success.
        deferred.resolve(response.data.Departments);
      }, function(response) { // Error.
        $log.error(response);
        deferred.reject(response.data.Message);
      });
      
      return deferred.promise;
    }
  }
})

.service('university', function($q, $http, $log, API_ADDRESS) {
  return {
    get: function() {
      var deferred = $q.defer();
      
      $http.get(API_ADDRESS + '/v1/Account').then(function(response) { // Success.
        deferred.resolve(response.data.University);
      }, function(response) { // Error.
        $log.error(response);
        deferred.reject(response.data.Message);
      });
      
      return deferred.promise;
    }
  }
})
;
