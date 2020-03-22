var routeCtrl = require('../controllers/mainCtrl');

var isLoggedIn = function (req, res, next) {
    var token = req.body.token || req.headers['token'];
    if (token) {
		if(req.headers['user_id']) {
			let userToken = myCache.get(req.headers['user_id']);
			if(userToken) {
				if(userToken == token) {
					next();
				} else {
					res.send({ "status": 201, "message": 'Token Invalid' });
				}
			} else {
				res.send({ "status": 201, "message": 'Token Expired' });
			}
        } else {
			res.send({"status": 201, "message": 'Please send a User Name and Client'});
		}
    } else {
        res.send({"status": 201, "message": 'Please send a token'});
    }
}

router.post('/login',routeCtrl.loginCtrl);		// login
router.post('/create_bid',isLoggedIn, routeCtrl.create_bidCtrl);		// create bid
router.get('/view_bid',isLoggedIn, routeCtrl.view_bidCtrl);		// view bid

// trader
router.post('/placeOffer_bid',isLoggedIn,routeCtrl.placeOffer_bidCtrl);		// login check
module.exports = router;
