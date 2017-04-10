app.service('requestHistory', function() {
    let history = [];

    this.getHistory = function() {
        return history;
    };

    this.setHistory = function(list){
        history = list;
    };

    this.appendRequest = function(request){
        history.push(request);
    };
});