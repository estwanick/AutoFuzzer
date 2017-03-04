app.controller('requestsController', function ($scope, $http, $location, $timeout,
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
        $scope.requestList
            .push({
                "method": reqURLs[index].method,
                "url": reqURLs[index].url,
                "data": response.data,
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
        delayedRequest(0);
    };

    $scope.viewRequest = function(url){
        var path = "result/" + url;
        $location.path(path);
    };
});

//https://www.helloworld.com/?hello=world&bye=hi
//https://www.helloworld.com/?hello=world&bye=hi&job=yes