const wincmd = require('node-windows');
const electron = require('electron');
const { app, BrowserWindow } = require('electron');
const service = require('./service.js');
const App = require('./controller/App.js');

const { ipcMain } = require('electron');

app.on('ready', () => {
	//App.update(null); // if param is null, creates a app.json file with default config
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