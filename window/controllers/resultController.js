app.controller('resultController', function ($scope, $http, $routeParams, requestResult) {
    console.log("Result controller");
    $scope.url = requestResult.getURL();
    $scope.response = requestResult.getResponse();
    $scope.body = JSON.stringify( requestResult.getBody() );
    $scope.method = requestResult.getMethod();
    
});

//https://www.helloworld.com/?hello=world&bye=hi
//https://www.helloworld.com/?hello=world&bye=hi&job=yes