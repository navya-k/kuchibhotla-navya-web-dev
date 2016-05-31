(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;

        vm.createUser = createUser;

        function createUser(newUser) {
            var userCreated = UserService.createUser(newUser);
            if(userCreated) {
                $location.url("/user/"+userCreated._id);
            } else {
                vm.error = "Unable to register user";
            }

        }
    }
})();