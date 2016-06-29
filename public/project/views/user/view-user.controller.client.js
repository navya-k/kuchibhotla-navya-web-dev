(function(){
    angular
        .module("Project")
        .controller("ViewUserController", ViewUserController);

    function ViewUserController($location, $routeParams, MemberService, $rootScope) {
        var vm = this;


        var userId = $routeParams.userId;

        function init() {
            MemberService
                .findUserById(userId)
                .then(function (response){
                    vm.user = response.data;
                    
                });
        }
        init();
    }
})();