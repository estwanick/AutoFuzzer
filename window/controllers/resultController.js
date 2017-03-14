function getContentType(content, contentType){
    if(contentType.includes("json")){
        return vkbeautify.json(content, 4);
    }else if(contentType.includes("xml")){
        return vkbeautify.xml(content, 4);
    }else if(contentType.includes("html")){
        return "html";
    }else{
        return "text";
    }
}

app.controller('resultController', function ($scope, $http, $routeParams, requestResult) {
    console.log("Result controller");
    $scope.url = requestResult.getURL();
    $scope.method = requestResult.getMethod();
    $scope.headers = JSON.stringify( requestResult.getHeaders() );
    $scope.body = requestResult.getBody(); //Should know the type of the body
    $scope.response = getContentType(requestResult.getResponse(), requestResult.getContentType());

});