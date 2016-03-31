'use strict';

evezownApp
    .controller('AdminInviteCtrl',
    function AdminInvites($scope, $http, PATHS,usSpinnerService, $cookieStore)
    {
        $scope.title = "Invites";
        usSpinnerService.spin('spinner-1');
        $http.get(PATHS.api_url + 'admin/' + $cookieStore.get('userId') +'/invites').
            success(function (data) {
                $scope.invites = data.data;
                $scope.paging = data.meta.pagination;
                $scope.totalPages = new Array(Number($scope.paging.total_pages));
                $scope.active = $scope.paging.current_page;
                $scope.next = data.meta.next;
                usSpinnerService.stop('spinner-1');
            });
        $scope.AcceptInvite = function (item)
        {
            usSpinnerService.spin('spinner-1');
            // Simple POST request example (passing data) :
            $http.post(PATHS.api_url + 'admin/'+ $cookieStore.get('userId') +'/invite/'+item+'/accept'
                ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).
                success(function (data, status, headers, config)
                {
                    $scope.approvalStatus = data.status;

                    toastr.success(data.message, 'Accept Invite');
                    $scope.title = "Invites";
                    $http.get(PATHS.api_url + 'admin/'+ $cookieStore.get('userId')  +'/invites').
                        success(function (data) {
                            $scope.invites = data.data;
                            $scope.paging = data.meta.pagination;
                            $scope.totalPages = new Array(Number($scope.paging.total_pages));
                            $scope.active = $scope.paging.current_page;
                            $scope.next = data.meta.next;
                        });
                    usSpinnerService.stop('spinner-1');
                    $location.path("/admin");
                }).
                error(function (data, status, headers, config) {
                    $scope.approvalStatus = data.status;
                    toastr.success(data.message, 'Accept Invite');
                    usSpinnerService.stop('spinner-1');
                    $location.path("/admin");
                });


        }

        $scope.RejectInvite = function (item)
        {
            usSpinnerService.spin('spinner-1');
            // Simple POST request example (passing data) :
            $http.post(PATHS.api_url + '/admin/'+ $cookieStore.get('userId') +'/invite/'+item+'/reject'
                ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).
                success(function (data, status, headers, config) {
                    $scope.approvalStatus = data.status;
                    toastr.success(data.message, 'Reject Invite');
                    $scope.title = "Invites";
                    $http.get(PATHS.api_url + 'admin/'+ $cookieStore.get('userId') +'/invites').
                        success(function (data) {
                            $scope.invites = data.data;
                            $scope.paging = data.meta.pagination;
                            $scope.totalPages = new Array(Number($scope.paging.total_pages));
                            $scope.active = $scope.paging.current_page;
                            $scope.next = data.meta.next;
                        });
                    usSpinnerService.stop('spinner-1');
                    $location.path("/admin");

                }).
                error(function (data, status, headers, config) {
                    $scope.approvalStatus = data.status;
                    toastr.success(data.message, 'Reject Invite');
                    usSpinnerService.stop('spinner-1');
                    $location.path("/admin");
                });
        }
    }

);