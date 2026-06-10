const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  openLogin: () => ipcRenderer.send('open-login'),
  openSignup: () => ipcRenderer.send('open-signup'),
  notifyAuthSuccess: () => ipcRenderer.send('auth-success'),
});
