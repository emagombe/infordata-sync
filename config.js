
const config = {
	ajax: {
		BASE_DOMAIN: 'http://192.168.1.6',
		SECURED_BASE_DOMAIN: 'https://192.168.1.6',
		PORT: 8090,
		SECURED_PORT: 4000,
		DEFAULT_PATHNAME: '/',
	},
	ftp: {
		host: 'ftp.znbox.net',
		port: 21,
		user: 'test@znbox.net',
		password: 'Grevolution2@',
		keepalive: 10000,
	},
	syncFolder: process.env.USERPROFILE + '\\Documents' + '\\infordataSync',
	syncZipFolder: process.env.USERPROFILE + '\\Documents' + '\\infordataSyncZip',
};

module.exports = config;