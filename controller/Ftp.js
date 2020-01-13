const Client = require('ftp');
const config = require('../config.js');

class Ftp {

	static run = (callback) => {

		/* Connectiong to ftp server */
		const client = new Client();
		
		client.connect(config.ftp);
		callback(client);
		client.end();
	};

	static file_exists = (file, callback) => {
		this.get_file_list('').then((list) => {
			let result = false;
			for(let i = 0; i < list.length; i ++) {
				if(list[i].name == file) {
					result = true;
					break;
				} else {
					result = false;
				}
			}
			callback(result);
		});
	};

	static get_file_list = (path) => {
		const promise = new Promise((resolve, reject) => {
			this.run((client) => {
				client.list(path, false, (error, _list) => {
					if(error) {
						reject(error);
					} else {
						resolve(_list);
					}
				});
			});
		});
		return promise;
	};
}

module.exports = Ftp;