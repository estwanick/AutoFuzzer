app.directive("attackSelector", function(appConstants) {
    return {
        restrict: 'AE',
        templateUrl: 'templates/attackSelector.html',
        scope: {
            field: "="
        },
        link: function (scope) {
            scope.numberValues = appConstants.getNumbers();
            scope.stringValues = appConstants.getStrings();
            scope.dateValues = appConstants.getDates();
            scope.setAttack = function (field, value) {
                scope.field = value;
            };
        }
    };
});