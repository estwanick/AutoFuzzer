app.service('urlList', function() {
    let urlList = [];
    let delay = 0;
    let originalURL= "";

    this.getURLs = function() {
        return urlList;
    };

    this.setURLs = function(list){
        urlList = list;
    };

    this.getDelay = function(){
        return delay;
    };

    this.setDelay = function(dTime){
        delay = dTime;
    };

    this.getOrginalURL = function(){
        return originalURL;
    };

    this.setOriginalURL = function(url){
        originalURL = url;
    };

});