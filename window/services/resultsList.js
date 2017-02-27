app.service('resultsList', function() {
    var results = [];

    this.getResults = function() {
        return results;
    };

    this.setResults = function(resultsList) {
        results = resultsList;
    };

    this.appendResult = function(result){
        results.push(result);
    }
});