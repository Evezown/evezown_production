
'use strict';

evezownApp
    .controller('storelist',
    function AdminUsers($scope, $http, $routeParams, PATHS, usSpinnerService,Session)
    {

        $scope.title = "Stores";
        usSpinnerService.spin('spinner-1');
       $http.get(PATHS.api_url + 'users/store/get').
            success(function(data)
            {
                $scope.groups = data.data;
                $scope.paging = data.meta.pagination;
                $scope.totalPages = new Array(Number($scope.paging.total_pages));
                $scope.active = $scope.paging.current_page;
                $scope.next = data.meta.next;
                usSpinnerService.stop('spinner-1');
            });
    });