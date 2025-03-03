const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');


let mainWindow; // Declare mainWindow in the outer scope

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    //frame: false,
    icon: path.join(__dirname, 'logo.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadURL('https://chat.mistral.ai'); // Replace with the URL you want to wrap
}

app.whenReady().then(() => {
  createWindow();

  // Create the tray icon
  tray = new Tray(path.join(__dirname, 'logo.png'));
  tray.setToolTip('Le Chat');

  // Create a context menu for the tray icon
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', type: 'normal', click: () => { mainWindow.show(); } },
    { label: 'Quit', type: 'normal', role: 'quit' }
  ]);

  tray.setContextMenu(contextMenu);

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
