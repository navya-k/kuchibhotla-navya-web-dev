(function(){
    angular
        .module("Project")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl : "views/home.html",
                controller : "HomeController",
                controllerAs : "model"
                         
            })
            .when("/login", {
                templateUrl : "views/user/signin.view.client.html",
                controller : "SigninController",
                controllerAs : "model"
            })
            .when("/register", {
                templateUrl : "views/user/register.view.client.html",
                controller : "RegisterController",
                controllerAs : "model"
            })
            .when("/user", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })
            .when("/events/:searchTerm", {
                templateUrl: "views/event/event-list.view.client.html",
                controller: "EventSearchController",
                controllerAs: "model"
            })

            .when("/user/:userId/events", {
                templateUrl: "views/event/event-list.view.client.html",
                controller: "FavouriteEventsController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })
            
            .when("/user/:userId/events/:searchTerm", {
                templateUrl: "views/event/event-list.view.client.html",
                controller: "EventSearchController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })

            .when("/user/:userId/event/:eventId", {
                templateUrl: "views/event/event-list.view.client.html",
                controller: "EventSearchController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })

            .when("/user/:userId/favourite/:eventId", {
                templateUrl: "views/event/event-detail.view.client.html",
                controller: "FavouriteDetailController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })
            
 
            .when("/group/:groupUrl/event/:meetupId", {
                templateUrl: "views/event/event-detail.view.client.html",
                controller: "EventDetailController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })

            .when("/user/:userId/event/:eventId/comment/new", {
                templateUrl: "views/comment/new-comment.view.client.html",
                controller: "NewCommentController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })

            .when("/user/:userId/event/:eventId/comment/:commentId/edit", {
                templateUrl: "views/comment/edit-comment.view.client.html",
                controller: "EditCommentController",
                controllerAs: "model",
                resolve: {
                    loggedIn : checkLoggedIn
                }
            })

        
            .otherwise ({
                redirectTo : "/"
            });

        // q library within angular helps establish promises
        function checkLoggedIn(MemberService, $location, $q, $rootScope) {

            var deferred = $q.defer();

            MemberService
                .loggedIn()
                .then(
                    function(response){
                        var user = response.data;
                        //console.log(user);
                        if(user == '0') {
                            $rootScope.currentUser = null;
                            deferred.reject();
                            $location.url("/login");
                        }
                        else{
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function(err){
                        $location.url("/login");
                    }
                );

            return deferred.promise;
        }
    }
})();