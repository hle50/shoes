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
        $scope.categoryCopy = angular.copy($scope.category);
      })
    }

    getAllCategory();
    $scope.formData = {
      name: '',
      order: ''
    };

    $scope.saveCategory = function () {
      categoryFactory.createCategory($scope.formData).then(function (resp) {
        getAllCategory();
      })
    };
    //$scope.addAnimate = function(){
    //  $('#tableCategory').removeClass('animated fadeInUp');
    //  $('#tableCategory').addClass('animated fadeInUp');
    //}
  }]);
