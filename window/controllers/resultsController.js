app.controller('resultsController', function ($scope, $http, $location, $timeout, 
                                                urlList, resultsList) {
    //Zero out the results
    resultsList.setResults([]);
    $scope.requestList = [];
    console.log("Results Controller");
    console.log(urlList.getURLs());

    var reqURLs = urlList.getURLs();
    var numURLs = urlList.getURLs().length;
    var delay = urlList.getDelay();
    var urlCounter = 0;

    console.log(numURLs);
    console.log(delay);

    function delayedRequest() {
        $timeout(function () {
            //console.log(urlCounter);
            console.log(reqURLs[urlCounter]);
            //initiation http delayedRequest
            //If request is successfull increment and continue
            //If request fails try again
            $http.get(reqURLs[urlCounter])
                .then(function(response) {
                    var requestObj = {};
                    requestObj.url = reqURLs[urlCounter];
                    requestObj.status = response.status;
                    requestObj.text = response.statusText;
                    console.log(response);  
                    resultsList.appendResult(requestObj);
                    $scope.requestList = resultsList.getResults();
                    urlCounter++;
                    if (urlCounter < numURLs) {
                        delayedRequest();
                    }

                }, function(response) {
                    var requestObj = {};
                    requestObj.url = reqURLs[urlCounter];
                    requestObj.status = response.status;
                    console.log(response); 
                    requestObj.text = response.statusText;
                    $scope.requestList.push(requestObj);
                    $scope.requestList = resultsList.getResults();
                    //Add something to recall request if timeout/failure
                    urlCounter++;
                    if (urlCounter < numURLs) {
                        delayedRequest();
                    }
                });
                //Add support for GET/POST/ETC
            
        }, delay);
    }

    delayedRequest();

    $scope.retryBatch = function () {
        $scope.requestList = [];
        resultsList.setResults([]);
        urlCounter = 0;
        delayedRequest();
    };
});

//https://www.helloworld.com/?hello=world&bye=hi
//https://www.helloworld.com/?hello=world&bye=hi&job=yes