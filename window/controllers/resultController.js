app.controller('resultController', function ($scope, $http, $routeParams, requestResult) {
    console.log("Result controller");
    $scope.url = requestResult.getURL();
    $scope.response = JSON.stringify( requestResult.getResponse() );
    $scope.method = requestResult.getMethod();
    $scope.headers = JSON.stringify( requestResult.getHeaders() );
    $scope.body = requestResult.getBody();
    
});