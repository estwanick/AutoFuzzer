app.controller('mainController', function ($scope, $location, urlList) {
    $scope.model = "GET";
    $scope.delay = 1000;
    $scope.urlInput = "http://services.odata.org/Northwind/Northwind.svc/?$format=json";
    $scope.urlBatch = urlList.getURLs();
    $scope.method = "GET";
    $scope.methods = ["GET", "POST"];
    $scope.paramList = [];
    var originalURL = "";

    $scope.startFuzzing = function (delay) {
        //urlList.setOriginalURL();
        urlList.setDelay(delay);
        $location.path("requests");
    };

    $scope.getParamsFromUrl = function (urlString) {
        originalURL = new URL(urlString);
        var searchParams = new URLSearchParams(originalURL.search.slice(1));
        $scope.paramList = [];
        for (var param of searchParams) {
            //console.log(param);
            $scope.paramList.push({
                "key": param[0],
                "value": param[1]
            });
        }
    };

    $scope.addParameter = function (inputParams) {
        inputParams.push({});
    };

    $scope.removeItem = function (array, index) {
        array.splice(index, 1);
    };

    $scope.addGET = function (oUrl, inputParams, method) {

        var paramString = "";
        var newURL = "";

        if (!inputParams || inputParams.length < 0) {
            $scope.urlBatch.push({
                url: oUrl,
                method: method
            });
            urlList.setURLs($scope.urlBatch);
            return;
        }

        for (var param of $scope.paramList) {
            //Add query params to url
            var urLFuzz = originalURL;
            if (!paramString) {
                paramString = "?" + param.key + "=" + param.value;
            } else {
                paramString = paramString + "&" + param.key + "=" + param.value
            }
        }
        //console.log(paramString);
        newURL = oUrl.substring(0, oUrl.indexOf("?")) + paramString;
        //console.log(newURL);
        $scope.urlBatch.push({
            url: newURL,
            method: method
        });
        urlList.setURLs($scope.urlBatch);
        //console.log($scope.urlBatch);
    };

    $scope.addPOST = function(oUrl, requestBody, method){
        $scope.urlBatch.push({
            url: oUrl,
            method: method,
            body: requestBody
        });
        urlList.setURLs($scope.urlBatch);
    };

    //Configuration for JSON Editor
    $scope.postBody = {
        "test": "fuzz"
    };
    $scope.configuration = {
        "editable": false,
        "viewButtonClass": "btn-info",
        "editButtonClass": "btn-success"
    };
    $scope.options = {
        "mode": "code",
        "modes": [
            "code",
            "text"
        ],
        "history": false
    };

});

//https://www.helloworld.com/?hello=world&bye=hi
//https://www.helloworld.com/?hello=world&bye=hi&job=yes