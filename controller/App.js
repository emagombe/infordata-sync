const fs = require('fs');

const dateFormat = require('dateformat');
const Logger = require('./Logger.js');
const config = require('../config.js');

class App {

	static get(callback) {
		fs.promises.access(config.app).then(() => {
			fs.readFile(config.app, (error, content) => {
				if(error) { Logger.write(error); return; }
				if(content != '') {
					callback(JSON.parse(content));
				} else {
					callback(false);
				}
			});
		}).catch(() => {
			callback(false);
		});
	}

	/* Update app settings */
	static update = (syncFolder) => {

		fs.promises.access(config.app).then(() => {
			fs.readFile(config.app, (error, content) => {
				if(error) { Logger.write(error); return; }
				if(content != '' && syncFolder != null) {
					const data = JSON.parse(content);
					data.syncFolder = syncFolder;
					content = JSON.stringify(data, null, "\t");
					fs.writeFile(config.app, content, (error) => {
						if(error) {
							Logger.write("Filed to update app file => ", error);
						}
					});
				} else {
					const content = `{
						"syncFolder": "${process.env.USERPROFILE}\\Documents\\infordataSync",
						"syncZipFolder": "temp"
					}`;
					fs.writeFile(config.app, content, (error) => {
						if(error) {
							Logger.write("Filed to update app file => ", error);
						}
					});
				}
			});
		}).catch(() => {
			const content = `{
				"syncFolder": "${process.env.USERPROFILE}\\Documents\\infordataSync",
				"syncZipFolder": "temp"
			}`;
			fs.writeFile(config.task, content, (error, fd) => {
				if(error) { Logger.write(error); return; }
				this.update(syncFolder);
			});
		});
	}
}

module.exports = App;