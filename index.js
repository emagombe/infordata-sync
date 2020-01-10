const electron = require('electron');
const { app, BrowserWindow } = require('electron');
const dateFormat = require('dateformat');

const FileManager = require('./controller/FileManager.js');
const EventListener = require('./controller/EventListener.js');
const Ftp = require('./controller/Ftp.js');
const Core = require('./core.js');
const config = require('./config.js');


app.on('ready', () => {
	if(EventListener.begin()) {
		EventListener.watcher.on('add', (path, stats) => {
			FileManager.ready(path, () => {
				let filename = path.split(config.syncFolder)[1];
				if(!Ftp.file_exists(filename.substring(1, filename.length) + '.zip')) {
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
		EventListener.watcher_zip.on('add', (path, stats) => {
			Core.addItem({
				eventType: 'add',
				path: path,
				stats: stats,
				last_modify_date: {
					time: dateFormat(new Date(stats.mtime).getTime(), 'HH:MM:ss'),
					time_ms: dateFormat(new Date(stats.mtime).getTime(), 'HH:MM:ss:L'),
					date: dateFormat(new Date(stats.mtime).getTime(), 'isoDate'),
				},
			});
		});
	} else {
		console.log('failed to start EventListener');
	}
});