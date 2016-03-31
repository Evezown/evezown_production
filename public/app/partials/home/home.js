/**
 * Created by creativethoughtssystechindiaprivatelimited on 27/12/14.
 */
'use strict';

evezownApp
    .controller('LoginController', function ($scope, $rootScope, $cookieStore ,$location, AUTH_EVENTS, AuthService,ngDialog,usSpinnerService) {

            $scope.title = "Login to Evezown";


        $scope.credentials =
        {
            username: '',
            password: '',
            remember: ''
        };

        if($cookieStore.get('remember'))
        {
            $scope.credentials.email = $cookieStore.get('user');
            $scope.credentials.password = $cookieStore.get('pass');
            $scope.credentials.remember = $cookieStore.get('remember');
        }

        $scope.forgot = function()
        {
            ngDialog.open({ template: 'templateId' });
        }

        $scope.ResetPassword = function()
        {
            if($scope.email)
            {
                toastr.success('Login', 'a mail has been sent to your registered email id');
                ngDialog.close();
            }
            else
            {
                toastr.error('Please enter an email id.', 'Login');
            }
        }

        $scope.login = function (credentials)
        {
            usSpinnerService.spin('spinner-1');
            if(credentials.remember)
            {
                $cookieStore.put('user', credentials.email);
                $cookieStore.put('pass', credentials.password);
                $cookieStore.put('remember', credentials.remember);
            }
            else
            {
                $cookieStore.remove('user');
                $cookieStore.remove('pass');
                $cookieStore.remove('remember');
            }
            AuthService.login(credentials).then(function (user)
            {
                    $cookieStore.put('api_key', Session.api_key);
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    toastr.success('Login', 'You have logged in successfully');
                    $location.path('/recco');
            }, function (res)
            {
                usSpinnerService.stop('spinner-1');
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                toastr.error(res.data.error.message, 'Login');
                $location.path('/login');
            });
        };
});

evezownApp
    .controller('SignupController', function ($scope, $rootScope, $location, AUTH_EVENTS, AuthService, $routeParams) {
        $scope.model = {
            title : "Sign up with Evezown",
            inviteCode : $routeParams.code
        };

        $scope.signupDetails = {
            username: '',
            password: ''
        };

        // function to handle submitting the form
        // Request an invite
        $scope.signup = function (signupDetails) {

            // save the comment. pass in comment data from the form
            // use the function we created in our service
            AuthService.signup(signupDetails)
                .success(function (data) {
                    $scope.inviteResponse = data.error.status_code;
                    toastr.success(data.error.message, 'Signup');
                    console.log(data);
                    $location.path('/home');
                })
                .error(function (data) {
                    toastr.error(data.error.message, 'Signup');
                    console.log(data);
                });
        };
    });

evezownApp
    .controller('HomeController', function($rootScope, $scope,  AuthService, $cookieStore, ArticleService){
        $scope.caption = true;
        $scope.carouselTitle = "Evezown";

      //  $rootScope.isLoggedIn = AuthService.isLoggedIn();
        $scope.CompletedEvent = function (scope) {
            console.log("Completed Event called");
        };

        $scope.ExitEvent = function (scope) {
            console.log("Exit Event called");
        };

        $scope.ChangeEvent = function (targetElement, scope) {
            console.log("Change Event called");
            console.log(targetElement);  //The target element
            console.log(this);  //The IntroJS object
        };

        $scope.BeforeChangeEvent = function (targetElement, scope) {
            console.log("Before Change Event called");
            console.log(targetElement);
        };

        $scope.AfterChangeEvent = function (targetElement, scope) {
            console.log("After Change Event called");
            console.log(targetElement);
        };

        $scope.IntroOptions = {
            steps:[
                {
                    element: '#step1',
                    intro: "Welcome to Evezown, If you don't have an account please request for an invite to sign up"
                },
                {
                    element: '#step2',
                    intro: 'This is an Ecommerce marketplace for showcasing women centric products and services on our ' +
                    'five key categories. If you are already in business or intend to start one, you can create your ' +
                    'store and/or classifieds.',
                    position: 'bottom'
                },
                {
                    element: '#step3',
                    intro: "This is resourcing platform. If you are in business, you can use it for hiring talent.",
                    position: 'bottom'
                },
                {
                    element: '#step4',
                    intro: 'So get started with your Evezown experience.'
                }
            ],
            showStepNumbers: false,
            exitOnOverlayClick: true,
            exitOnEsc:true,
            nextLabel: '<strong>NEXT!</strong>',
            prevLabel: '<span style="color:green">Previous</span>',
            skipLabel: 'Exit',
            doneLabel: 'Thanks'
        };

        $scope.ShouldAutoStart = false;

    });

evezownApp.controller('HomeProductMenuController', function ($rootScope, $scope, $location, EvezplaceHomeService, $routeParams) {

    $scope.initialLoadIndex = 0;
    $scope.currentIndex = 0;
    $rootScope.categories = [];
    $scope.productNavLinks = [{
        Title: 'Product',
        LinkText: 'Product'
    }, {
        Title: 'Services',
        LinkText: 'Services'
    }, {
        Title: 'Product + Services',
        LinkText: 'Product + Services'
    }, {
        Title: 'Classifieds',
        LinkText: 'Classifieds'
    }];

    $scope.navClass = function (page) {

        var currentRoute = $scope.productNavLinks[$scope.currentIndex].Title;
        return page === currentRoute ? 'active' : '';
    };

    $scope.GetIndex = function(index){
        if (index === 0) {$scope.currentSection = 3;}
        if (index === 1) {$scope.currentSection = 4;}
        if (index === 2) {$scope.currentSection = 6;}
        if (index === 3) {$scope.currentSection = 5;}
        $scope.currentIndex = index;
        EvezplaceHomeService.getCategories($scope.currentSection)
            .then(function (data) {
                $rootScope.categories = data;
        });
    }
    $scope.GetIndex($scope.initialLoadIndex);
});



evezownApp
    .controller('ArticlesNewsInterviewsCtrl', function($scope, ArticleService) {

        $scope.isShowMoreVideos = false;

        // Fetch all news items
        function fetchHomeNews() {
            ArticleService.getHomeNews().then(function (data) {

                $scope.news = data;
            });
        }

        // Fetch all home articles
        function fetchHomeArticles() {
            ArticleService.getHomeArticles().then(function (data) {

                $scope.articles = data;
            });
        }

        function fetchHomeInterviews() {
            ArticleService.getHomeInterviews().then(function (data) {

                $scope.interviews = data;
            });
        }

        function fetchVideos() {

            if($scope.isShowMoreVideos == false)
            {
                ArticleService.getTopVideos().then(function (data) {

                    $scope.videos = data;
                });
            }
            else{
                ArticleService.getMoreVideos().then(function (data) {

                    $scope.videos = data;
                });
            }
        }

        // Show more video click toggle
        $scope.showMoreVideos = function() {
            // Set the toggle value of bool on click. (if true, set to false and vice-versa)
            $scope.isShowMoreVideos = !$scope.isShowMoreVideos;

            fetchVideos();
        }

        fetchHomeNews();

        fetchHomeArticles();

        fetchHomeInterviews();

        fetchVideos();
    });






