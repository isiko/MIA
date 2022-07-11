const path = require("path");

const { app, BrowserWindow, ipcMain } = require("electron");

var handlers = []

handlers = handlers.concat(require('./IPCHandlers'))

// Setup Grlobals
global.isDev = require("electron-is-dev");
global.userDataPath = app.getPath("userData");

global.deviceList = undefined;
global.deviceListPath = userDataPath + "/devices.json";

global.settings = undefined;
global.settingsPath = userDataPath + "/settings.json";

// Setup Settings
const SettingsHandler = require('./SettingsHandler')
handlers = handlers.concat(SettingsHandler.handlers)

//Load Device List
const DeviceHandler = require('./DeviceHandler')
handlers = handlers.concat(DeviceHandler.handlers)

function createWindow() {
  // Create the browser window.
  const devtools = new BrowserWindow()
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      devTools: true,
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Open the DevTools.
  if (isDev) {
    win.webContents.setDevToolsWebContents(devtools.webContents)
    win.webContents.openDevTools({ mode: 'detach' })
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  console.log("App Ready");
  console.log("Loading Handlers");
  handlers.forEach(handler => {
    console.log(`Registering handler for ${handler.name}`);
    ipcMain.handle(handler.name, handler.handler)
  })
  createWindow();
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});