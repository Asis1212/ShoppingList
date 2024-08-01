require('dotenv').config();

module.exports = {
	'development': {
		'username': process.env.DB_USER,
		'password': process.env.DB_PASS,
		'database': process.env.DB_NAME,
		'host': '127.0.0.1',
		'dialect': 'mssql',
	},
	'test': {
		'username': 'root',
		'password': null,
		'database': 'database_test',
		'host': '127.0.0.1',
		'dialect': 'mssql',
	},
	'production': {
		'username': 'root',
		'password': null,
		'database': 'database_production',
		'host': '127.0.0.1',
		'dialect': 'mssql',
	},
};
