app.controller('historyController', function ($scope, $http, requestHistory) {
    let recentHistory = requestHistory.getHistory().slice().reverse();
    $scope.historyList = recentHistory;
    $scope.clearHistory = function (){
        requestHistory.setHistory([]);
        $scope.historyList = [];
    };
});