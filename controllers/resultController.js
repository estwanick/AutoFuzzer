app.controller('resultController', 
    ['$scope', '$http', '$routeParams', '$sce', 'requestResult',
    function ($scope, $http, $routeParams, $sce, requestResult) {
    $scope.url = requestResult.getURL();
    $scope.method = requestResult.getMethod();
    $scope.body = requestResult.getBody(); //Should know the type of the body
    let cType = requestResult.getContentType();
    $scope.contentType = cType;
    $scope.response = getContentType(requestResult.getResponse(), cType);
    $scope.headers = requestResult.getHeaders();

    // let trustedResponse = $sce.trustAsHtml(oResponse);
    // $scope.html = trustedResponse;

    function getContentType(content, contentType){
        if(contentType.includes("json")){
            return vkbeautify.json(content, 4);
        }else if(contentType.includes("xml")){
            return vkbeautify.xml(content, 4);
        }else if(contentType.includes("html")){
            $scope.html = $sce.trustAsHtml(content);
            return content;
        }else{
            return content;
        }
    }
}]);