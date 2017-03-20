app.controller('requestsController', function ($scope, $http, $location, $timeout,
    urlList, requestResult, resultsCache, requestHistory) {
    
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
            $http({
                method: reqURLs[counter].method,
                url: reqURLs[counter].url,
                headers: reqURLs[counter].headers,
                data:  reqURLs[counter].body
            })
            .then(function (response) {
                onRequestComplete(response, counter);
            }, function (response) {
                onRequestComplete(response, counter);
            });
        }, delay);
    }

    function onRequestComplete(response, index) {
        console.log(response);
        console.log(response.headers("Content-Type"));
        let requestObj = {
                "method": reqURLs[index].method,
                "headers": reqURLs[index].headers,
                "contentType": response.headers("Content-Type"),
                "url": reqURLs[index].url,
                "body": reqURLs[index].body,
                "data": response.data,
                "status": response.status,
                "text": response.statusText
            };

        $scope.requestList.push(requestObj);
        resultsCache.addRequest(requestObj);
        requestHistory.appendRequest(requestObj);
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

});