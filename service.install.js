var Service = require('node-windows').Service;
const path = require('path');

// Create a new service object
var svc = new Service({
	name:'idata Backup Sync',
	description: 'Syncronize sql Backups with cloud',
	script: path.join(__dirname + '/service.start.js'),
	nodeOptions: [
		'--harmony',
		'--max_old_space_size=4096'
	],
	env: [
	{
		name: "HOME",
		value: process.env["USERPROFILE"] // service is now able to access the user who created its' home directory
	},
	{
		name: "TEMP",
		value: path.join(process.env["USERPROFILE"],"/temp") // use a temp directory in user's home directory
	}
	]
});

svc.on('install', () => {
	console.log("Service installed");
	svc.start();
});

svc.install();