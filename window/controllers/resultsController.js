app.controller('resultsController', function($scope, $location, urlList) {

    console.log("Results Controller");
    console.log(urlList.getURLs());    

});

//https://www.helloworld.com/?hello=world&bye=hi
//https://www.helloworld.com/?hello=world&bye=hi&job=yes