app.controller('mainController', function ($scope, $location, urlList, resultsCache, appConstants) {
    $scope.model = "GET";
    $scope.delay = 1000;
    $scope.urlInput = "http://services.odata.org/Northwind/Northwind.svc/?$format=json";
    $scope.urlBatch = urlList.getURLs();
    $scope.method = appConstants.getDefaultMethod();
    $scope.methods = appConstants.getMethods();
    $scope.sqlInjectionOptions = appConstants.getSqlInjection();
    $scope.xssOptions = appConstants.getXss();
    $scope.paramList = [{}];
    $scope.headerList = [{}];
    let originalURL = ""; //change this
    const allAttacks = $scope.sqlInjectionOptions.concat($scope.xssOptions);

    $scope.startFuzzing = function (delay) {
        resultsCache.setNewDataFlag(true);
        urlList.setDelay(delay);
        $location.path("requests");
    };

    $scope.viewResults = function (){
        resultsCache.setNewDataFlag(false);
        $location.path("requests");
    };

    $scope.getParamsFromUrl = function (urlString) {
        originalURL = new URL(urlString);
        let searchParams = new URLSearchParams(originalURL.search.slice(1));
        $scope.paramList = [];
        for (let param of searchParams) {
            //console.log(param);
            $scope.paramList.push({
                "key": param[0],
                "value": param[1]
            });
        }
    };

    $scope.randomizeValues = function(paramsList){
        const pLength = allAttacks.length;
        paramsList.forEach(
            function(param){
                var attackValue = allAttacks[Math.floor((Math.random() * pLength))];
                console.log(attackValue);
                param.value = attackValue;
            }
        );
    };

    $scope.addGET = function (oUrl, inputParams, method, headers) {

        let paramString = "";
        let newURL = "";

        if (!inputParams || inputParams.length < 0) {
            $scope.urlBatch.push({
                url: oUrl,
                method: method
            });
            urlList.setURLs($scope.urlBatch);
            return;
        }

        for (let param of $scope.paramList) {
            //Add query params to url
            let urLFuzz = originalURL;
            if (!paramString) {
                paramString = "?" + param.key + "=" + param.value;
            } else {
                paramString = paramString + "&" + param.key + "=" + param.value
            }
        }
        //console.log(paramString);
        if(oUrl.indexOf("?") != -1){
            newURL = oUrl.substring(0, oUrl.indexOf("?")) + paramString;
        }else{
            newURL = oUrl;
        }
        
        //console.log(newURL);
        $scope.urlBatch.push({
            url: newURL,
            method: method,
            headers: headers
        });
        urlList.setURLs($scope.urlBatch);
        //console.log($scope.urlBatch);
    };

    $scope.addPOST = function(oUrl, requestBody, method, headers){
        $scope.urlBatch.push({
            url: oUrl,
            method: method,
            body: requestBody,
            headers: headers
        });
        console.log($scope.urlBatch);
        urlList.setURLs($scope.urlBatch);
    };

    $scope.addParameter = function (inputParams) {
        inputParams.push({});
    };

    $scope.insertAttack = function(paramIndex, attackText){
        $scope.paramList[paramIndex].value = attackText;
    };

    $scope.removeItem = function (array, index) {
        array.splice(index, 1);
    };

    $scope.emptyBatch = function(){
        $scope.urlBatch = [];
        urlList.setURLs($scope.urlBatch);
    };
});