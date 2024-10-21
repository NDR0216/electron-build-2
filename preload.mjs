import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    onWindowEvent: (callback) => {
        ipcRenderer.on('window-event', (event, arg) => {
            callback(arg);
        });
    }
});