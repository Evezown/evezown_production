/**
 * Created by vishu on 20/08/15.
 */
  evezownApp.factory('BlogService', ['$http', '$q', 'PATHS' ,function ($http, $q, PATHS){

    BlogService = {};
    BlogService.getBlogs = function () {
    var deferred = $q.defer();
    $http.get(PATHS.api_url + 'users/blogs/published')
        .success(function(data){
            deferred.resolve(data.data);
        })
        .error(function(err){
            console.log('Error retrieving blogs');
            deferred.reject(err);
        });
        return deferred.promise;
    }

    BlogService.deleteBlog = function ($userId, $blogId) {
    var deferred = $q.defer();
    $http.get(PATHS.api_url + 'users/blogs/'+$blogId+'/delete', { user_id : $userId, blog_id : $blogId})
        .success(function(data){
            deferred.resolve(data);
        })
        .error(function(err){
            console.log('Error on saving');
            deferred.reject(err);
        });
        return deferred.promise;
    }
    return BlogService;
}]);