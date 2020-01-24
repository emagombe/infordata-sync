const axios = require('axios');
const fs = require('fs');
var archiver = require('archiver');

const Ftp = require('./Ftp.js');
const FileManager = require('./FileManager.js');
const config = require('../config.js');

const Logger = require('./Logger.js');

const basename = config.ajax.BASE_DOMAIN + ":" + config.ajax.PORT + config.ajax.DEFAULT_PATHNAME;

const { ipcMain } = require('electron');

class Sync {

	static send = (info) => {
		if(typeof info !== 'undefined') {
			let count = 1; /* counts the number of times it tries to manage file */
			/* File upload */
			
			const filename = info.path.split(config.syncZipFolder)[1];
			const uploadfile = fs.createReadStream(info.path);
			const fileStat = fs.statSync(info.path);
			let uploadedSize = 0;

			FileManager.ready(info.path, () => {
				Ftp.run(client => {
					uploadfile.on('data', function(buffer) {
				        let segmentLength = buffer.length;
				        uploadedSize += segmentLength;
				        ipcMain.once('uploading', (event, arg) => {
							event.send('uploading', `Uploading [${filename.substring(1, filename.length)}]:\t ${((uploadedSize / fileStat.size * 100).toFixed(2))}%`);
						});
				        Logger.write(`Uploading [${filename.substring(1, filename.length)}]:\t ${((uploadedSize / fileStat.size * 100).toFixed(2))}%`);
				    });
					client.put(uploadfile, filename.substring(1, filename.length), false, error => {
						if(error) {
							Logger.write(`The following error occorred => ${error}`);
						} else {
							fs.unlink(info.path, (_error) => {
								if(_error) { Logger.write(`Failed to delete file [${filename.substring(1, filename.length)}] => `); } 
							});
						}
				    });
			    });
			});
		}
	};
}

module.exports = Sync;