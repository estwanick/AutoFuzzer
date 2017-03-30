app.controller('mainController', 
    ['$scope', '$location', 'ModalService', 'urlList', 'resultsCache', 'appConstants',
    function ($scope, $location, ModalService, urlList, resultsCache, appConstants) {
    $scope.delay = 1000;
    $scope.urlInput = "http://services.odata.org/Northwind/Northwind.svc/?$format=json";
    $scope.urlBatch = urlList.getURLs();
    $scope.method = appConstants.getDefaultMethod();
    $scope.methods = appConstants.getMethods();
    $scope.bodyType = "XML";
    $scope.sqlInjectionOptions = appConstants.getSqlInjection();
    $scope.xssOptions = appConstants.getXss();
    $scope.paramList = [{}];
    $scope.headerList = [{}];
    let originalURL = ""; //change this
    const allAttacks = $scope.sqlInjectionOptions.concat($scope.xssOptions);
    const pLength = allAttacks.length;

    let aceEditor;
    let bodyType;
    $scope.aceLoaded = function(_editor) {
        aceEditor = _editor.getSession();
        aceEditor.setMode("ace/mode/xml");
    };

    $scope.setEditor = function(mode){
        if(mode === 'XML'){
            bodyType = "XML";
            aceEditor.setMode('ace/mode/xml');
        }else if(mode === 'JSON'){
            bodyType = "JSON";
            aceEditor.setMode('ace/mode/json');
        }else{
            bodyType = "RAW";
            aceEditor.setMode('ace/mode/text');
        }
    };

    $scope.randomizeBody = function(){
        //TODO: Pass bodyType to this function instead of it being global
        //Read XML or JSON body and insert randomized fuzz into each field value
        let requestBody = aceEditor.getValue();
        console.log(bodyType + ":" + requestBody);
        if(bodyType === "JSON"){
            //Convert to json
            let jObj = JSON.parse(requestBody);
            //Replace values with junk
            for(let key in jObj){
                var attackValue = allAttacks[Math.floor((Math.random() * pLength))];
                jObj[key] = attackValue.value;
                //Add option to traverse entire object
            }
            //convert back and display
            aceEditor.setValue(JSON.stringify(jObj));
            
        }else if(bodyType === "XML"){
            //Parse xml into object 
            //Replace values with junk
            //convert back and display
            
        }
    };

    $scope.startFuzzing = function (delay) {
        resultsCache.setNewDataFlag(true);
        urlList.setDelay(delay);
        $location.path("requests");
    };

    $scope.viewResults = function (){
        resultsCache.setNewDataFlag(false);
        $location.path("requests");
    };

    $scope.viewHistory = function (){
        $location.path("history");
    };

    $scope.getParamsFromUrl = function (urlString, pList) {    
        pList.length = 0;  
        if(urlString.length <= 0){
            pList.push({
                "key": "",
                "value": ""
            });
            return;
        }else{
            originalURL = new URL(urlString);
        }

        let searchParams = new URLSearchParams(originalURL.search.slice(1));
        //pList = []; //why is this here

        for (let param of searchParams) {
            //console.log(param);
            pList.push({
                "key": param[0],
                "value": param[1]
            });
        }
        //If no PARAMS -> Leave a blank row
        if(pList.length <= 0){
            pList.push({
                "key": "",
                "value": ""
            });
        }
    };

    $scope.randomizeValues = function(paramsList){
        paramsList.forEach(
            function(param){
                let attackValue = allAttacks[Math.floor((Math.random() * pLength))];
                param.value = attackValue.value;
            }
        );
    };

    $scope.addRequest = function (oUrl, inputParams, method, headers, requestBody) {

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
            let pKey = param.key || '';
            let pValue = param.value || '';
            //check for blank params
            if (!paramString) {
                paramString = "?" + pKey + "=" + pValue;
            } else {
                paramString = paramString + "&" + pKey + "=" + pValue;
            }
        }
        //console.log(paramString);
        if(oUrl.indexOf("?") != -1){
            newURL = oUrl.substring(0, oUrl.indexOf("?")) + paramString;
        }else{
            newURL = oUrl;
        }

        //Deep copy
        let newHeaders = headers.map(a => Object.assign({}, a));
        newHeaders.forEach(function(hPair, index){
            if((Object.keys(hPair).length === 0 && hPair.constructor === Object) || 
               (hPair.key === '' && hPair.value === '')){
                newHeaders.splice(index, 1);
            }
        });

        $scope.urlBatch.push({
            url: newURL,
            method: method,
            headers: newHeaders,
            body: requestBody
        });
        urlList.setURLs($scope.urlBatch);
        console.log($scope.urlBatch);
    };

    $scope.addParameter = function (inputParams) {
        inputParams.push({});
    };

    $scope.removeItem = function (array, index) {
        array.splice(index, 1);
    };

    $scope.emptyBatch = function(){
        $scope.urlBatch = [];
        urlList.setURLs($scope.urlBatch);
    };

    $scope.showAModal = function(scope) {
        console.log(scope);
        ModalService.showModal({
            templateUrl: "./templates/attackModal.html",
            controller: "modalController"
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                console.log(result);
                scope.param.value = result.value;
            });
        });
  };

}]);