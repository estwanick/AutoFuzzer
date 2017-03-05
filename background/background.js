chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('window/index.html', {
    'outerBounds': {
      "width" :   window.screen.availWidth,
      "height":   window.screen.availHeight 
    }
  });
});