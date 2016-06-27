(function(){
    angular
        .module("Project")
        .controller("EventSearchController", EventSearchController);

    function EventSearchController($location, $routeParams, EventService, $rootScope) {
        var vm = this;

        vm.searchText = $routeParams.searchTerm;
        vm.currentUser = $rootScope.currentUser;
        function init() {
            console.log(vm.searchText);
            EventService
                .searchEvents(vm.searchText)
                .then(function(response){
                    console.log(response.data.results);
                    vm.events = response.data.results; ;
                    },
                    function(err){
                        console.log(err);
                    });
        }
        init();
    }
})();