evezownApp
    .controller('EvezplaceController', function ($scope) {
        $scope.title = "EvezPlace";
    });

evezownApp.controller('ProductMenuController', function ($rootScope, $scope, $location, EvezplaceHomeService, $routeParams) {

    $scope.productNavLinks = [{
        Title: 'evezplace',
        LinkText: 'Product'
    }, {
        Title: 'services',
        LinkText: 'Services'
    }, {
        Title: 'productServices',
        LinkText: 'Product + Services'
    }, {
        Title: 'classifieds',
        LinkText: 'Classifieds'
    }];

    $scope.currentSection = 0;

    $scope.navClass = function (page) {

        var currentRoute = $location.path().substring(1) || 'home';

        if (currentRoute == 'evezplace' || currentRoute == 'store/' + $routeParams.id
                                        || currentRoute == 'store/products/' + $routeParams.id) {
            currentRoute = 'evezplace';
            $rootScope.currentSection = 3;
            $rootScope.storeType = "Store"
        }
        else if (currentRoute == 'services') {
            currentRoute = 'services';
            $rootScope.currentSection = 4;
            $rootScope.storeType = "Service"
        }
        else if (currentRoute == 'classifieds'
                    || currentRoute == 'classifieds/' + $routeParams.id) {
            currentRoute = 'classifieds';
            $rootScope.currentSection = 5;
        }
        else if (currentRoute == 'productServices'
                    || currentRoute == 'productServices/' + $routeParams.id) {
            currentRoute = 'productServices';
            $rootScope.currentSection = 6;
        }

        return page === currentRoute ? 'active' : '';
    };

    getCategories();

    function getCategories() {
        var currentRoute = $location.path().substring(1);

        if (currentRoute == 'evezplace' || currentRoute == 'store/' + $routeParams.id
                                        || currentRoute == 'store/products/' + $routeParams.id) {
            $scope.currentSection = 3;
        }
        else if (currentRoute == 'services') {
            $scope.currentSection = 4;
        }
        else if (currentRoute == 'classifieds' || currentRoute == 'classifieds/' + $routeParams.id) {
            $scope.currentSection = 5;
        }
        else if (currentRoute == 'productServices' || currentRoute == 'productServices/' + $routeParams.id) {
            $scope.currentSection = 6;
        }

        EvezplaceHomeService.getCategories($scope.currentSection)
            .then(function (data) {
                $scope.categories = data;
            });
    }

});

evezownApp.controller('CreateBrowseController', function ($scope) {

});

evezownApp.controller('BrowseStoreController', function ($scope) {

});

evezownApp.controller('BrowseStoreMenuController', function ($scope, $location,
                                                             EvezplaceHomeService,$http,PATHS,$rootScope) {

    $scope.getCategories = function () {
        var currentRoute = $location.path().substring(1);

        if (currentRoute == 'store/browse') {
            $scope.currentSection = 3;
        }
        else if (currentRoute == 'store/services') {
            $scope.currentSection = 4;
        }
        else if (currentRoute == 'classifieds/browse') {
            $scope.currentSection = 5;
        }
        else if (currentRoute == 'productServices/browse') {
            $scope.currentSection = 6;
        }

        EvezplaceHomeService.getCategories($scope.currentSection)
            .then(function (data) {
                $scope.categories = data;
                $scope.selectedCategory = $scope.categories[0].id;

                $scope.selectSubCatPosition();
            });
    }

    $scope.getCategories();

    $scope.selectSubCatPosition = function (subcat)
    {
        console.log('selected sub cat: ' + subcat);
        $rootScope.$broadcast('selectedSubCategory', { message: subcat });
    };
});

evezownApp.controller('StoreInfoController', function ($scope, $location) {

    $scope.storeInfoNavLinks = [{
        Title: 'whatdoiget',
        LinkText: 'What Do I Get'
    }, {
        Title: 'typeofstores',
        LinkText: 'Types of Eve-Stores'
    }, {
        Title: 'faq',
        LinkText: 'FAQ'
    }];

    $scope.navClass = function (page) {

        var currentRoute = $location.path().substring(1) || 'home';

        return page === currentRoute ? 'active' : '';
    };
});

//evezplace home page images
evezownApp.controller('EvezplaceImages', function ($scope, ngDialog, $filter, ngTableParams, $cookieStore,
                                         $routeParams, StoreService, PATHS, $controller) {

    $scope.imageUrl = PATHS.api_url + 'image/show/';

    //get products of store 56
    function getProducts(storeId) {
        StoreService.getProductLines(storeId).
            then(function (data) {
                var productlines = data;

                $scope.productLines = productlines;
            });

    }
    getProducts("56");

    //get products of store 46
    function getStoreProducts(storeId) {
        StoreService.getProductLines(storeId).
            then(function (data) {
                var productlines2 = data;

                $scope.productLines2 = productlines2;
            });

    }
    getStoreProducts("46");
});
