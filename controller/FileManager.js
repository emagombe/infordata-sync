const fs = require('fs');
var archiver = require('archiver');
const config = require('../config.js');

class FileManager {

	/* check if file is available or in use(file cannot be managed if in use) or deleted */
	static isFileBusy = (path) => {
		try {
			const content = fs.readFileSync(path);
			return { done: true, msg: '', content: content };
		} catch(error) {
			if(error && error.code == 'EBUSY') {
				return { done: false, msg: `Resource [${path}] is busy! Waiting until it gets ready!`, exists: true };
			} else if (error && error.code === 'ENOENT') {
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
		interval = setInterval(() => { run(); }, 1000);
	};

	static compress = (files = [], zip_name = null) => {

		if(files != [] && zip_name) {
			let status = true;
			// create a file to stream archive data to.
			const output = fs.createWriteStream(config.syncZipFolder + '\\' + zip_name);
			const archive = archiver('zip', {
				zlib: { level: 9 } // Sets the compression level.
			});

			archive.on('error', function(err) {
				console.log(`Error archiving file => `, err);
				status = false;
			});

			/* Creating the zip file */
			archive.pipe(output);

			for(let i = 0; i < files.length; i ++) {
				/* Adding file to zip */
				archive.file(files[i].path, { name: files[i].filename });
			}
			archive.finalize();

			return status;
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