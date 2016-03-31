/**
 * Created by vishu on 27/08/15.
 */
evezownApp.factory('ClassifiedsService', ['$http', '$q', 'PATHS' ,function ($http, $q, PATHS){

    ClassifiedsService = {};

    ClassifiedsService.getAllClassifieds = function () {
        var deferred = $q.defer();
        $http.get(PATHS.api_url +  'classifieds')
            .success(function(data){
                deferred.resolve(data.data);
            })
            .error(function(err){
                console.log('Error retrieving classifieds');
                deferred.reject(err);
            });
        return deferred.promise;
    }

    ClassifiedsService.getClassifieds = function ($subCatId) {
        var deferred = $q.defer();
        $http.get(PATHS.api_url +  'classifieds/' + $subCatId)
            .success(function(data){
                deferred.resolve(data.data);
            })
            .error(function(err){
                console.log('Error retrieving classifieds');
                deferred.reject(err);
            });
        return deferred.promise;
    }

    ClassifiedsService.getClassified = function ($classifiedId) {
        var deferred = $q.defer();
        $http.get(PATHS.api_url +  'users/classifieds/' + $classifiedId)
            .success(function(data){
                deferred.resolve(data.data);
            })
            .error(function(err){
                console.log('Error retrieving classified');
                deferred.reject(err);
            });
        return deferred.promise;
    }

    ClassifiedsService.saveClassifiedsStep1 = function ($classified, $userId) {

        var deferred = $q.defer();
        $http.post(PATHS.api_url +  'users/' + $userId + '/classifieds/step1/add', $classified)
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                console.log('Error on saving');
                deferred.reject(err);
            });
        return deferred.promise;
    }

    ClassifiedsService.saveClassifiedsStep2 = function ($classified, $userId) {

        var deferred = $q.defer();
        $http.post(PATHS.api_url +  'users/' + $userId + '/classifieds/step2/add', $classified)
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                console.log('Error on saving');
                deferred.reject(err);
            });
        return deferred.promise;
    }

    ClassifiedsService.saveClassifiedsStep3 = function ($classified, $userId) {

        var deferred = $q.defer();
        $http.post(PATHS.api_url +  'users/' + $userId + '/classifieds/step3/add', $classified)
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                console.log('Error on saving');
                deferred.reject(err);
            });
        return deferred.promise;
    }

    ClassifiedsService.uploadTitleImage = function ($image, $coords) {
        var deferred = $q.defer();

        var requestData = { image : $image, width: $coords.w, height: $coords.h, x: $coords.x, y: $coords.y};

        $http.post(PATHS.api_url +  'image/crop', requestData)
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                console.log('Error on saving');
                deferred.reject(err);
            });
        return deferred.promise;
    }

    ClassifiedsService.removeTag = function ($tagId) {
        var deferred = $q.defer();

        $http.get(PATHS.api_url +  'users/classifieds/tags/' + $tagId +'/remove')
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                console.log('Error on saving');
                deferred.reject(err);
            });
        return deferred.promise;
    }

    ClassifiedsService.updateStatus = function ($statusData, $classifiedId) {
        var deferred = $q.defer();

        $http.post(PATHS.api_url +  'users/classifieds/' + $classifiedId + '/status/update', $statusData)
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                console.log('Error on saving');
                deferred.reject(err);
            });
        return deferred.promise;
    }

    ClassifiedsService.saveRfiDetails = function ($rfiData, $classifiedId) {
        var deferred = $q.defer();

        $http.post(PATHS.api_url +  'classifieds/' + $classifiedId + '/rfi/create', $rfiData)
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err){
                console.log('Error on saving');
                deferred.reject(err);
            });
        return deferred.promise;
    }

    return ClassifiedsService;

}]);