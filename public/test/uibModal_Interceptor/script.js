(function(angular) {
  'use strict';
  var module = angular.module('app', ['ngAnimate', 'ui.bootstrap']);
  
  module.controller('appController', ['$http', '$log', function($http, $log) {
    var vm = this;
    vm.sendRequest = sendRequest;
    
    function sendRequest(){
      $log.info('Try sending a request');
      $http.get('/fake/');
    }

  }]);
  
  module.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
    $scope.ok = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }]);

  module.factory('myHttpInterceptor', ['$log', '$injector', function($log, $injector) {  
    var interceptor = {
      'responseError': function(config) {
        $log.info('Request error');
      
        // injecting $uibModal directly cause Circular Dependency error
        // following method is a fix of it
        $injector.get('$uibModal').open({
          animation: true,
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
          size: 'sm'
        });
        
        return config;
      }
    };
    return interceptor;
  }]);
  
  module.config(['$httpProvider', function($httpProvider) {  
    $httpProvider.interceptors.push('myHttpInterceptor');
  }]);
  
})(window.angular);