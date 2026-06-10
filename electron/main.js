const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;
let authWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    backgroundColor: '#0a0b10',
    icon: path.join(__dirname, '../src/assets/icon-only.png')
  });

  const startURL = isDev
    ? 'http://localhost:3000/welcome'
    : `file://${path.join(__dirname, '../out/welcome/index.html')}`;

  mainWindow.loadURL(startURL);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => (mainWindow = null));
}

function createAuthWindow(route) {
  if (authWindow) {
    authWindow.focus();
    return;
  }

  authWindow = new BrowserWindow({
    width: 500,
    height: 700,
    parent: mainWindow,
    modal: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    backgroundColor: '#0a0b10',
    autoHideMenuBar: true,
  });

  const startURL = isDev
    ? `http://localhost:3000/${route}`
    : `file://${path.join(__dirname, `../out/${route}/index.html`)}`;

  authWindow.loadURL(startURL);

  authWindow.once('ready-to-show', () => {
    authWindow.show();
  });

  authWindow.on('closed', () => (authWindow = null));
}

app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

ipcMain.on('open-login', () => {
  createAuthWindow('login');
});

ipcMain.on('open-signup', () => {
  createAuthWindow('signup');
});

ipcMain.on('auth-success', () => {
  if (authWindow) {
    authWindow.close();
  }
  
  if (mainWindow) {
    const homeURL = isDev
      ? 'http://localhost:3000/home'
      : `file://${path.join(__dirname, '../out/home/index.html')}`;
    mainWindow.loadURL(homeURL);
  }
});
