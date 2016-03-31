'use strict';

/**
 * @ngdoc directive
 * @name appApp.directive:ngCommentReccoRewoiceGrade
 * @description
 * # ngCommentReccoRewoiceGrade
 */
evezownApp
    .directive('ngCommentReccoRewoiceGrade', function () {
        return {
            templateUrl: 'app/scripts/directives/comment-recco-rewoice-grade.tpl.html',
            restrict: 'E',
            scope: {
                comments: '=',
                isComments: '=',
                totalGrade: '=',
                avgGrade: '=',
                grades: '=',
                isGrades: '=',
                isRestream : '=',
                restreams : '='
            },
            controller: function($scope, StoreService) {

                $scope.isComments = true;
                $scope.isGrades = true;
                $scope.isRestream = true;

                $scope.comments = null;

                $scope.totalGrade = 0;

                $scope.loadComments = function() {
                    $scope.isHideComments = !$scope.isHideComments;
                };

                $scope.updateLevels = function() {

                };

                $scope.getLevelsByUserId = function() {

                };

                $scope.addRestream = function() {

                };

            }
        };
    });
