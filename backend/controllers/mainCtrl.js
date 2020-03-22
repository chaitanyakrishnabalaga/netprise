var jwt = require('jsonwebtoken');
var secretKey = 'abcdefghi`';
var appmdl = require('../models/mainModel');

exports.loginCtrl = function (req, res) {
    var userData = req.body;
    appmdl.loginMdl(userData, function (err, results) {
        if (err) {
            res.send({ "status": 500, "message": "Server Error" });return;
        }
        if (results && results.length > 0) {

            var token = jwt.sign({
                data: results[0].user_nm
            },secretKey , { expiresIn: '2h' });
            
            let tmp = myCache.set(results[0].id, token,240000);
            if(tmp == true) {
                res.json({
                    status: 200,
                    message : 'user loggedin successfully',
                    data : results[0],
                    token: token
                })
            }
        } else {
            res.send({ "status": 202, "message": 'invalid UserName or Password' });
        }
    });
}

exports.create_bidCtrl = function (req, res) {
    var data = req.body;
    appmdl.create_bidMdl(data, function (err, results) {
        if (err) {res.send({ "status": 500, "message": "Server Error" });return;}
        res.send({'status' : 200,'message' : 'created successfully'});
    });
}

exports.view_bidCtrl = function (req, res) {
    var data = req.body;
    appmdl.view_bidMdl(data, function (err, results) {
        if (err) {res.send({ "status": 500, "message": "Server Error" });return;}
        res.send({'status' : 200,'data' : results});
    });
}

exports.placeOffer_bidCtrl = function (req, res) {
    var data = req.body;
    appmdl.placeOffer_bidMdl(data, function (err, results) {
        if (err) {res.send({ "status": 500, "message": "Server Error" });return;}
        res.send({'status' : 200,'message' : 'offer quoted successfully'});
    });
}