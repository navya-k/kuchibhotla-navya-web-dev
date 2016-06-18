(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;

        vm.createUser = createUser;

        function createUser(newUser) {

            if (newUser.password === newUser.verifypass) {
                UserService
                    .register(newUser)
                    .then(
                        function (response) {
                            var user = response.data;
                            if (user) {
                                $location.url("/user/" + user._id);
                            }
                            else {
                                vm.error = "unable to create user.";
                            }
                         },
                        function(err){
                            vm.error = err;
                        }
                    );
            }
            else {
                vm.error = "passwords do not match.";
            }
        }
    }
})();