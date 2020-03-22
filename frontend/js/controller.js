var app = angular.module('bidapp', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html'
        })

        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',

        })

        .state('trader', {
            url: '/trader',
            templateUrl: 'templates/trader.html'
        });

})
.controller('homeController', function($scope,$http,$state) {

    var token = localStorage.getItem('token');
    var user_id = localStorage.getItem('user_id');
    if(user_id != 1) {
        $state.go('login');
    }
    $scope.createBid = function() {
        
        $scope.itemDtls.user_id = user_id;
        $http({
            method: 'POST',
            url: 'http://localhost:5008/app/create_bid',
            headers : {'token' : token,'user_id' : user_id},
            data : $scope.itemDtls,
        }).then((result)  => {
                if(result.data.status === 200) {
                    alert('created successfully');
                    $scope.itemDtls = {};
                } else {
                    alert(result.data.message);
                }
        },(error) => {
            console.log(error);
        });
    }
})

.controller('loginController', function($scope,$state,$http) {

    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    $scope.signIn = function() {
        $http.post('http://localhost:5008/app/login',$scope.user).then((result) => {
            
            if(result.data.status == 200) {
                localStorage.setItem('token',result.data.token);
                localStorage.setItem('user_id',result.data.data.id);
                if(result.data.data.role === 'ADMIN') {
                    $state.go('home');
                } else {
                    $state.go('trader');
                }
            } else {
                alert(result.data.message);
            }
            
        },(e) => {
            console.log(e);
        });
    }
})

.controller('traderCtrl', function($scope,$http,$state) {

    var token = localStorage.getItem('token');
    var user_id = localStorage.getItem('user_id');

    var getbidList = function() {
        
        $http({
            method: 'GET',
            url: 'http://localhost:5008/app/view_bid',
            headers : {'token' : token,'user_id' : user_id}
        }).then((result)  => {
                if(result.data.status === 200) {
                    $scope.bidList = result.data.data;
                } else {
                    alert(result.data.message);
                    $state.go('login');
                }
        },(error) => {
            console.log(error);
        });
    }
    if(user_id == 1) {
        $state.go('login');
    } else {
        getbidList();
    }

    $scope.doBid = function(bidDtls,bid_cost) {
        let token = localStorage.getItem('token');
        let user_id = localStorage.getItem('user_id');

        bidDtls.bid_cost = bid_cost;
        bidDtls.user_id = user_id;

        $http({
            method: 'POST',
            url: 'http://localhost:5008/app/placeOffer_bid',
            headers : {'token' : token,'user_id' : user_id},
            data : bidDtls,
        }).then((result)  => {
                if(result.data.status === 200) {
                    alert('bid placed successfully');
                    getbidList();
                } else {
                    alert(result.data.message);
                    $state.go('login');
                }
        },(error) => {
            console.log(error);
        });
    }
});