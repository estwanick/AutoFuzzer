app.controller('requestsController', 
    ['$scope','$http','$location','$timeout','urlList','requestResult','resultsCache','requestHistory', 
    function ($scope, $http, $location, $timeout,
    urlList, requestResult, resultsCache, requestHistory) {
    
    let reqURLs = urlList.getURLs();
    let delay = urlList.getDelay();
    let cachedResults = resultsCache.getResults();
    let cTimer;

    if(reqURLs.length > 0 && resultsCache.getNewDataFlag()){
        $scope.requestList = [];
        delayedRequest(0, delay);
    }else{
        console.log("Nothing new to see here");
        $scope.requestList = cachedResults;
    }

    $scope.stop = function(){
        $timeout.cancel(cTimer);
    };
 
    //Modify this to take delay as parameter and retry request counter
    function delayedRequest(counter, reqDelay) {
        cTimer = $timeout(function () {
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
            });//check (catch) for chrome DOS
        }, counter  === 0 ? 0 : reqDelay);
    }

    let errDelay = delay;

    function onRequestComplete(response, index) {
        console.log(response);

        //This needs to be tested
        if(response.status == -1){
            //Counter retries, if retry > 3, move on to something else
            errDelay = errDelay + 500;
            console.log("Repeat: " + index);
            console.log("Delay: " + errDelay);
            delayedRequest(index, errDelay); //repeat request with increased delay
            return;
        }else{
            errDelay = delay; //Reset errDelay to default
            //Reset error retry counter 
        }

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
            delayedRequest(index, delay);
        }
    }

    $scope.retryBatch = function (reqList) {
        if(reqList.length <= 0){
            return;
        }
        $scope.requestList = [];
        resultsCache.setNewDataFlag(true);
        urlCounter = 0;
        delayedRequest(0, delay);
    };

    $scope.viewResult = function(oRequest){
        requestResult.setURL(oRequest.url);
        requestResult.setMethod(oRequest.method);
        requestResult.setBody(oRequest.body);
        requestResult.setResponse(oRequest.data);
        requestResult.setHeaders(oRequest.headers);
        requestResult.setContentType(oRequest.contentType);
        let path = "result/" + "RANDOMKEY"; //TODO:// Generate some random request id ..
        $location.path(path);
    };

    $scope.clearBatch = function(results){
        $scope.requestList = [];
    };

}]);
