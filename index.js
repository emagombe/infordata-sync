const path = require('path');

const electron = require('electron');
const { app, BrowserWindow } = require('electron');
const dateFormat = require('dateformat');

const EventListener = require('./controller/EventListener.js');
const Core = require('./core.js');


app.on('ready', () => {

	if(EventListener.begin()) {
		EventListener.watcher.on('add', (path, stats) => {
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
		EventListener.watcher.on('change', (path, stats) => {
			Core.addItem({
				eventType: 'change',
				path: path,
				stats: stats,
				last_modify_date: {
					time: dateFormat(new Date(stats.mtime).getTime(), 'HH:MM:ss'),
					time_ms: dateFormat(new Date(stats.mtime).getTime(), 'HH:MM:ss:L'),
					date: dateFormat(new Date(stats.mtime).getTime(), 'isoDate'),
				},
			});
		});
		EventListener.watcher.on('unlink', (path) => {
			Core.addItem({
				eventType: 'unlink',
				path: path,
			});
		});
	} else {
		console.log('failed to start EventListener');
	}
});