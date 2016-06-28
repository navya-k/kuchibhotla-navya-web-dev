(function(){
    angular
        .module("Project")
        .controller("EventSearchController", EventSearchController);

    function EventSearchController($location, $routeParams, EventService, $rootScope) {
        var vm = this;

        vm.searchText = $routeParams.searchTerm;
        vm.currentUser = $rootScope.currentUser;
        function init() { 
            EventService
                .searchEvents(vm.searchText)
                .then(function(response){ 
                    vm.events = response.data.results; ;
                    },
                    function(err){
                        console.log(err);
                    });
        }
        init();
    }
})();