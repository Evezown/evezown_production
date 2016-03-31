
'use strict';

evezownApp
.controller('bloglists',
function AdminUsers($scope, $http, $routeParams, PATHS, usSpinnerService,Session,ngDialog,$rootScope,$cookieStore,$location,BlogService, $controller,ngTableParams)
{
    $scope.service_url = PATHS.api_url;
    $rootScope.selectedBlog = "";
    $scope.visibilties = [];
    $scope.selectedVisibility = null;
    $scope.loggedInUserId = $cookieStore.get('userId');
    $scope.categories = [];
    $scope.subcategories = [];
    $scope.selectedOption = null;
    $scope.selectedCategory = "";
    $scope.category1 = null;
    $scope.selectedsubcategories = null;
    $scope.selectedSubCategory = "";
    $scope.selectedVisibility = null;
    $scope.blogs = [];

    $scope.title = "Blogs";
    usSpinnerService.spin('spinner-1');

    $http.get(PATHS.api_url + 'users/blogs/published').
    success(function(data)
    {
        $scope.blogs = data.data;
        // $scope.paging = data.meta.pagination;
        // $scope.totalPages = new Array(Number($scope.paging.total_pages));
        // //$scope.active = $scope.paging.current_page;
        // $scope.next = data.meta.next;
        usSpinnerService.stop('spinner-1');

        $scope.blogAdminTableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: $scope.blogs.length, // length of data
            getData: function ($defer, params) {
                $defer.resolve($scope.blogs.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        })


        $scope.EditBlog = function(blog)
    {
        $location.path('/editblogs/'+blog.id);
    }

        function fetchBlogs() {
            usSpinnerService.spin('spinner-1');
            BlogService.getBlogs().then(function (data) {

                usSpinnerService.stop('spinner-1');

                $scope.blogs = data;
            });
        }

        fetchBlogs();

        $scope.DeleteBlogDialog = function(id)
        {
            var deleteBlogDialog = ngDialog.open(
                {
                    template: 'deleteBlogTemplateId',
                    scope: $scope,
                    controller: $controller('deleteBlogCtrl', {
                        $scope: $scope,
                        blogId: id
                    })
                });

            deleteBlogDialog.closePromise.then(function (data) {

                if(data.value.status) {
                    toastr.success(data.value.message, 'Blog deleted');
                    fetchBlogs();
                }
            });
        }
    });
});

evezownApp.controller('deleteBlogCtrl', function($scope, BlogService, $cookieStore,
                                                usSpinnerService, blogId, ngDialog) {
    console.log(blogId);

    // Delete blog item
    $scope.blogId = blogId;
    $scope.userId = $cookieStore.get('userId');
    $scope.deleteBlog = function () {
        usSpinnerService.spin('spinner-1');
        BlogService.deleteBlog($scope.userId, $scope.blogId).then(function (data) {
            usSpinnerService.stop('spinner-1');
            ngDialog.close("", data);
           
        });
    }

    $scope.cancelDeleteBlog = function() {
        ngDialog.close();
    }
});
