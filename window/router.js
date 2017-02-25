app.config(function($routeProvider, $compileProvider) {

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);

    $routeProvider
    .when("/", {
        templateUrl : "templates/main.html",
        controller: "mainController"
    })
    .when("/results", {
        templateUrl : "templates/results.html",
        controller: "resultsController"
    });
});