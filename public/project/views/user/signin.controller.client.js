(function(){
    angular
        .module("Project")
        .controller("LoginController", LoginController);

    
    function LoginController($location, UserService, $rootScope) {
        var vm = this;

        vm.login = function(username, password) {
            UserService
                .login(username, password)
                .then(function(response){
                    var user = response.data;
                    if(user && user._id) {
                        $rootScope.currentUser = user;
                        $location.url("/user");
                    } else {
                        $rootScope.currentUser = null;
                        vm.error = "User not found";
                    }
                },
                function(err){
                    $rootScope.currentUser = null;
                    vm.error = "User not found";
                });
        }
    }
})();