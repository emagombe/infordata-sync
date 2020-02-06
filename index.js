const wincmd = require('node-windows');
const electron = require('electron');
const { app, BrowserWindow } = require('electron');
const service = require('./service.js');

const { ipcMain } = require('electron');

app.on('ready', () => {
	service();
	// Create the browser window.
	// let win = new BrowserWindow({
	// 	center: true,
	// 	width: 800,
	// 	height: 600,
	// 	frame: false,
	// 	resizable: false,
	//     webPreferences: {
	//     	nodeIntegration: true,
	//     	devTools: true,
	//     }
	// });
	// // and load the index.html of the app.
	// win.loadFile('./windows/index.html');
});