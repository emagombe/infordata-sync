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

	static file_exists = (file) => {
		for(let i = 0; i < this.get_file_list('').length; i ++) {
			console.log(list[i].name, file, list[i].name == file);
			if(list[i].name == file) {
				return true;
			}
		}
		return false;
	};

	static get_file_list = (path) => {
		let list = [];
		this.run((client) => {
			client.list(path, false, (error, _list) => {
				console.log(_list);
				if(error) {
					console.log(`Failed to fetch list => `, error);
				} else {
					list = _list;
				}
			});
		});
		return list;
	};
}

module.exports = Ftp;