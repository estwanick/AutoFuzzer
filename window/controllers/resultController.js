function getContentType(content, contentType){
    if(contentType.includes("json")){
        return vkbeautify.json(content, 4);
    }else if(contentType.includes("xml")){
        return vkbeautify.xml(content, 4);
    }else if(contentType.includes("html")){
        return vkbeautify.html(content, 4);
    }else{
        return content;
    }
}

app.controller('resultController', function ($scope, $http, $routeParams, requestResult) {
    console.log("Result controller");
    $scope.url = requestResult.getURL();
    $scope.method = requestResult.getMethod();
    $scope.body = requestResult.getBody(); //Should know the type of the body
    $scope.response = getContentType(requestResult.getResponse(), requestResult.getContentType());
    $scope.headers = requestResult.getHeaders();
});