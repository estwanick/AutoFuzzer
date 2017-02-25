app.controller('mainController', function($scope) {

    $scope.urlList = [];
    var originalURL = "";

    $scope.getParamsFromUrl = function(urlString) {  
        originalURL = new URL(urlString);
        var searchParams = new URLSearchParams(originalURL.search.slice(1));
        $scope.paramList = [];
        for(var param of searchParams){
            console.log(param);
            var oParam = {
                "key": param[0],
                "value": param[1]
            }
            $scope.paramList.push(oParam);
        }
        console.log($scope.paramList);
    };

    $scope.addToList = function(inputParams){
        console.log(inputParams);
        var paramString = "";
        var oldURL = originalURL.toString();
        var newURL = "";

        for(var param of $scope.paramList){
            //Add query params to url
            var urLFuzz = originalURL;
            if(!paramString){
                paramString = "?" + param.key + "=" + param.value;
            }else{
                paramString = paramString + "&" + param.key + "=" + param.value
            }
        }
        console.log(paramString);
        newURL = oldURL.substring(0, oldURL.indexOf("?")) + paramString;
        console.log(newURL);
        $scope.urlList.push(newURL);
        console.log($scope.urlList);
    };
});

//https://www.helloworld.com/?hello=world&bye=hi
//https://www.helloworld.com/?hello=world&bye=hi&job=yes