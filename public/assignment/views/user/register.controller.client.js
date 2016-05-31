(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($routeParams, UserService) {
        var vm = this;

        vm.updateUser = updateUser;

        var id = $routeParams.id;

        function init() {
            vm.user = UserService.findUserById(id);
        }
        init();

        function updateUser(newUser) {
            UserService.updateUser(id, newUser);
        }
    }
})();