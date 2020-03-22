var mysql = require('mysql');
var MySQLConPool	= {};

var MySQLConPool = mysql.createPool({
    host                : 'localhost',
    port      		    : 3306,
    user                : 'root',
    password            : '',
    database            : 'bidding',
    connectTimeout		: 20000,
    connectionLimit	    : 100,
    debug 		        : false,
    multipleStatements  : true
});


exports.MySQLConPool = MySQLConPool;
