/**
 * Created by vishu on 06/11/15.
 */

evezownApp.controller('StoreFrontController', function ($scope, ngDialog, $filter, ngTableParams, $cookieStore,
                                                        $routeParams, StoreService, PATHS, $controller,$http) {

    $scope.storefront = $scope.storefront || {};

    $scope.storefront.collageImages = [];

    $scope.storefront.commentReccoWoice = {
        comments : 10,
        isComments: true,
        reccos : 15,
        currentGrades : 4,
        isGrades : true,
        grade : 2,
        restreams: 12,
        isRestream: true
    };

    $scope.loggedInUserId = $cookieStore.get('userId');

    $scope.storeOwnerId = -1;

    $scope.imageUrl = PATHS.api_url + 'image/show/';

    var storeId = $routeParams.id;

    function getStoreFrontDetails(storeId) {
        StoreService.getStoreFrontDetails(storeId).
            then(function (data) {

                var storeFrontDetails = data[0];

                $scope.storefront.owner_id = storeFrontDetails.owner_id;
                $scope.storefront.id = storeFrontDetails.id;

                $scope.isStoreOwner = ($scope.storefront.owner_id == $scope.loggedInUserId);

                $scope.storefront.title = storeFrontDetails.title;
                $scope.storefront.description = storeFrontDetails.description;
                $scope.storefront.aboutus = storeFrontDetails.store_about_us || '';
                if (storeFrontDetails.profile_images != null &&
                    storeFrontDetails.profile_images.large_image_url != '') {
                    $scope.storefront.profile_image = PATHS.api_url + 'image/show/' +
                        storeFrontDetails.profile_images.large_image_url + '/288/288';
                }
                else {
                    $scope.storefront.profile_image = 'http://placehold.it/288x288/e50880/ffffff';
                }




                if (storeFrontDetails.collage_image1 != null &&
                    storeFrontDetails.collage_image1.large_image_url != '') {
                    $scope.storefront.collageImages.push(PATHS.api_url + 'image/show/' +
                        storeFrontDetails.collage_image1.large_image_url + '/780/520');
                }
                else {
                    $scope.storefront.collageImages.push('http://placehold.it/780x520/e50880/ffffff');
                }

                if (storeFrontDetails.collage_image2 != null &&
                    storeFrontDetails.collage_image2.large_image_url != '') {
                    $scope.storefront.collageImages.push(PATHS.api_url + 'image/show/' +
                        storeFrontDetails.collage_image2.large_image_url + '/390/250');
                }
                else {
                    $scope.storefront.collageImages.push('http://placehold.it/390x250/e50880/ffffff');
                }

                if (storeFrontDetails.collage_image3 != null &&
                    storeFrontDetails.collage_image3.large_image_url != '') {
                    $scope.storefront.collageImages.push(PATHS.api_url + 'image/show/' +
                        storeFrontDetails.collage_image3.large_image_url + '/390/250');
                }
                else {
                    $scope.storefront.collageImages.push('http://placehold.it/390x250/e50880/ffffff');
                }

                if (storeFrontDetails.store_front_info.target_audience != '') {
                    $scope.storefront.target_audience =
                        storeFrontDetails.store_front_info.target_audience;
                }

                if (storeFrontDetails.store_front_info.offerings != '') {
                    $scope.storefront.offerings =
                        storeFrontDetails.store_front_info.offerings;
                }

                if (storeFrontDetails.store_front_info.motto != '') {
                    $scope.storefront.motto =
                        storeFrontDetails.store_front_info.motto;
                }

                if (storeFrontDetails.store_front_info.vision != '') {
                    $scope.storefront.vision =
                        storeFrontDetails.store_front_info.vision;
                }

                if (storeFrontDetails.store_front_info.purpose != '') {
                    $scope.storefront.purpose =
                        storeFrontDetails.store_front_info.purpose;
                }

                $scope.storefront.contactDetails = [];

                $scope.storefront.contactDetails = {
                    address: storeFrontDetails.street_address,
                    city: storeFrontDetails.city,
                    state: storeFrontDetails.state,
                    country: storeFrontDetails.country,
                    pincode: storeFrontDetails.zip,
                    primary_phone: storeFrontDetails.store_front_info.store_contact_phone1,
                    secondary_phone: storeFrontDetails.store_front_info.store_contact_phone2,
                    email: storeFrontDetails.store_front_info.email_address
                };

                $scope.storefront.privacy = storeFrontDetails.store_terms_conditions;

                $scope.storefront.shippingReturn = storeFrontDetails.store_sales_exchange_policy;


            });
    }

    getStoreFrontDetails(storeId);

    function getProducts(storeId) {
        StoreService.getProductLines(storeId).
            then(function (data) {
                var productlines = data;

                $scope.storefront.productLines = productlines;
            });
    }

    getProducts(storeId);

    $scope.selectedProductLine = {};


    $scope.getProducts = function (productLine) {
        $scope.storefront.products = productLine.products;
    }


    $scope.PublishStore = function (storeId)
    {
        ngDialog.open({ template: 'statustemplateId' });
    }

    $scope.Publish = function (storeId)
    {
        $http.post(PATHS.api_url + 'users/store/updatestorestatus/update'
            , {
                data:
                {
                    StoreId:$routeParams.id,
                    storeStatus : 3
                },
                headers: {'Content-Type': 'application/json'}
            }).
            success(function (data, status, headers, config)
            {
                toastr.success(data.message, 'Store');

            }).error(function (data)
            {
                toastr.error(data.error.message, 'Store');
            }).then(function()
            {
                ngDialog.close();
            });
    }

    $scope.CancelPublish = function (storeId)
    {
        ngDialog.close();
    }

    $scope.GetStoreStatus = function (storeId)
    {
        
    }

    $scope.openRequestForQueryForm = function () {

        var id = storeId;
        var storeRfqDialog = ngDialog.open(
            {
                template: 'partials/evezplace/browse/store/store_rfq_dialog.html',
                className: 'ngdialog-theme-plain',
                scope: $scope,
                controller: $controller('storeRfqCtrl', {
                    $scope: $scope,
                    storeId: id
                })
            });

        storeRfqDialog.closePromise.then(function (data) {

            if (data.value.status) {
                toastr.success(data.message, 'Store rfq submitted successfully.');
            }
        });
    };

    $scope.datepickers = {
        expectedDeliveryDate: false,
        expectedPurchaseDate: false
    }

    $scope.formData = {};

    $scope.selectedProduct = null;
    $scope.selectedQuantity = null;
    $scope.selectedDeliveryCity = null;

    function loadStoreComments() {
        StoreService.getStoreComments(storeId).
        then(function (data) {
            var comments = data;

            console.log('store comments: ' + comments);
        });
    }

    loadStoreComments();
});
