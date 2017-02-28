app.config(function($routeProvider, $compileProvider, $sceDelegateProvider) {

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);

    $sceDelegateProvider.resourceUrlWhitelist(['**']);

    $routeProvider
    .when("/", {
        templateUrl : "templates/main.html",
        controller: "mainController"
    })
    .when("/requests", {
        templateUrl : "templates/requests.html",
        controller: "requestsController"
    })
    .when("/result/:url*", {
        templateUrl : "templates/result.html",
        controller: "resultController"
    });
});