app.controller('resultsController', function ($scope, $http, $location, $timeout,
    urlList) {
    //Zero out the results
    $scope.requestList = [];
    console.log("Results Controller");
    console.log(urlList.getURLs());

    var reqURLs = urlList.getURLs();
    var delay = urlList.getDelay();
 
    function delayedRequest(counter) {
        $timeout(function () {
            //If request is successfull increment and continue
            //If request fails try again
            $http.get(reqURLs[counter])
                .then(function (response) {
                    onRequestComplete(response, counter);
                }, function (response) {
                    onRequestComplete(response, counter);
                });
            //Add support for GET/POST/ETC

        }, delay);
    }

    function onRequestComplete(response, index) {
        $scope.requestList
            .push({
                "url": reqURLs[index],
                "status": response.status,
                "text": response.statusText
            });
        index++;
        if (index < reqURLs.length) {
            delayedRequest(index);
        }
    }

    delayedRequest(0);

    $scope.retryBatch = function () {
        $scope.requestList = [];
        urlCounter = 0;
        delayedRequest();
    };
});

//https://www.helloworld.com/?hello=world&bye=hi
//https://www.helloworld.com/?hello=world&bye=hi&job=yes