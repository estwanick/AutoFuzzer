chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('window/index.html', {
    'outerBounds': {
      'width': 2000,
      'height': 2000
    }
  });
});