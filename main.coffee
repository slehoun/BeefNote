app = require 'app'
BrowserWindow = require 'browser-window'
mainWindow = null

app.on 'window-all-closed', ->
  app.quit() unless process.platform is 'darwin'

app.on 'ready', ->
  mainWindow = new BrowserWindow {width: 800, height: 600, center: true, title: 'BeefNote', show: false}
  mainWindow.loadUrl("file://#{__dirname}/www/index.html")
  mainWindow.show()
  mainWindow.openDevTools()
  mainWindow.on 'closed', ->
    mainWindow = null
