'use strict';

evezownApp
    .controller('forumlists',
    function AdminUsers($scope, $http, $routeParams, PATHS, usSpinnerService,
                        Session, ngDialog, $controller, ngTableParams,ForumService) {

        $scope.title = "Forums";


        function getAllForums() {

            usSpinnerService.spin('spinner-1');
            $http.get(PATHS.api_url + 'users/forums/all').
                success(function (data) {
                    $scope.forums = data.data;
                    // $scope.paging = data.meta.pagination;
                    // $scope.totalPages = new Array(Number($scope.paging.total_pages));
                    // $scope.active = $scope.paging.current_page;
                    // $scope.next = data.meta.next;
                    usSpinnerService.stop('spinner-1');
                    $scope.forumAdminTableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10           // count per page
        }, {
        total: $scope.forums.length, // length of data
        getData: function ($defer, params) {
        $defer.resolve($scope.forums.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
        })
                });
        }

        getAllForums();

        $scope.EditForum = function (selectedForum) {

            var EditForumDialog = ngDialog.open(
                {
                    template: 'EdittemplateId',
                    scope: $scope,
                    // className: 'ngdialog-theme-plain',
                    controller: $controller('EditForumCtrl', {
                        $scope: $scope,
                        selectedForum: selectedForum
                    })
                });

            EditForumDialog.closePromise.then(function (data) {
                console.log('Discussion: ' + data);

                if (data.value.status)
                    getAllForums();
            });
        } 


        function fetchForum() {
            usSpinnerService.spin('spinner-1');
            ForumService.getForums().then(function (data) {

                usSpinnerService.stop('spinner-1');

                $scope.forums = data;
            });
        }

        fetchForum();


        $scope.DeleteForumDialog = function(id)
        {
            //ngDialog.open({ template: 'deleteForumTemplateId' });
            var deleteForumDialog = ngDialog.open(
                {
                    template: 'deleteForumTemplateId',
                    scope: $scope,
                    controller: $controller('deleteForumCtrl', {
                        $scope: $scope,
                        forumId: id
                    })
                });

            deleteForumDialog.closePromise.then(function (data) {

                if(data.value.status) {
                    toastr.success(data.value.message);
                    fetchForum();
                }    
            });
        }

    });

evezownApp.controller('EditForumCtrl', function ($scope,
                                                 ngDialog, PATHS, $http, $cookieStore,
                                                 selectedForum, $filter) {

    $scope.service_url = PATHS.api_url;
    $scope.loggedInUserId = $cookieStore.get('userId');
    $scope.selectedForum = selectedForum;
    $scope.selectedForum.selectedVisibility = {};

    // Load the categories and visibilities on launch of the edit dialog and set the
    // existing values.


    $scope.visibilties = [];

    $scope.getSubcategories = function (catId) {
        $http.get(PATHS.api_url + 'subcategories/' + catId).
            success(function (data) {
                $scope.subcategories = data.data;

                var subCategoryId = $scope.selectedForum.subcategory.id;

                var selectedSubCat = $filter('filter')($scope.subcategories, function (subcategory) {
                    return subcategory.id == subCategoryId;
                })[0];

                console.log("Sub Cat " + selectedSubCat);

                $scope.selectedForum.selectedSubcategory = selectedSubCat;

            });
    }

    // Get all categories on load. 
    function getCategories() {
        $http.get(PATHS.api_url + 'categories/1').
            success(function (data) {

                $scope.categories = data.data;

                var categoryId = $scope.selectedForum.subcategory.category_id;

                // Filter through categories to match with the category of current selected
                // Discussion item. If matched, return it and bind with the selectedCategory
                // Model
                var selectedCat = $filter('filter')($scope.categories,
                    function (category) {
                        console.log(category.id);
                        return category.id == categoryId;
                    })[0];

                $scope.selectedForum.selectedCategory = selectedCat;
            });
    }

    getCategories();
    $scope.getSubcategories($scope.selectedForum.subcategory.category_id);
    GetVisibility();

    function GetVisibility() {
        //Loading user visibility section (with all,circle,friends,me)
        $http.get(PATHS.api_url + 'visibility').
            success(function (data) {
                $scope.visibilties = data;
                var selectedVis = $filter('filter')($scope.visibilties,
                    function (visibility) {
                        return visibility.id == $scope.selectedForum.visibility_id;
                    })[0];

                $scope.selectedForum.selectedVisibility = selectedVis;
            });
    }

    $scope.UpdateForum = function () {
        console.log($scope.selectedForum);
        $http.post($scope.service_url + 'users/forums/update',
            {
                data: {
                    title: $scope.selectedForum.topic_title,
                    description: $scope.selectedForum.topic_description,
                    forum_id: $scope.selectedForum.id,
                    visibility_id: $scope.selectedForum.selectedVisibility.id,
                    sub_cat_id : $scope.selectedForum.selectedSubcategory.id
                },
                headers: {'Content-Type': 'application/json'}
            }).
            success(function (data, status, headers, config) {
                ngDialog.close("", data);
                toastr.success(data.message, 'Discussion');
            }).error(function (data) {
                toastr.error(data.error.message, 'Discussion');
            }).then(function () {
                $scope.GetMyForums();
            });
    }
});
evezownApp.controller('deleteForumCtrl', function($scope, ForumService, $cookieStore,
                                                    usSpinnerService, forumId, ngDialog) {
    console.log(forumId);

    // Delete Group item
    $scope.forumId = forumId;
    $scope.userId = $cookieStore.get('userId');
    $scope.deleteForum = function () {
        usSpinnerService.spin('spinner-1');
        ForumService.deleteForum($scope.userId, $scope.forumId).then(function (data) {
            usSpinnerService.stop('spinner-1');
            ngDialog.close("", data);
        });
    }

    $scope.cancelDeleteForum = function() {
        ngDialog.close();
    }
});
