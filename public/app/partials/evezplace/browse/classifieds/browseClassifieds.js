/**
 * Created by Viswanathan on 6/29/2015.
 */
evezownApp
    .controller('BrowseClassifiedsCtrl', function ($scope, usSpinnerService, ClassifiedsService, PATHS) {
        $scope.browseItems = [];

        $scope.ImageUrlPath = PATHS.api_url + 'image/show/';

        $scope.$on('selectedSubCategory', function (event, args) {
            console.log(args.message.id);

            var subCatId = args.message.id;

            ClassifiedsService.getClassifieds(subCatId).
                then(function (data) {
                    console.log(data);
                    $scope.browseItems = data;
                });
        });
    });

evezownApp
    .controller('ClassifiedDetailsCtrl', function ($scope, $routeParams, usSpinnerService,
                                                   ClassifiedsService, PATHS, $location, ngDialog,
                                                   $controller) {
        var classifiedId = $routeParams.id;


        $scope.shareUrl = function () {
            return $location.absUrl();
        };

        $scope.shareHost = function () {
            return $location.absUrl();
        };

        ClassifiedsService.getClassified(classifiedId).
            then(function (data) {
                console.log(data);

                var imageUrlPath = PATHS.api_url + 'image/show/';
                $scope.classifiedDetails = data;

                $scope.classifiedDetails.classified_images = [];

                $scope.classifiedDetails.classified_images.push(imageUrlPath + $scope.classifiedDetails.images[0].title_image_name);
                $scope.classifiedDetails.classified_images.push(imageUrlPath + $scope.classifiedDetails.images[0].body_image1_name);
                $scope.classifiedDetails.classified_images.push(imageUrlPath + $scope.classifiedDetails.images[0].body_image2_name);
                $scope.classifiedDetails.classified_images.push(imageUrlPath + $scope.classifiedDetails.images[0].body_image3_name);
                $scope.classifiedDetails.classified_images.push(imageUrlPath + $scope.classifiedDetails.images[0].body_image4_name);
            });

        $scope.ClassifiedRfiDialog = function (classifiedId) {
            var classifiedRfiDialog = ngDialog.open(
                {
                    template: 'rfiClassifiedTemplateId',
                    className: 'ngdialog-theme-plain',
                    scope: $scope,
                    controller: $controller('classifiedRfiCtrl', {
                        $scope: $scope,
                        classifiedId: classifiedId
                    })
                });

            classifiedRfiDialog.closePromise.then(function (data) {

                if (data.value.status) {
                    toastr.success(data.message, 'Classified rfi submitted successfully.');
                }
            });
        }
    });

evezownApp.controller('classifiedRfiCtrl', function ($scope, usSpinnerService, classifiedId,
                                                     ClassifiedsService, ngDialog) {
    console.log(classifiedId);

    $scope.formData = {};

    // Crop Title image
    $scope.saveRfiDetails = function () {

        usSpinnerService.spin('spinner-1');

        ClassifiedsService.saveRfiDetails($scope.formData, classifiedId)
            .then(function (data) {
                usSpinnerService.stop('spinner-1');
                ngDialog.close("", data);
            });
    }
});

