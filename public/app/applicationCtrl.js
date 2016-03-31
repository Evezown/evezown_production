/**
 * @ngdoc controller
 * @name evezownapp.controller:applicationCtrl
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */


evezownApp
    .controller('ApplicationCtrl', function ($rootScope, $scope, $location,
                                             USER_ROLES,
                                             AuthService, Session, $cookieStore, profileService, PATHS, $http) {
        $scope.userRoles = USER_ROLES;
        $rootScope.profileImage = null;
        //$scope.$on('profileImage', function(event, msg) {
        //    $scope.profileImage = PATHS.api_url +'image/show/'+msg;
        //});

        function fetchProfile(userID) {
            //profileService.getProfile(userID).then(function(data){
            //$scope.firstname = data.firstname;
            //$scope.lastname = data.lastname;
            //$scope.userId = data.id;
            //$scope.loggedInUserId = $cookieStore.get('userId');

            var myDataPromise = AuthService.setProfile(PATHS.api_url + 'users/' + $cookieStore.get('userId'));
            myDataPromise.then(function (result) {  // this is only run after $http completes
                var profileData = AuthService.getProfile();
                $rootScope.firstname = profileData.data.firstname;
                $rootScope.lastname = profileData.data.lastname;
                $rootScope.userId = profileData.data.id;
                $rootScope.loggedInUserId = $cookieStore.get('userId');
                $rootScope.loggedIn = true;
            });


            //fetchProfileImage($scope.userId);


            //});
        }

        function fetchProfileImage(userId) {
            var myDataPromise = AuthService.setImage(PATHS.api_url + 'users/' + $cookieStore.get('userId') + '/profile_image/current');
            myDataPromise.then(function (result) {  // this is only run after $http completes
                $rootScope.profileImage = null;
                $rootScope.profileImage = AuthService.getImage();
            });
        }


        if ($cookieStore.get('userId')) {
            $rootScope.userId = $cookieStore.get('userId');
            fetchProfile($cookieStore.get('userId'));
            fetchProfileImage($cookieStore.get('userId'));

        }

        $scope.$watch('userId', function (newvalue, oldvalue) {
            if (oldvalue) {
                if (oldvalue != newvalue) {
                    $rootScope.userId = newvalue;
                }
            }
        });

        $scope.$watch('profileImage', function (newvalue, oldvalue) {
            if (oldvalue) {
                if (oldvalue != newvalue) {
                    $rootScope.profileImage = newvalue;
                }
            }
        });


        //AuthService.getProfileImage(PATHS.api_url + 'users/' + $cookieStore.get('userId') + '/profile_image/current').success(function(data) {
        //    $scope.profileImage = PATHS.api_url + 'image/show/' + data;
        //});


        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $scope.getLoggedInStatus = function () {
            if ($cookieStore.get('userId') == null) {
                return $rootScope.loggedIn;
            }
            return true;

        }

        $scope.$watch('loggedIn', function (newvalue, oldvalue) {
            $rootScope.loggedIn = newvalue;
        });

        //clear cookies and sessions
        $scope.Logout = function () {
            $cookieStore.remove('api_key');
            $cookieStore.remove('userId');
            $cookieStore.remove('post');
            Session.destroy();
            $rootScope.loggedIn = false;
            $rootScope.firstname = null;
            $rootScope.lastname = null;
            $rootScope.userId = null;
            $rootScope.loggedInUserId = null;
            $rootScope.username = '';
            toastr.success('Logout', 'You have been logged out successfully');
            $location.path('\home');

            //swal({
            //    title: "Are you sure?",
            //    text: "This will log you off evezown",
            //    type: "warning",
            //    showCancelButton: true,
            //    confirmButtonColor: "#DD6B55",
            //    confirmButtonText: "Yes, Log out!",
            //    closeOnConfirm: true
            //}, function () {
            //    $cookieStore.remove('api_key');
            //    $cookieStore.remove('userId');
            //    $cookieStore.remove('post');
            //    Session.destroy();
            //    $rootScope.loggedIn = false;
            //    $rootScope.username = '';
            //    toastr.success('Logout', 'You have been logged successfully');
            //    $location.path('/home');
            //});
        }


    });

evezownApp.controller('TopMenuCtrl', function ($scope, $cookieStore, StoreService) {

    $scope.shoppingCartItems = StoreService.getShoppingCartItems();

    console.log($scope.shoppingCartItems);

    $scope.isShoppingCartEmpty = StoreService.isShoppingCartEmpty();

    console.log('Is shopping cart empty: ' + $scope.isShoppingCartEmpty);

    $scope.totalPrice = 0;
    $scope.totalShipping = 0;
    $scope.shoppingCartCount = 0;

    angular.forEach($scope.shoppingCartItems, function(value) {
        angular.forEach(value.products, function(product) {
            $scope.totalPrice =  +$scope.totalPrice +  (+product.price * +product.quantity);
            $scope.totalShipping = +$scope.totalShipping + +product.shippingCharge;
        });

        $scope.shoppingCartCount = +$scope.shoppingCartCount + +value.products.length;
    });

    $scope.shoppingCartPopover = {
        templateUrl: 'partials/shoppingcart.tpl.html'
    };

    $scope.removeFromCart = function($product) {

        $scope.shoppingCartItems.splice($scope.shoppingCartItems.indexOf($product), 1);

        $cookieStore.put('shoppingCartItems', $scope.shoppingCartItems);

        onQuantityChange();

    };

    function onQuantityChange () {
        $scope.totalPrice = 0;
        $scope.totalShipping = 0;
        $scope.shoppingCartCount = 0;

        angular.forEach($scope.shoppingCartItems, function(value) {
            angular.forEach(value.products, function(product) {
                $scope.totalPrice =  +$scope.totalPrice +  (+product.price * +product.quantity);
                //$scope.totalShipping = +$scope.totalShipping + +product.shippingCharge;
            });
            $scope.shoppingCartCount = +$scope.shoppingCartCount + +value.products.length;
        });

    }

    $scope.$watch('shoppingCartItems', function() {
        onQuantityChange();
    }, true);

    $scope.$on('shoppingCartItems', function (event, args) {

        var shoppingCartItems = args.message;

        console.log(shoppingCartItems);

        $scope.totalPrice = 0;
        $scope.totalShipping = 0;

        $scope.shoppingCartItems = shoppingCartItems;
        $scope.shoppingCartCount = 0;

        angular.forEach($scope.shoppingCartItems, function(value) {
            angular.forEach(value.products, function(product) {
                $scope.totalPrice =  +$scope.totalPrice +  (+product.price * +product.quantity);
                //$scope.totalShipping = +$scope.totalShipping + +product.shippingCharge;
            });
            $scope.shoppingCartCount = +$scope.shoppingCartCount + +value.products.length;
        });

        $scope.isShoppingCartEmpty = !($scope.shoppingCartItems != null && $scope.shoppingCartItems.length > 0);
    });
});
