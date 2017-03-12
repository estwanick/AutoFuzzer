app.controller('resultController', function ($scope, $http, $routeParams, requestResult) {
    console.log("Result controller");
    $scope.url = requestResult.getURL();
    $scope.method = requestResult.getMethod();
    $scope.headers = JSON.stringify( requestResult.getHeaders() );
    $scope.body = requestResult.getBody();
    //let contentType = requestResult.getContentType();
    //console.log( contentType );

    $scope.response = requestResult.getResponse();
    //$scope.response = vkbeautify.xml( requestResult.getResponse(), 4);

});