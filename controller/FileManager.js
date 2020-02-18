const fs = require('fs');
var archiver = require('archiver');

const Logger = require('./Logger.js');
const config = require('../config.js');

class FileManager {

	/* check if file is available or in use(file cannot be managed if in use) or deleted */
	static isFileBusy = (path) => {
		try {
			const content = fs.readFileSync(path);
			return { done: true, msg: '', content: content, exists: true };
		} catch(error) {
			if(error && error.code == 'EBUSY') {
				Logger.write(`Resource [${path}] is busy! Waiting until it gets ready!`);
				return { done: false, msg: `Resource [${path}] is busy! Waiting until it gets ready!`, exists: true };
			} else if (error && error.code == 'ENOENT') {
				Logger.write(`Resource [${path}] was deleted!`);
				return { done: false, msg: `Resource [${path}] was deleted!`, exists: false };
			} else {
				return { done: true, msg: '', content: content, exists: true };
			}
		}
	};

	/* When file is not busy and can be managed */
	static ready = (path, callback) => {

		let interval = null;
		
		const run = () => {
			let ready = this.isFileBusy(path);
			if(ready.done) {
				callback();
				clearInterval(interval);
			} else {
				if(!ready.exists) {
					clearInterval(interval);
				} else {
					Logger.write(`Some thing went wrong uploading file! Retrying ${count} time... `);
					if(count > 10) {
						Logger.write(`Giving up for ${filename}! Tried ${count} times`);
						clearInterval(interval);
					} else { count ++; }
				}
			}
		};
		interval = setInterval(() => { run(); }, 1000);
	};

	static compress = (files = [], zip_name = null) => {

		if(files != [] && zip_name) {
			let status = true;
			let status2 = true;
			/* Check if folder exists */
			fs.promises.access(config.syncZipFolder).then(() => {
				// create a file to stream archive data to.
				const output = fs.createWriteStream(config.syncZipFolder + '\\' + zip_name);
				const archive = archiver('zip', {
					zlib: { level: 9 } // Sets the compression level.
				});

				archive.on('error', function(err) {
					Logger.write(`Error archiving file => ${err}`);
					status = false;
				});

				/* Creating the zip file */
				archive.pipe(output);

				for(let i = 0; i < files.length; i ++) {
					/* Adding file to zip */
					archive.file(files[i].path, { name: files[i].filename });
				}
				archive.finalize();
			}).catch(() => {
				fs.mkdir(config.syncZipFolder, error => {
					if(error) {
						Logger.write(`Failed to create dir 'Permission denied' => ${error}`);
					} else {
						this.compress(files, zip_name);
					}
				});
			});
			fs.promises.access(config.syncZipFolderPermanent).then(() => {
				// create a file to stream archive data to.
				const output = fs.createWriteStream(config.syncZipFolderPermanent + '\\' + zip_name);
				const archive = archiver('zip', {
					zlib: { level: 9 } // Sets the compression level.
				});

				archive.on('error', function(err) {
					Logger.write(`Error archiving file => ${err}`);
					status2 = false;
				});

				/* Creating the zip file */
				archive.pipe(output);

				for(let i = 0; i < files.length; i ++) {
					/* Adding file to zip */
					archive.file(files[i].path, { name: files[i].filename });
				}
				archive.finalize();
			}).catch(() => {
				fs.mkdir(config.syncZipFolderPermanent, error => {
					if(error) {
						Logger.write(`Failed to create dir 'Permission denied' => ${error}`);
					} else {
						this.compress(files, zip_name);
					}
				});
			});

			return (status && status2);
		} else {
			return false;
		}
	};

	/* get The file content (Blob) */
	static get_file_content(path) {
		return fs.readFileSync(path);
	}

	static get_file_stream(path) {
		return fs.createReadStream(path);
	}
}

module.exports = FileManager;