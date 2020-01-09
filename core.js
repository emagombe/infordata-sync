const Sync = require('./controller/Sync.js');
const Ftp = require('./controller/Ftp.js');

class Core {

	/* List o pending requests to be sent to server */
	static query = [];
	static timeout = null;

	static addItem = (data) => {
		if(data.eventType != '') {
			if(this.timeout) {
				clearTimeout(this.timeout);
			}
			this.query.push(data);
			/* Sync changes */
			this.timeout = setTimeout(async () => {
				this.begin_sync();
			}, 2000);
			return true;
		}
		return false;
	};

	static removeItem = (path) => {
		if(path) {
			for(let i = 0; i < this.query.length; i ++) {
				if(query[i].path == path) {
					delete query[i];

					/* Sync changes */
					this.begin_sync();
					return true;
				}
			}
		}
		return false;
	};

	static getItem = (ino) => {
		if(path) {
			for(let i = 0; i < this.query.length; i ++) {
				if(query[i].path == path) {
					return query[i];
				}
			}
		}
		return false;
	};

	static getAll = () => {
		Ftp.run(client => {
			client.list((error, list) => {
				console.log(list);
			});
			client.put(info.path, filename, true, error => {
				if(error) {
					console.log(error);
				}
		    });
		});
		return this.query;
	};

	static begin_sync = () => {
		if(this.query.length > 0) {
			for(let i = 0; i < this.query.length; i ++) {
				Sync.send(this.query[i], (response) => {
					delete this.query[i];
				});
			}
		}
	};
}

module.exports = Core;