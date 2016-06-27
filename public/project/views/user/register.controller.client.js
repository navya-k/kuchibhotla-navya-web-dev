(function(){
    angular
        .module("Project")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, MemberService, $rootScope) {
        var vm = this;

        vm.createUser = createUser;

        function createUser(newUser) {

            if (newUser.password === newUser.verifypass) {
                MemberService
                    .register(newUser)
                    .then(
                        function (response) {
                            var user = response.data;
                            if (user) {
                                $rootScope.currentUser = user;
                                $location.url("/user");
                            }
                            else {
                                $rootScope.currentUser = null;
                                vm.error = "unable to create user.";
                            }
                         },
                        function(err){
                            $rootScope.currentUser = null;
                            vm.error = err;
                        }
                    );
            }
        }
    }
})();