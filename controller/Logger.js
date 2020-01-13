const fs = require('fs');

const dateFormat = require('dateformat');

const FileManager = require('./FileManager.js');
const config = require('../config.js');

class Logger {


	static write = (content) => {
		let log = `${dateFormat(new Date().getTime(), 'HH:MM:ss')} => ${content} \n`;
		if(FileManager.isFileBusy(config.log).exists) {
			fs.appendFile(config.log, log, (error) => {
				if(error) {
					console.log("Filed to write log => ", error);
				}
			});
		} else {
			fs.writeFile(config.log, '', (error, fd) => {
				if(error) { console.log(error); return; }
				this.write(log);
			});
		}
	}
}

module.exports = Logger;