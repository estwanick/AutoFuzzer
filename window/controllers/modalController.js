app.controller('modalController', function ($scope, $element, close, appConstants) {

    let sqlInjectionOptions = appConstants.getSqlInjection();
    let xssOptions = appConstants.getXss();
    let custom = appConstants.getCustom();
    let allAttacks = appConstants.getAllAttacks();
    $scope.attackList = allAttacks;
    //$scope.attackList = $scope.sqlInjectionOptions.concat($scope.xssOptions);

    $scope.filterBy = function (filter) {
        //ad-hoc filter
        if(filter === "SQL"){
            $scope.attackList = sqlInjectionOptions;
        }else if(filter === "XSS"){
            $scope.attackList = xssOptions;
        }else if(filter === "OTHER"){
            $scope.attackList = custom;
        }else if(filter === "ALL"){
            $scope.attackList = allAttacks;
        }else{
            $scope.attackList = allAttacks;
        }
    },

    $scope.close = function (attackValue) {
        close({
            value: attackValue// get value from dropdown
        }, 500); // close, but give 500ms for bootstrap to animate
    };

    $scope.cancel = function () {
        $element.modal('hide');
    };

});