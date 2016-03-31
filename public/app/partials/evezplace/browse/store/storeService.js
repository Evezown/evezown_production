/**
 * Created by vishu on 12/10/15.
 */
evezownApp.factory('StoreService', ['$http', '$q', 'PATHS', '$cookieStore',
    function ($http, $q, PATHS, $cookieStore) {

        StoreService = {};

        StoreService.getStoreFrontDetails = function ($storeId) {
            var deferred = $q.defer();
            $http.get(PATHS.api_url + 'stores/' + $storeId + '/get')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (err) {
                    console.log('Error retrieving store front details.');
                    deferred.reject(err);
                });
            return deferred.promise;
        }

        StoreService.getProductLines = function ($storeId) {
            var deferred = $q.defer();
            $http.get(PATHS.api_url + 'stores/productline/' + $storeId + '/get')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (err) {
                    console.log('Error retrieving store front details.');
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        StoreService.uploadSlideImage = function ($image, $coords) {
            var deferred = $q.defer();

            var requestData = { image : $image, width: $coords.w, height: $coords.h, x: $coords.x, y: $coords.y};

            $http.post(PATHS.api_url +  'image/crop', requestData)
                .success(function(data){
                    deferred.resolve(data);
                })
                .error(function(err){
                    console.log('Error on saving');
                    deferred.reject(err);
                });
            return deferred.promise;
        }

        StoreService.getProductDetails = function ($productId) {
            var deferred = $q.defer();
            $http.get(PATHS.api_url + 'stores/products/' + $productId + '/get')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (err) {
                    console.log('Error retrieving store front details.');
                    deferred.reject(err);
                });
            return deferred.promise;
        };


        StoreService.getProductVariants = function ($productId, selectedProduct) {
            var deferred = $q.defer();
            $http.post(PATHS.api_url + 'stores/products/' + $productId + '/variants', selectedProduct)
                .success(function (data) {
                    deferred.resolve(data.data);
                })
                .error(function (err) {
                    console.log('Error retrieving store front details.');
                    deferred.reject(err);
                });
            return deferred.promise;
        };


        StoreService.saveProductRfiDetails = function ($rfiData, $productId) {
            var deferred = $q.defer();

            $http.post(PATHS.api_url + 'stores/products/' + $productId + '/rfi/create', $rfiData)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (err) {
                    console.log('Error on saving');
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        StoreService.saveStoreRfqDetails = function ($rfqData, $storeId) {
            var deferred = $q.defer();

            $http.post(PATHS.api_url + 'stores/' + $storeId + '/rfq/create', $rfqData)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (err) {
                    console.log('Error on saving');
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        StoreService.isStoreOwner = function ($ownerId, $userId) {

            var deferred = $q.defer();

            deferred.resolve($ownerId == $userId);

            return deferred.promise;
        };

        StoreService.getShoppingCartItems = function () {

            var shoppingCartItems = $cookieStore.get('shoppingCartItems') || [];

            return shoppingCartItems;
        };

        StoreService.isShoppingCartEmpty = function () {

            var shoppingCartItems = $cookieStore.get('shoppingCartItems') || [];

            return shoppingCartItems.length == 0;
        };

        StoreService.removeFromCart = function ($product, shoppingCartItems) {

            shoppingCartItems.splice(shoppingCartItems.indexOf($product), 1);

            $cookieStore.put('shoppingCartItems', shoppingCartItems);

            return shoppingCartItems;
        };

        StoreService.placeOrder = function (orderData) {

            var deferred = $q.defer();

            $http.post(PATHS.api_url + 'orders', orderData)
                .success(function (data) {
                    console.log(data);
                    deferred.resolve(data);
                })
                .error(function (err) {
                    console.log(err);
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        StoreService.getStoreLevelsByUserId = function(storeId, userId) {
            var deferred = $q.defer();

            $http.get(PATHS.api_url + 'stores/' + storeId + '/ratings/' + userId)
                .success(function (data) {
                    console.log(data);
                    deferred.resolve(data);
                })
                .error(function (err) {
                    console.log(err);
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        StoreService.getStoreComments = function(storeId) {
            var deferred = $q.defer();

            $http.get(PATHS.api_url + 'stores/' + storeId + '/comments')
                .success(function (data) {
                    console.log(data);
                    deferred.resolve(data);
                })
                .error(function (err) {
                    console.log(err);
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        return StoreService;

    }]);