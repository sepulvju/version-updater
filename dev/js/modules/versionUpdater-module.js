var versionUpdater = angular.module('versionUpdater', ['ngMaterial', 'ngAnimate', 'md.data.table', 'toastr']);

versionUpdater.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('//');
  $interpolateProvider.endSymbol('//');
});

versionUpdater.config(['toastrConfig', function(toastrConfig) {
  angular.extend(toastrConfig, {
    autoDismiss: false,
    containerId: 'toast-container',
    maxOpened: 0,
    newestOnTop: true,
    positionClass: 'toast-bottom-left',
    preventDuplicates: false,
    preventOpenDuplicates: false,
    target: 'body',
    timeOut: 5000
  });
}]);

versionUpdater.directive('showToastError', ['toastr', function(toastr) {
  return {
    restrict: 'AE',
    replace: false,
    template: '',
    link: function(scope, elem, attrs) {
      var data = (elem[0].innerHTML);
      var toast = toastr.error(data);
    }
  };
}]);

versionUpdater.directive('showToastSuccess', ['toastr', function(toastr) {
  return {
    restrict: 'AE',
    replace: false,
    template: '',
    link: function(scope, elem, attrs) {
      var data = (elem[0].innerHTML);
      var toast = toastr.success(data);
    }
  };
}]);

versionUpdater.controller('loginController',['$scope',function($scope){
  $scope.remember = {is:"false"};
  $scope.isRemember = function(){
    if($scope.remember.is == "false"){
      $scope.remember.is = "true";
    }else{
      $scope.remember.is = "false";
    };
  };
}]);
