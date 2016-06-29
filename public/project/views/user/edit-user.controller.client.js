(function(){
    angular
        .module("Project")
        .controller("EditUserController", EditUserController);

    function EditUserController($location, $routeParams, MemberService, $rootScope) {
        var vm = this;
        var userId = $routeParams.userId;
        vm.updateUserByAdmin = updateUserByAdmin;
        vm.deleteUserByAdmin = deleteUserByAdmin;
        function init() {
            MemberService
                .findUserById(userId)
                .then(function (response){
                    vm.user = response.data;
                    console.log("found");
                });
        }
        init();

        function updateUserByAdmin(newUser) {
            console.log("update");
            MemberService
                .updateUser(userId, newUser)
                .then(
                    function(response) { 
                        $location.url("/user");
                    },
                    function(error) {
                        vm.error = "Unable to update user"
                    }
                );
        }
        
        function deleteUserByAdmin(userId){
            MemberService
                .deleteUser(userId)
                .then(
                    function(stats){
                       $location.url("/user");
                    },
                    function(err) {
                        vm.error = "Unable to remove user."
                    }
                );
        }
    }
})();