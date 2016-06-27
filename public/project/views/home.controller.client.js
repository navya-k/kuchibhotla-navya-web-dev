(function(){
    angular
        .module("Project")
        .controller("HomeController", HomeController);

    function HomeController($location, MemberService, $rootScope) {
        var vm = this;
        
        vm.eventSearch = eventSearch;
        vm.logout = logout;
        function eventSearch(searchText) {
            $location.url("/events/"+searchText);
        }

        function logout() {
            MemberService
                .logout()
                .then(function(){
                    $rootScope.currentUser = null;
                    $location.url("/");
                });
        }
    }
    
})();