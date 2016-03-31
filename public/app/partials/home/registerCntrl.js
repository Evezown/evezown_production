'use strict';

evezownApp
    .controller('registerCtrl',
    function registerUser($scope, $http, PATHS,$location,usSpinnerService, $routeParams, inviteService)
    {
        $scope.title = "Register";
        $scope.master = {};

        $scope.inviteCode = $routeParams.code;

        function fetchInvite(code) {
            inviteService.getInvite(code).then(function(data){
                $scope.master.firstname = data.name;
                $scope.master.lastname = data.surname;
                $scope.master.emailId = data.email;
                $scope.master.code = data.code;
                $scope.apply();
            });
        }

        fetchInvite($routeParams.code);

        $scope.RegisterUser = function (user)
        {
            $scope.master = angular.copy(user);
            if(!$scope.master.emailId)
            {
                toastr.error("Please enter a valid email id", 'Register');
            }
            else if(!$scope.master.password)
            {
                toastr.error("Password cannot be empty", 'Register');
            }
            else if(!$scope.master.cpassword)
            {
                toastr.error("Password cannot be empty", 'Register');
            }
            else if(!$scope.master.password.trim())
            {
                toastr.error("Password cannot be empty", 'Register');
            }
            else if(!$scope.master.cpassword.trim())
            {
                toastr.error("Password cannot be empty", 'Register');
            }
            else if($scope.master.password != $scope.master.cpassword)
            {
                toastr.error("Password mismatch", 'Register');
            }
            else if(!$scope.master.tandc)
            {
                toastr.error("Please accept the terms and conditions", 'Register');
            }
            else if(!$scope.master.code)
            {
                toastr.error("Please enter a registration code", 'Register');
            }
            else
            {
                usSpinnerService.spin('spinner-1');
                $http.post(PATHS.api_url + 'signup'
                    ,{
                        data :
                        {
                            firstname : $scope.master.firstname,
                            lastname : $scope.master.lastname,
                            email : $scope.master.emailId,
                            password : $scope.master.password,
                            code : $scope.master.code
                        },
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).
                    success(function (data, status, headers, config)
                    {
                        toastr.success(data.message, 'Register');
                        usSpinnerService.stop('spinner-1');
                        $location.path("/home");
                    }).error(function (data)
                    {
                        usSpinnerService.stop('spinner-1');
                        toastr.error(data.error.message, 'Register');
                    });
            }
        }
    }

);/**
 * Created by devcert on 14/01/15.
 */

evezownApp.factory('inviteService', ['$http', '$q', 'PATHS' ,function ($http, $q, PATHS){
    function getInvite (code) {
        var deferred = $q.defer();
        $http.get(PATHS.api_url +  'invite/' + code)
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                console.log('Error retrieving invite');
                deferred.reject(err);
            });
        return deferred.promise;
    }

    return {
        getInvite: getInvite
    };
}]);
