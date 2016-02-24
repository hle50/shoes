'use strict';

/**
 * @ngdoc function
 * @name slimApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the slimApp
 */
angular.module('slimApp')
  .controller('AdminCtrl', ['categoryFactory', '$scope', function (categoryFactory, $scope) {

    $scope.page ={
      currentPage: 1,
      pageSize: 10,
      filter:''
    };
    function getAllCategory() {
      categoryFactory.getAllCategory().then(function (resp) {
        $scope.category = resp.data.categories;
      })
    }

    getAllCategory();
    $scope.formData = {
      name: '',
      order: ''
    };

    $scope.saveCategory =function(){
      categoryFactory.createCategory($scope.formData).then(function(resp){
        getAllCategory();
      })
    }
  }]);
