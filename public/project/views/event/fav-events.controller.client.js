(function(){
    angular
        .module("Project")
        .controller("FavouriteEventsController", FavouriteEventsController);

    function FavouriteEventsController($location, $routeParams, EventService, $rootScope) {
        var vm = this;

        vm.userId = $routeParams.userId;
        vm.currentUser = $rootScope.currentUser;
        function init() {
            console.log(vm.userId);
            EventService
                .findEventsForUser(vm.userId)
                .then(function(response){
                    console.log(response.data.events);
                    vm.events = response.data.events;
                    },
                    function(err){
                        console.log(err);
                    });
        }
        init();
    }
})();