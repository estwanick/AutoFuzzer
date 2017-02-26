app.controller('resultsController', function($scope, $location, $timeout, urlList) {

    $scope.requestList = [];
    console.log("Results Controller");
    console.log(urlList.getURLs());   

    var reqURLs = urlList.getURLs();
    var numURLs = urlList.getURLs().length;
    var delay = urlList.getDelay();
    var urlCounter = 0;
    console.log(numURLs);
    console.log(delay);


    function delayedRequest(){
        $timeout(function () {
            console.log(urlCounter);
            console.log(reqURLs[urlCounter]);
            $scope.requestList.push(reqURLs[urlCounter]);
            //initiation http delayedRequest
            //If request is successfull increment and continue
            //If request fails try again
            urlCounter++;                     
            if (urlCounter < numURLs) {            
                delayedRequest();             
            }                        
        }, delay);
    }

    delayedRequest();
});

//https://www.helloworld.com/?hello=world&bye=hi
//https://www.helloworld.com/?hello=world&bye=hi&job=yes