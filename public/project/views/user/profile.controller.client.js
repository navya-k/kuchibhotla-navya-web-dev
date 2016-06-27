(function(){
    angular
        .module("Project")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, MemberService, $rootScope) {
        var vm = this;

        vm.updateUser = updateUser;
        vm.unregister = unregister;
        vm.logout = logout;
        vm.searchForEvent = searchForEvent;

        var id = $rootScope.currentUser._id;

        function init() {
            MemberService
                .findUserById(id)
                .then(function (response){
                    vm.user = response.data;
                });
        }
        init();

        function updateUser(newUser) {
            MemberService
                .updateUser(id, newUser)
                .then(
                    function(response) {
                        vm.success = "Updated successfully";
                    },
                    function(error) {
                        vm.error = "Unable to update user"
                    }
                );
        }

        function logout() {
            MemberService
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function(err){
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                )
        }

        function unregister() {
            UserService
                .deleteUser(id)
                .then(
                    function(){
                        $location.url("/login");
                    },
                    function() {
                        vm.error = "Unable to remove user."
                    }
                );
        }

        function searchForEvent(searchText) {
            $location.url("/user/"+id+"/events/"+searchText);
        }
    }
})();