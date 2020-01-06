const fetch = require('node-fetch');
const config = require('../config.js');
const { URLSearchParams } = require('url');

const basename = config.ajax.BASE_DOMAIN + ":" + config.ajax.PORT + config.ajax.DEFAULT_PATHNAME;

class Sync {

	static query = [];

	static get_file_content() {
		console.log();
	}

	static send = async (info) => {
		let done = false;

		if(typeof info !== 'undefined') {

			const path = info.path;

			const params = new URLSearchParams();
			
			params.append('date', `${info.last_modify_date.date} ${info.last_modify_date.time}`);
			params.append('filename', `${info.filename}`);
			params.append('blob', '');

			await fetch(`${basename}endpoint/file/sync.php`, {
				method: 'post',
				body: params,
				headers: {
					'Content-Type' : 'application/json',
				},
			}).then(async (res) => await res.json()).then(json => {
				console.log(json);
				done = true;
			}).catch(err => {
				console.log("That following error occorred => ", err);
			});
		}
		return done;
	};
}

module.exports = Sync;