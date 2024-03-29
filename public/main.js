const path = require("path");
const { app, BrowserWindow, Notification} = require("electron");
const isDev = require("electron-is-dev");
const { ipcMain } = require('electron');


function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    minWidth:750,
    minHeight:500,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
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
    win.webContents.openDevTools({ mode: "detach" });
  }
  ipcMain.on('full:screen', (event, data) => {
    win.maximize();
  });
   
  ipcMain.on('set:down', (event, data) => {
    win.minimize();
  });

  const NOTIFICATION_TITLE = 'Basic Notification'
  const NOTIFICATION_BODY = 'Notification from the Main process'

  function showNotification () {
    new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
  }

  ipcMain.on('notify', () => {
    console.log("notf")
    //showNotification()
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () =>{
  createWindow()
})

ipcMain.on('exit', (event, data) => {
  app.quit();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on('exit', (event, message) => { 
  console.log(message) 
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.