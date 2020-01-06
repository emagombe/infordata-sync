const electron = require('electron');
const { app, BrowserWindow } = require('electron');
const path = require('path');
const FileSystem = require('./controller/fileSystem.js');


app.on('ready', () => {
	// const win = new BrowserWindow({
	// 	width: 800,
	//     height: 600,
	//     webPreferences: {
	//     	nodeIntegration: true
	//     }
	// });
	// win.loadFile(path.join(__dirname) + '/pages/index.html');

	//console.log(FileSystem.getMyDocFolder());
	FileSystem.watch();
});