var sqldb = require('../config/dbconnect');
var dbutil = require(appRoot + '/utils/dbutils');
var moment = require('moment');
//User Authentication
exports.loginMdl = function (userData, callback) {
	var cntxtDtls = "in loginMdl";

	var QRY_TO_EXEC = `SELECT id,user_nm,role from user_lst_t where user_nm = '${userData.user_nm}' and 
	pwd = '${userData.pwd}' and d_in <> 1`;

	dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
		callback(err, results);return;
	});
};

exports.create_bidMdl = function (data, callback) {
	var cntxtDtls = "in create bid";
	
	var QRY_TO_EXEC = `INSERT INTO bid_lst_t(item_nm,item_cost,user_id) 
	VALUES('${data.item_nm}',${data.item_cost},${data.user_id})`;

	dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
		callback(err, results);return;
	});
};
exports.view_bidMdl = function (data, callback) {
	var cntxtDtls = "in view bid";

	var QRY_TO_EXEC = `SELECT bl.id,bl.item_nm,bl.item_cost,ub.offer_price,ub.user_id FROM bid_lst_t as bl
	left join user_bid_rel_t as ub on ub.item_id = bl.id
	WHERE bl.d_in <> 1;`;

	dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
		callback(err, results);return;
	});
};

exports.placeOffer_bidMdl = function (data, callback) {
	var cntxtDtls = "in placeOffer bid";
	// check user is trader or not
	var QRY_TO_EXEC = `INSERT INTO user_bid_rel_t(item_id,offer_price,user_id) 
	VALUES(${data.id},${data.bid_cost},${data.user_id})`;

	dbutil.execQuery(sqldb.MySQLConPool, QRY_TO_EXEC, cntxtDtls, function (err, results) {
		callback(err, results);return;
	});
};