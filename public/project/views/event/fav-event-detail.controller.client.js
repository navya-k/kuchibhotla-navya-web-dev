(function(){
    angular
        .module("Project")
        .controller("FavouriteDetailController", FavouriteDetailController);

    function FavouriteDetailController($sce, $location,$route, $routeParams, EventService, $rootScope, CommentService) {
        var vm = this;
        vm.groupUrl = $routeParams.groupUrl;
        vm.eventId = $routeParams.eventId;
        vm.currentUser = $rootScope.currentUser;

        // functions
        vm.getDescription = getDescription;
        vm.removeFromFavourites = removeFromFavourites;

        function init() {
            EventService
                .findFavEventById(vm.currentUser._id, vm.eventId)
                .then(
                    function(response){
                        vm.event = response.data.eventObject;
                        vm.isFavourite = true;
                        CommentService
                            .findCommentsForEvent(vm.eventId)
                            .then(function(comments){
                                vm.comments = comments.data;
                            });

                    },
                    function(err){
                        vm.isFavourite = false; 
                        console.log(err);
                    });
                
        }
        init();
 

        function removeFromFavourites(eventId){
            // TODO FIX
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