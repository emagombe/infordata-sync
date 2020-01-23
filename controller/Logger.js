const fs = require('fs');

const dateFormat = require('dateformat');
const config = require('../config.js');

class Logger {


	static write = (content) => {
		let log = `${dateFormat(new Date().getTime(), 'HH:MM:ss')} => ${content} \n`;
		fs.promises.access(config.log).then(() => {
			fs.appendFile(config.log, log, (error) => {
				if(error) {
					console.log("Filed to write log => ", error);
				}
			});
		}).catch(() => {
			fs.writeFile(config.log, '', (error, fd) => {
				if(error) { console.log(error); return; }
				this.write(log);
			});
		});
	}
}

module.exports = Logger;