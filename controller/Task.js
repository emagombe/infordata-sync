const fs = require('fs');

const dateFormat = require('dateformat');
const config = require('../config.js');

class Task {

	static getByFilename(filename, callback) {
		fs.promises.access(config.task).then(() => {
			fs.readFile(config.task, (error, content) => {
				if(error) { console.log(error); return; }
				if(content != '') {
					const data = JSON.parse(content);
					
					let is_file_found = false;	// Indicates if file was found or not
					for(let i = 0; i < data.tasks.length; i ++) {
						if(data.tasks[i].filename == filename) {
							callback(true);
							return;
						}
					}
					callback(is_file_found);	// if false means that it was not found
				}
				callback(false);
			});
		}).catch(() => {
			callback(false);
		});
	}


	/* Write to file the tasks that are done */
	static update = (json) => {

		fs.promises.access(config.task).then(() => {
			fs.readFile(config.task, (error, content) => {
				if(error) { console.log(error); return; }
				if(content != '') {
					const data = JSON.parse(content);
					data.tasks.push(json);
					content = JSON.stringify(data, null, "\t");
					fs.writeFile(config.task, content, (error) => {
						if(error) {
							console.log("Filed to update task list => ", error);
						}
					});
				} else {
					const content = `{
						"tasks": []
					}`;
					fs.writeFile(config.task, content, (error) => {
						if(error) {
							console.log("Filed to update task list => ", error);
						}
					});
				}
			});
		}).catch(() => {
			const content = `{
				"tasks": []
			}`;
			fs.writeFile(config.task, content, (error, fd) => {
				if(error) { console.log(error); return; }
				this.update(json);
			});
		});
	}
}

module.exports = Task;