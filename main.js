// Generated by CoffeeScript 1.9.3
var BrowserWindow, app, mainWindow;

app = require('app');

BrowserWindow = require('browser-window');

mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    return app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });
  mainWindow.loadUrl("file://" + __dirname + "/www/index.html");
  mainWindow.openDevTools();
  return mainWindow.on('closed', function() {
    return mainWindow = null;
  });
});
