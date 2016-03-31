/**
 * Created by devcert on 12/01/15.
 */
'use strict';

evezownApp
    .controller('AdminListUsers',
    function AdminUsers($scope, $http,$routeParams, PATHS, usSpinnerService,Session, ngTableParams,$location,$rootScope,$cookieStore,ProfileDetailsService)
    {
        $scope.profile = {};
        $scope.title = "Users";
        $scope.loggedInUser = $cookieStore.get('userId');
        $scope.service_url = PATHS.api_url;
        usSpinnerService.spin('spinner-1');

function fetchPersonalInfo(userId) {

            usSpinnerService.spin('spinner-1');
            ProfileDetailsService.getPersonalInfo(userId).then(function(data){

                usSpinnerService.stop('spinner-1');

                $scope.profile.firstname = data.firstname;
                $scope.profile.lastname = data.lastname;
                $scope.profile.phone = data.phone;
                $scope.profile.email = data.email;
                $scope.profile.streetAddress = data.streetAddress;
                $scope.profile.city = data.city;
                $scope.profile.state = data.state;
                $scope.profile.country = data.country;
                $scope.profile.zip = data.zip;
                $scope.profile.education1 = data.education1;
                $scope.profile.education2 = data.education2;
                $scope.profile.education3 = data.education3;
                $scope.profile.skills = data.skills;
                $scope.profile.language1 = data.language1;
                $scope.profile.language2 = data.language2;
                $scope.profile.language3 = data.language3;
                $scope.profile.profession = data.profession;
                $scope.profile.name_organization1 = data.name_organization1;
                $scope.profile.designation1 = data.designation1;
                $scope.profile.work_experience1 = data.work_experience1;
                $scope.profile.other_info1 = data.other_info1;
                $scope.profile.userId = data.id;
            });
        }

        fetchPersonalInfo($routeParams.userId);

        $http.get(PATHS.api_url + 'admin/'+$cookieStore.get('userId')+'/users?page='+$routeParams.index).
            success(function(data)
            {
                $scope.users = data.data;
                // $scope.paging = data.meta.pagination;
                // $scope.totalPages = new Array(Number($scope.paging.total_pages));
                // $scope.active = $scope.paging.current_page;
                // $scope.next = data.meta.next;
                usSpinnerService.stop('spinner-1');

                $scope.userAdminTableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: $scope.users.length, // length of data
            getData: function ($defer, params) {
                $defer.resolve($scope.users.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        })

        $scope.getPersonalInfo = function(user)
        { 
            $location.path('/editUserInfo/'+user.id);
        }

        
        $scope.savePersonalInfo = function ($profile) {
            usSpinnerService.spin('spinner-1');
            ProfileDetailsService.savePersonalInfo($profile).then(function (data) {
                usSpinnerService.stop('spinner-1');
                toastr.success(data.message, 'Personal Info');
                $location.path('admin/users/1');
            });
        }

        
       });
});