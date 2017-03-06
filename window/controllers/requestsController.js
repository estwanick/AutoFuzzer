app.controller('requestsController', function ($scope, $http, $location, $timeout,
    urlList, requestResult, resultsCache) {
    
    let reqURLs = urlList.getURLs();
    let delay = urlList.getDelay();
    let cachedResults = resultsCache.getResults();

    if(reqURLs.length > 0 && resultsCache.getNewDataFlag()){
        $scope.requestList = [];
        delayedRequest(0);
    }else{
        console.log("Nothing new to see here");
        $scope.requestList = cachedResults;
    }
 
    function delayedRequest(counter) {
        $timeout(function () {
            //If request is successfull increment and continue
            //If request fails try again
            if(reqURLs[counter].method === "GET"){
                $http.get(reqURLs[counter].url)
                .then(function (response) {
                    onRequestComplete(response, counter);
                }, function (response) {
                    onRequestComplete(response, counter);
                });
            }else if(reqURLs[counter].method === "POST"){
                $http.post(reqURLs[counter].url, reqURLs[counter].body)
                .then(function (response) {
                    onRequestComplete(response, counter);
                }, function (response) {
                    onRequestComplete(response, counter);
                });
            }else{
                console.log("request has no method");
                counter++;
            }
        }, delay);
    }

    function onRequestComplete(response, index) {
        console.log(response);
        let requestObj = {
                "method": reqURLs[index].method,
                "url": reqURLs[index].url,
                "body": reqURLs[index].body,
                "data": response.data,
                "status": response.status,
                "text": response.statusText
            };

        $scope.requestList.push(requestObj);
        resultsCache.addRequest(requestObj);

        index++;
        if (index < reqURLs.length) {
            delayedRequest(index);
        }
    }

    $scope.retryBatch = function () {
        $scope.requestList = [];
        resultsCache.setNewDataFlag(true);
        urlCounter = 0;
        delayedRequest(0);
    };

    $scope.viewRequest = function(url){
        let path = "result/" + url;
        $location.path(path);
    };

    $scope.viewResult = function(oRequest){
        requestResult.setURL(oRequest.url);
        requestResult.setMethod(oRequest.method);
        requestResult.setBody(oRequest.body);
        requestResult.setResponse(oRequest.data);

        let path = "result/" + oRequest.url;
        $location.path(path);
    };

});