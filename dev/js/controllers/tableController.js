versionUpdater.controller('tableController', ['$scope', '$mdDialog', function ($scope, $mdDialog) {
  'use strict';

  $scope.a_versions = [
    {
      "name":"0.0.0",
      "channel":"stable",
      "asset":3,
      "asset_data":[
        {
          "name":"File 1",
          "plataform": "Windows 64 bit",
          "downloads":5
        }
      ],
      "notes":"normal",
      "date":"2 months ago"
    },{
      "name":"0.0.1",
      "channel":"stable",
      "asset":3,
      "notes":"normal",
      "date":"2 months ago"
    },{
      "name":"0.0.2",
      "channel":"stable",
      "asset":3,
      "notes":"normal",
      "date":"2 months ago"
    },{
      "name":"0.0.3",
      "channel":"stable",
      "asset":3,
      "notes":"normal",
      "date":"2 months ago"
    },{
      "name":"0.0.4",
      "channel":"stable",
      "asset":3,
      "notes":"normal",
      "date":"2 months ago"
    },{
      "name":"0.0.5",
      "channel":"stable",
      "asset":3,
      "notes":"normal",
      "date":"2 months ago"
    },{
      "name":"0.0.6",
      "channel":"stable",
      "asset":3,
      "notes":"normal",
      "date":"2 months ago"
    },{
      "name":"0.0.7",
      "channel":"stable",
      "asset":3,
      "notes":"normal",
      "date":"2 months ago"
    },{
      "name":"0.0.8",
      "channel":"stable",
      "asset":3,
      "notes":"normal",
      "date":"2 months ago"
    },{
      "name":"0.0.9",
      "channel":"stable",
      "asset":3,
      "notes":"normal",
      "date":"2 months ago"
    },{
      "name":"0.1.0",
      "channel":"stable",
      "asset":3,
      "notes":"normal",
      "date":"2 months ago"
    },{
      "name":"0.1.1",
      "channel":"stable",
      "asset":3,
      "notes":"normal",
      "date":"2 months ago"
    }
  ];

  $scope.a_versionsLength = $scope.a_versions.length;

  $scope.addVersion = function($event) {
        // Appending dialog to document.body to cover sidenav in docs app
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'dialog1.tmpl.html',
      targetEvent: $event,
      clickOutsideToClose:true
    })
    .then(function() {
      $scope.status = 'You said the information was .';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  $scope.addAsset = function($event, version) {
        // Appending dialog to document.body to cover sidenav in docs app
    $mdDialog.show({
      controller: assetController,
      templateUrl: 'addAsset.tmpl.html',
      targetEvent: $event,
      clickOutsideToClose:true,
      locals:{
        localVersion: version
      }
    })
    .then(function() {
      $scope.status = 'You said the information was .';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  $scope.deleteVersion = function($event, version) {
        // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
      .title('Would you like to delete this entry? ' + version.name)
      .textContent('If you delete this entry all the assets linked will be deleted.')
      .ariaLabel('Lucky day')
      .targetEvent($event)
      .ok('Delete')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      $scope.status = 'You decided to get rid of your debt.';
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });
  };

  function assetController($scope, $mdDialog, localVersion) {
    $scope.version = localVersion;
    $scope.selectedIndex = 0;

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };

    $scope.addAssetFile = function($event, version) {
          // Appending dialog to document.body to cover sidenav in docs app
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'addAsset2.tmpl.html',
        targetEvent: $event,
        clickOutsideToClose:true,
        locals:{
          localVersion: version
        }
      })
      .then(function() {
        $scope.status = 'You said the information was .';
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
    };

  };

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  };

  $scope.limitOptions = [10, 15, 20];

  $scope.options = {
    rowSelection: true,
    multiSelect: true,
    autoSelect: true,
    decapitate: false,
    largeEditDialog: false,
    boundaryLinks: false,
    limitSelect: true,
    pageSelect: true
  };

  $scope.query = {
    order: 'channel',
    limit: 10,
    page: 1
  };

  $scope.toggleLimitOptions = function () {
    $scope.limitOptions = $scope.limitOptions ? undefined : [10, 15, 20];
  };



}]);

versionUpdater.directive('chooseFile', function() {
  return {
    link: function (scope, elem, attrs) {
      var button = elem.find('button');
      var input = angular.element(elem[0].querySelector('input#fileInput'));
      button.bind('click', function() {
        input[0].click();
      });
      input.bind('change', function(e) {
        scope.$apply(function() {
          var files = e.target.files;
          if (files[0]) {
            scope.fileName = files[0].name;
          } else {
            scope.fileName = null;
          }
        });
      });
    }
  };
});
