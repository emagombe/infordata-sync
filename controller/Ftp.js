const Client = require('ftp');
const config = require('../config.js');

class Ftp {

	static run = (callback) => {

		/* Connectiong to ftp server */
		const client = new Client();
		
		client.connect(config.ftp);
		callback(client);
		client.on('ready', () => {
			
		});
		client.on('error', (error) => {
			console.log(error);
		});

		client.end();
	};
}

module.exports = Ftp;