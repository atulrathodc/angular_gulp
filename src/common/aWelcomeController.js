(function(){
     function WelcomeController($scope) {
    console.log($scope)
    $scope.greeting = 'Welcome!';
}
angular.module('demo').controller('WelcomeController',WelcomeController);
     }
)();
