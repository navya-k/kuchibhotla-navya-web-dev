(function(){
    angular
        .module("Project")
        .controller("EventDetailController", EventDetailController);

    function EventDetailController($sce, $location,$route, $routeParams, EventService, $rootScope) {
        var vm = this;
        vm.groupUrl = $routeParams.groupUrl;
        vm.eventId = $routeParams.eventId;
        vm.currentUser = $rootScope.currentUser;
        vm.getDescription = getDescription;

        vm.addToFavourites = addToFavourites;
        vm.removeFromFavourites = removeFromFavourites;

        function init() {
            EventService
                .findEventById(vm.groupUrl, vm.eventId)
                .then(
                    function(response){
                        vm.event = response.data.data;
                        EventService
                            .findUserEventById(vm.eventId)
                            .then(
                                function(event){
                                    vm.event = event;
                                     vm.isFavourite = true;
                                },
                                function(err){
                                    vm.isFavourite = false;
                                    console.log(err); 
                                }
                            )
                    },
                    function(err){
                        console.log(err);
                    });
        }
        init();
        
        function addToFavourites(event){
            EventService
                .addEventToUser(vm.currentUser._id, event)
                .then(
                    function(user){

                        vm.isFavourite = true;
                      init();
                    },
                    function(err){
                        vm.isFavourite = false;
                        console.log(err);
                        init();
                    }
                )
        }

        function removeFromFavourites(eventId){
            EventService
                .removeEventFromUser(vm.currentUser._id, eventId)
                .then(
                    function(stats){
                         
                        vm.isFavourite = false;
                        $location.reload();
                    },
                    function(err){
                        
                        console.log(err);
                        $location.reload();
                    }
                )
        }

        function getDescription() {
            return $sce.trustAsHtml(vm.event.description);

        }
    }
})();