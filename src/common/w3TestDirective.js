var app = angular.module("demo");
app.directive("w3TestDirective", function() {
  return {
    templateUrl: function(elem, attr) {
      return '/src/common/a.html';
    }
  };
});
