const fs = require('fs');

class FileManager {

	/* check if file is available or in use(file cannot be managed if in use) or deleted */
	static isFileReady = (path) => {
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

	/* get The file content (Blob) */
	static get_file_content(path) {
		return fs.readFileSync(path);
	}

	static get_file_stream(path) {
		return fs.createReadStream(path);
	}
}

module.exports = FileManager;