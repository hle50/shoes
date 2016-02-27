var module = angular.module('slimApp');
module.directive('numberOnly', function(){
  return{
    require: '?ngModel',
    link: function(scope, element, attrs,modelCtrl){
      if(!modelCtrl){
        return;
      }
      modelCtrl.$parsers.push(function(inputValue){
        if(!inputValue){
          return;
        }
        var transformedInput = inputValue.replace(/[^0-9]/g,'');
        if (transformedInput !== inputValue) {
          modelCtrl.$setViewValue(transformedInput);
          modelCtrl.$render();
        }
        return transformedInput;
      })
    }
  }
});
