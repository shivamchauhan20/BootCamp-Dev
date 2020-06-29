const electron = require('electron');
const app = electron.app;
const ejs = require('ejs-electron');

ejs.data({
    'title':"My Excel-1",
    "rows":100,
    "cols":26
})

function createWindow(){
    const win = new electron.BrowserWindow({
        width:800,
        height:600,
        show:false,
        webPreferences:{
            nodeIntegration:true
        }
    })
    
    win.loadFile("index.ejs").then(function(){
        //to remove default menu
        win.removeMenu();
        //to maximize the window
        win.maximize();
        //unhide the app so user could view it
        win.show();
        //to open dev tools
        win.webContents.openDevTools();
    })
}
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
