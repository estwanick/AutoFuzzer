app.controller('historyController', 
    ['$scope', '$http', '$location', 'requestHistory', 'requestResult',
    function ($scope, $http, $location, requestHistory, requestResult) {
    let recentHistory = requestHistory.getHistory().slice().reverse();
    $scope.historyList = recentHistory;
    $scope.clearHistory = function (){
        requestHistory.setHistory([]);
        $scope.historyList = [];
    };
    $scope.viewResult = function(oRequest){
        requestResult.setURL(oRequest.url);
        requestResult.setMethod(oRequest.method);
        requestResult.setBody(oRequest.body);
        requestResult.setResponse(oRequest.data);
        requestResult.setHeaders(oRequest.headers);
        requestResult.setContentType(oRequest.contentType);
        let path = "result/" + oRequest.url;
        $location.path(path);
    };
}]);