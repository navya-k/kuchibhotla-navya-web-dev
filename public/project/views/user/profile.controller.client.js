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
        vm.addUser = addUser;

        var id = $rootScope.currentUser._id;

        function init() {
            MemberService
                .findUserById(id)
                .then(function (response){
                    vm.user = response.data;
                    if(vm.user.userType === "admin"){
                        MemberService
                            .getUsers()
                            .then(function(users){
                                vm.adminUsers = users.data;
                            })
                    }
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
            MemberService
                .deleteUser(id)
                .then(
                    function(stats){
                       logout();
                    },
                    function(err) {
                        vm.error = "Unable to remove user."
                    }
                );
        }

        function searchForEvent(searchText) {
            $location.url("/user/"+id+"/events/"+searchText);
        }

        function addUser(uname, pass){
            var newUser = {
                username : uname,
                password : pass

            }
            MemberService
                .createUser(newUser)
                .then(
                    function (response) {
                        var user = response.data;
                        init();

                    },
                    function(err){

                        vm.error = err;
                    }
                );
        }

        
    }
})();