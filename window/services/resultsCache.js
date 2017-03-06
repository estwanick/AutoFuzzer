app.service('resultsCache', function() {
    let results = [];
    let newDataFlag = false;

    this.getResults = function() {
        return results ;
    };

    this.setResults = function(list){
        results = list;
    };

    this.addRequest = function(request){
        results.push(request);
    };

    this.setNewDataFlag = function(boolValue){
        if(boolValue) results = [];
        newDataFlag = boolValue;
    };

    this.getNewDataFlag = function(){
        return newDataFlag;
    };

});