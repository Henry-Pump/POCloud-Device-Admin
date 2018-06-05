const electron = require('electron');

const { app, BrowserWindow } = electron;

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
  });
  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});
