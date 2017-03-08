app.service('requestResult', function() {
    let reqId = "";
    let reqUrl = "";
    let reqBody = "";
    let reqResponse = "";
    let reqMethod = "";
    let reqHeaders = [];

    this.getId = function() {
        return reqtUrl;
    };

    this.setId = function(index){
        reqId = index; 
    };

    this.getURL = function() {
        return reqUrl;
    };

    this.setURL = function(url){
        reqUrl = url; 
    };

    this.getResponse = function() {
        return reqResponse;
    };

    this.setResponse = function(response){
        reqResponse = response; 
    };

    this.getBody = function() {
        return reqBody;
    };

    this.setBody = function(body){
        reqBody = body; 
    };

    this.getMethod = function() {
        return reqMethod;
    };

    this.setMethod = function(method){
        reqMethod = method; 
    };

    this.getHeaders = function() {
        return reqHeaders;
    };

    this.setHeaders = function(headers){
        reqHeaders = headers; 
    };

});