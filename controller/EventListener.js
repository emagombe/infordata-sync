const chokidar = require('chokidar');

const config = require('../config.js');

class EventListener {

	static watcher = null;
	static watcher_zip = null;

	static folder = config.syncFolder;
	static folder_zip = config.syncZipFolder;

	static begin = () => {
		this.watcher = chokidar.watch(this.folder, {
			ignored: /(^|[\/\\])\../, // ignore dotfiles
			persistent: true,
		});
		this.watcher_zip = chokidar.watch(this.folder_zip, {
			ignored: /(^|[\/\\])\../, // ignore dotfiles
			persistent: true,
		});
		if(this.watcher && this.watcher_zip) {
			return true;
		}
		return false;
	};

	static end = async () => {
		if(this.watcher) {
			return await this.watcher.close().then(() => {
				this.watcher = null;
				return this.watcher;
			});
		}
		return false;
	};
	static end_zip = async () => {
		if(this.watcher_zip) {
			return await this.watcher_zip.close().then(() => {
				this.watcher_zip = null;
				return this.watcher_zip;
			});
		}
		return false;
	};
}

module.exports = EventListener;