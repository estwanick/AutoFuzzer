app.controller('mainController', 
    ['$scope', '$location', 'ModalService', 'urlList', 'resultsCache', 'appConstants',
    function ($scope, $location, ModalService, urlList, resultsCache, appConstants) {
    let originalURL = "";
    $scope.delay = 1000;
    $scope.urlInput = "http://services.odata.org/Northwind/Northwind.svc/?$format=json";
    $scope.urlBatch = urlList.getURLs();
    $scope.method = appConstants.getDefaultMethod();
    $scope.methods = appConstants.getMethods();
    $scope.bodyType = "RAW";  
    $scope.paramList = [{}];
    $scope.headerList = [{}];
    $scope.headers = appConstants.getHeaders();
    $scope.sqlInjectionOptions = appConstants.getSqlInjection();
    $scope.xssOptions = appConstants.getXss();
    const allAttacks = appConstants.getAllAttacks();
    const attackCount = allAttacks.length;
    

    let aceEditor;
    $scope.aceLoaded = function(_editor) {
        aceEditor = _editor.getSession();
        aceEditor.setMode("ace/mode/text");
    };

    $scope.setEditor = function(mode){
        if(mode === 'XML'){
            $scope.bodyType = "XML";
            aceEditor.setMode('ace/mode/xml');
        }else if(mode === 'JSON'){
            $scope.bodyType = "JSON";
            aceEditor.setMode('ace/mode/json');
        }else{
            $scope.bodyType = "RAW";
            aceEditor.setMode('ace/mode/text');
        }
    };

    $scope.randomizeBody = function(){
        //TODO: Pass $scope.bodyType to this function instead of it being global
        //Read XML or JSON body and insert randomized fuzz into each field value
        let requestBody = aceEditor.getValue();
        //console.log($scope.bodyType + ":" + requestBody);
        if($scope.bodyType === "JSON"){ //catch valid json error
            //Convert to json
            try{
                let jObj = JSON.parse(requestBody);
            }catch (e){
                alert("Please enter valid JSON.");
            }
            
            //Replace values with junk
            for(let key in jObj){
                var attackValue = allAttacks[Math.floor((Math.random() * attackCount))];
                jObj[key] = attackValue.value;
                //Add option to traverse entire object
            }
            //convert back and display
            aceEditor.setValue(JSON.stringify(jObj));
            
        }else if($scope.bodyType === "XML"){
            //Parse xml into object
            let parser = new DOMParser();
            xmlDoc = parser.parseFromString(requestBody, "text/xml");
            nodes = xmlDoc.documentElement.childNodes;
            //Replace values with junk
            //convert back and display
            let randomString = "";
            for(let i = 0; i < 10; i++){
                randomString = randomString + allAttacks[Math.floor((Math.random() * attackCount))].value;
            }
            aceEditor.setValue(randomString);
            
        }else{
            let randomString = "";
            for(let i = 0; i < 10; i++){
                randomString = randomString + allAttacks[Math.floor((Math.random() * attackCount))].value;
            }
            aceEditor.setValue(randomString);
        }
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
                let attackValue = allAttacks[Math.floor((Math.random() * attackCount))];
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
                if(pKey || pValue){
                    paramString = "?" + pKey + "=" + pValue;
                }
            } else {
                paramString = paramString + "&" + pKey + "=" + pValue;
            }
        }

        if(oUrl.indexOf("?") != -1){
            newURL = oUrl.substring(0, oUrl.indexOf("?")) + paramString;
        }else{
            newURL = oUrl;
        }

        let cleanedHeaders = [];
        headers.forEach(function(hPair, index){
            if(Object.keys(hPair).length > 0){
                cleanedHeaders.push({
                    key: hPair.key,
                    value: hPair.value
                });
            }
        });

        $scope.urlBatch.push({
            url: newURL,
            method: method,
            headers: cleanedHeaders,
            body: requestBody
        });
        urlList.setURLs($scope.urlBatch);
    };

    $scope.showAModal = function(scope) {
        ModalService.showModal({
            templateUrl: "./templates/attackModal.html",
            controller: "modalController"
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                scope.param.value = result.value;
            });
        });
  };

  $scope.onHeaderSelected = function(value){
        let output = [];

        if(value.header.key.length <= 0){
            value.header.filterHeaders = output;
            return;
        }

        angular.forEach($scope.headers, function(header){
            if(header.toLowerCase().indexOf(value.header.key.toLowerCase()) >= 0){
                output.push(header);
            }
        });
        value.header.vis = true;
        value.header.filterHeaders = output;
    };

    $scope.fillHeader = function(newValue, header){
        header.key = newValue;
        header.vis = false;
    };

    //Might not need to redirect using $location since no longer using chrome app
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
}]);