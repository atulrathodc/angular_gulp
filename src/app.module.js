(function(){
    var app = angular.module('demo', []);
 function WelcomeController($scope) {
console.log($scope)
$scope.greeting = 'Welcome!';
}
angular.module('demo').controller('WelcomeController',WelcomeController);

angular.element(document).ready(function () {
    angular.bootstrap(document, ['demo']);
    }); 
 }
 
)();