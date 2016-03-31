evezownApp
    .factory('AuthService', function ($http, Session, PATHS, $cookieStore) {

        AuthService = {};

        var imageName = "";
        var profileData = [];
        AuthService.login = function (credentials) {
            return $http
                .post(PATHS.api_url + 'login', credentials)
                .success(function(data)
                {

                }).error(function (data)
                {
                    return data;
                })
                .then(function (res)
                {
                        Session.create(res.data.data.api_key, res.data.data.id, res.data.data.firstname, res.data.data.lastname,
                            res.data.data.role);
                        return res.data.user;
                });
        };


        AuthService.getProfileImage = function (imagePath)
        {
            return $http({
                url: imagePath,
                method: 'GET'
            })
        }

        AuthService.setImage = function (imagePath)
        {
            return $http({
                url: imagePath,
                method: 'GET'
            }).success(function(data){
                if(data)
                {
                    imageName = PATHS.api_url +'image/show/'+ data + '/300/217';
                }
                else
                {
                    imageName = null;
                }

            });
        }

        AuthService.getImage = function ()
        {
            return imageName;

        }

        AuthService.setProfile = function (profileUrl)
        {
            return $http({
                url: profileUrl,
                method: 'GET'
            }).success(function(data){
                profileData = data;
            });
        }

        AuthService.getProfile = function ()
        {
            return profileData;
        }

        AuthService.getUser = function () {
            var params = {
                data: { api_key : $cookieStore.get('api_key') }
            }

            return $http
                .post(PATHS.api_url + 'users/get', params)
                .then(function (res) {
                    Session.create(res.data.data.api_key,
                        res.data.data.id,
                        res.data.data.firstname,
                        res.data.data.lastname,
                        res.data.data.role);
                    return res.data.data;
                });
        }

        AuthService.isAuthenticated = function () {
            return !!Session.get().userId;
        };

        AuthService.isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (AuthService.isAuthenticated() &&
            authorizedRoles.indexOf(Session.get().userRole) !== -1);
        };


        AuthService.logout = function()
        {
            Session.destroy();
        };

        AuthService.isLoggedIn = function()
        {
            if(Session.get().firstname === null) {
                AuthService.currentUser = Session.get().firstname + ', ' + Session.get().lastname;
            }

            return !! Session.get().userId;
        };

        AuthService.currentUser = function()
        {
            return Session.get().firstname + ', ' + Session.get().lastname;
        }

        return AuthService;
    });

evezownApp
    .service('Session', function ($cookieStore) {

        Session = {};
        Session.create = function (apiKey, userId, firstname, lastname, email, userRole)
        {
            this.api_key = apiKey;
            this.userId = userId;
            this.firstname = firstname;
            this.lastname = lastname;
            this.userRole = userRole;
            $cookieStore.put('userId',userId);
        };
        Session.destroy = function () {
            this.api_key = null;
            this.userId = null;
            this.userRole = null;
            this.firstname = null;
            this.lastname = null;
        };
        Session.get = function()
        {
            return Session;
        };

        return Session;
    });