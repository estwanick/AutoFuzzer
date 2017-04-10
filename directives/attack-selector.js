app.directive("attackSelector", function(appConstants) {
    return {
        restrict: 'AE',
        templateUrl: 'templates/attackSelector.html',
        scope: {
            field: "="
        },
        link: function (scope) {
            scope.sqlInjectionOptions = appConstants.getSqlInjection();
            scope.xssOptions = appConstants.getXss();
            scope.setAttack = function (field, value) {
                console.log(field + ":" + value);
                scope.field = value;
            };
        }
    };
});