(function(){
    angular
        .module("Project")
        .controller("FavouriteDetailController", FavouriteDetailController);

    function FavouriteDetailController($sce, $location,$route, $routeParams, EventService, $rootScope) {
        var vm = this;
        vm.groupUrl = $routeParams.groupUrl;
        vm.eventId = $routeParams.eventId;
        vm.currentUser = $rootScope.currentUser;
        vm.getDescription = getDescription;

        // vm.addToFavourites = addToFavourites;
        vm.removeFromFavourites = removeFromFavourites;

        function init() {
            EventService
                .findUserEventById(vm.currentUser._id, vm.eventId)
                .then(
                    function(response){
                        console.log(response.data);
                        vm.event = response.data;
                        vm.isFavourite = true;
                    },
                    function(err){
                        vm.isFavourite = false; 
                        console.log(err);
                    });
                
        }
        init();

        // function addToFavourites(event){
        //     EventService
        //         .addEventToUser(vm.currentUser._id, event)
        //         .then(
        //             function(user){
        //
        //                 vm.isFavourite = true;
        //                 init();
        //             },
        //             function(err){
        //                 vm.isFavourite = false;
        //                 console.log(err);
        //                 init();
        //             }
        //         )
        // }

        function removeFromFavourites(eventId){
            EventService
                .removeEventFromUser(vm.currentUser._id, eventId)
                .then(
                    function(stats){

                        vm.isFavourite = false;
                        $location.url("/group/"+vm.event.group.urlname+"/event/"+vm.event.id);

                    },
                    function(err){

                        console.log(err);

                    }
                )
        }

        function getDescription() {
            return $sce.trustAsHtml(vm.event.description);

        }
    }
})();