const electron = require('electron');
const { app, BrowserWindow } = require('electron');
const dateFormat = require('dateformat');

const FileManager = require('./controller/FileManager.js');
const Logger = require('./controller/Logger.js');
const EventListener = require('./controller/EventListener.js');
const Ftp = require('./controller/Ftp.js');
const Core = require('./core.js');
const config = require('./config.js');

const { ipcMain } = require('electron');


const start_app = () => {
	if(EventListener.begin()) {
		ipcMain.on('connect', (event, arg) => {
			event.reply('connected', 1);
			EventListener.watcher.on('add', (path, stats) => {
				FileManager.ready(path, () => {
					let filename = path.split(config.syncFolder)[1];
					Ftp.file_exists(filename.substring(1, filename.length) + '.zip', (result) => {
						if(!result) {
							const files = [
								{
									path: path,
									filename: filename,
								}
							];
							FileManager.compress(files, filename + '.zip');
						}
					});
				});
			});
			EventListener.watcher_zip.on('add', (path, stats) => {
				Core.addItem({
					eventType: 'add',
					path: path,
					stats: stats,
					ipc_event: event,
					last_modify_date: {
						time: dateFormat(new Date(stats.mtime).getTime(), 'HH:MM:ss'),
						time_ms: dateFormat(new Date(stats.mtime).getTime(), 'HH:MM:ss:L'),
						date: dateFormat(new Date(stats.mtime).getTime(), 'isoDate'),
					},
				});
				event.reply('uploading', 0);
			});
		});
	} else {
		Logger.write('failed to start EventListener');
	}
};

app.on('ready', () => {
	// Create the browser window.
	let win = new BrowserWindow({
		center: true,
		width: 800,
		height: 600,
		frame: false,
		resizable: false,
	    webPreferences: {
	    	nodeIntegration: true,
	    	devTools: true,
	    }
	});

	// and load the index.html of the app.
	win.loadFile('./windows/index.html');
	start_app();
});