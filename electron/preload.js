const { contextBridge, ipcMain, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('settings', {
  get: () => ipcRenderer.invoke('settings:get'),
  set: (settingIndex, sectionIndex, selectedIndex) => ipcRenderer.invoke('settings:change', settingIndex, sectionIndex, selectedIndex)
})

contextBridge.exposeInMainWorld('devices', {
  get: () => ipcRenderer.invoke('devices:get')
})

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
  // we can also expose variables, not just functions
})