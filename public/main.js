const { app, BrowserWindow } = require("electron");
const path = require("node:path");

require("@electron/remote/main").initialize();

function createSplashScreen() {
  splashScreen = new BrowserWindow({
    width: 500,
    height: 500,
    frame: false,
    alwaysOnTop: true,
  });
  splashScreen.loadFile(path.join(__dirname, "/splash/splash.html")); // Path to your splash screen file
  splashScreen.on("closed", () => (splashScreen = null));
}

const createWindow = () => {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    frame: false,
    webPreferences: {
      enableRemoteModule: true,
    },
  });

  win.loadURL("http://localhost:3000");
  win.once('ready-to-show', () => {
    splashScreen.destroy() // Destroy the splash screen
    win.show(); // Show the main window
  });
};

app.on('ready', () => {
  createSplashScreen();
  createWindow();
});