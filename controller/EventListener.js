const chokidar = require('chokidar');

const config = require('../config.js');

class EventListener {

	static watcher = null;
	static folder = config.syncFolder;

	static begin = () => {
		this.watcher = chokidar.watch(this.folder, {
			ignored: /(^|[\/\\])\../, // ignore dotfiles
			persistent: true,
		});
		if(this.watcher) {
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
}

module.exports = EventListener;