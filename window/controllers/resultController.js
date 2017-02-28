app.controller('resultController', function ($scope, $http, $routeParams) {
    console.log("Result controller");
    $scope.url = $routeParams.url;
    
});

//https://www.helloworld.com/?hello=world&bye=hi
//https://www.helloworld.com/?hello=world&bye=hi&job=yes