(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;

        vm.updateUser = updateUser;

        var id = $routeParams.id;

        function init() {
            UserService
                .findUserById(id)
                .then(function (response){
                    vm.user = response.data;
                });
        }
        init();

        function updateUser(newUser) {
            UserService.updateUser(id, newUser);
        }
    }
})();