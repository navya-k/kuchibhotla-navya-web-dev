(function(){
    angular
        .module("Project")
        .controller("EventDetailController", EventDetailController);

    function EventDetailController($location, $routeParams, EventService, $rootScope) {
        var vm = this;
        vm.groupUrl = $routeParams.groupUrl;
        vm.eventId = $routeParams.eventId;
     //   vm.currentUser = $rootScope.currentUser;

        function init() {
            console.log(vm.eventId);
            EventService
                .findEventById(vm.groupUrl, vm.eventId)
                .then(function(response){
                    console.log(response.data.data);
                    vm.event = response.data.data;
                    },
                    function(err){
                        console.log(err);
                    });
        }
        init();
    }
})();