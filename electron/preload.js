const { contextBridge, ipcMain, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('settings', {
  get: () => ipcRenderer.invoke('settings:get'),
  set: (settingIndex, sectionIndex, selectedIndex) => ipcRenderer.invoke('settings:change', settingIndex, sectionIndex, selectedIndex)
})

contextBridge.exposeInMainWorld('devices', {
  get: () => ipcRenderer.invoke('devices:get'),
  getMessageLog: (deviceID) => ipcRenderer.invoke('devices:getMessageLog', deviceID),
  onUpdate: (callback) => ipcRenderer.on('devices:update', callback),
})

contextBridge.exposeInMainWorld('plugins', {
  getStats: (id) => ipcRenderer.invoke('plugins:getStats', id),
})

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
  // we can also expose variables, not just functions
})