'use strict';

/**
 * @ngdoc function
 * @name slimApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the slimApp
 */
angular.module('slimApp')
  .controller('AdminCtrl', ['categoryFactory', '$scope', 'toastr', function (categoryFactory, $scope, toastr) {

    $scope.page = {
      currentPage: 1,
      pageSize: 10,
      filter: '',
      options: [10, 15, 20]
    };
    $scope.isConfig = false;
    $scope.sortType = 'categoryName'; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order

    function getAllCategory() {
      categoryFactory.getAllCategory().then(function (resp) {
        $scope.category = resp.data.categories;
        //$scope.categoryCopy = angular.copy($scope.category);
      })
    }

    getAllCategory();
    $scope.formData = {
      name: '',
      order: ''
    };

    $scope.saveCategory = function () {
      categoryFactory.createCategory($scope.formData).then(function (resp) {
        if (resp.data.code === 1) {
          toastr.info('Create category successfully', 'Success');
          getAllCategory();
        }

      })
    };
    $scope.eidtCateogry = function (catSelected) {
      if ($scope.editItem) {
        $scope.cancel();
      }
      catSelected.isSelected = true;
      $scope.editItem = angular.copy(catSelected);
    };
    $scope.cancel = function () {
      var obj = $scope.editItem;
      _.find($scope.category, function (o) {
        return o.id === obj.id;
      }).isSelected = false;
    };

    $scope.updateCategory = function () {
      if(!$scope.editItem.sortOrder ||  !$scope.editItem.categoryName){
        toastr.error('Fill in all field', 'Error');
        return;
      }

      toastr.info('Updating category', 'Info!');
      var data = {
        id: $scope.editItem.id,
        categoryName: $scope.editItem.categoryName,
        isEnable: $scope.editItem.isEnable,
        sortOrder: $scope.editItem.sortOrder
      };
      categoryFactory.updateCategory(data).then(function (resp) {
        console.log(resp);
        if (resp.data.code === 1) {
          toastr.success('Updating category successfully', 'Success');
          getAllCategory();
        }

        $scope.cancel();
      })
    };


  }]);
