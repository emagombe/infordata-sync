const fs = require('fs');
const Sync = require('./sync.js');
const dateFormat = require('dateformat');

class FileSystem {

	constructor() {
		//this.document_folder = process.env.USERPROFILE+'\\Documents';
	}
	static getMyDocFolder() {
		return process.env.USERPROFILE + '\\Documents';
	}

	static folderName() {
		return this.getMyDocFolder() + '\\infordataSync';
	}

	static watch() {
		const stop = fs.watch(this.folderName(), {
			persistent: true,
			recursive: true,
		}, (eventType, filename) => {
			const path = `${this.folderName()}\\${filename}`;
			if(fs.existsSync(path) && fs.lstatSync(path).isFile()) {
				const file = fs.lstatSync(path);
				fs.watchFile(path, (curr, prev) => {
					let query = {
						filename: filename,
						path: path,
						last_modify_date: {
							time: dateFormat(new Date(file.mtime).getTime(), 'HH:MM:ss'),
							time_ms: dateFormat(new Date(file.mtime).getTime(), 'HH:MM:ss:L'),
							date: dateFormat(new Date(file.mtime).getTime(), 'isoDate'),
						},
						info: file,
					};
					Sync.query.push(query);
				});
			}
			setTimeout(async () => {
				for(let i = 0; i < Sync.query.length; i ++) {
					if(Sync.send(Sync.query[i])) {
						delete Sync.query[i];
					}
				}
			}, 2000);
		});
	}
}

module.exports = FileSystem;