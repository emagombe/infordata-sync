const axios = require('axios');

const FileManager = require('./FileManager.js');
const config = require('../config.js');

const basename = config.ajax.BASE_DOMAIN + ":" + config.ajax.PORT + config.ajax.DEFAULT_PATHNAME;

class Sync {

	static send = (info, callback) => {
		if(typeof info !== 'undefined') {
			let interval = null;

			const filename = info.path.split(config.syncFolder)[1];
			let count = 1;

			const upload = () => {
				let ready = FileManager.isFileReady(info.path);
				
				if(ready.done) {
				    callback(null);
			    	clearInterval(interval);

				// 	axios({
				// 		url: `${basename}endpoint/file/sync.php`,
				// 		method: 'post',
				// 		data: {
				// 			path: info.path,
				// 			date: (typeof info.last_modify_date != 'undefined') ? `${info.last_modify_date.date} ${info.last_modify_date.time}` : '',
				// 			filename: `${filename}`,
				// 			blob: FileManager.get_file_content(info.path).toString(),
				// 		},
				// 		onUploadProgress: (e) => {

				// 		},
				// 		onDownloadProgress: (e) => {

				// 		}
				// 	}).then(response => {
				// 		console.log(response.data);
				// 		callback(response);
				// 	}).catch(error => {
				// 		console.log("That following error occorred => ", error);
				// 		clearInterval(interval);
				// 	}).finally(() => {
				// 		clearInterval(interval);
				// 	});
				} else {
					if(!ready.exists) {
						callback(null);
						clearInterval(interval);
						console.log('does not exist');
					} else {
						console.log(`Some thing went wrong uploading file! Retrying ${count} time... `);
						if(count > 10) {
							console.log(`Giving up for ${filename}! Tried ${count} times`);
							clearInterval(interval);
						} else { count ++; }
					}
				}
			};

			interval = setInterval(() => { upload(); }, 1000);
		}
	};
}

module.exports = Sync;