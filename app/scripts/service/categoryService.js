/**
 * Created by hoale on 2/23/2016.
 */
var categoryFactory = angular.module('categoryService', ['constant']);
categoryFactory.factory('categoryFactory', ['$http', 'constants', function ($http, constants) {
  var service = {};

  function getAllCategory() {
    return $http.get(constants.api + 'category');
  }

  function createCategory(data) {
    return $http.post(constants.api + 'createCategory', data);
  }

  service.getAllCategory = getAllCategory;
  service.createCategory = createCategory;
  return service;
}]);
