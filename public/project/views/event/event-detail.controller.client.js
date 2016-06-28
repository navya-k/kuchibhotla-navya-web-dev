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
        // vm.removeFromFavourites = removeFromFavourites;

        function init() {
            EventService
                .findEventById(vm.groupUrl, vm.eventId)
                .then(
                    function (response) {
                        vm.isFavourite = false;
                        vm.event = response.data.data;
                    },
                    function (err) {
                        vm.isFavourite = false;

                        console.log(err);
                    }
                );
        }
        init();
        
        function addToFavourites(event){
            EventService
                .addEventToUser(vm.currentUser._id, event)
                .then(
                    function(user){

                        vm.isFavourite = true;

                        $location.url("/user/"+vm.currentUser._id+"/favourite/"+event.id);
                    },
                    function(err){
                        vm.isFavourite = false;
                        console.log(err);

                    }
                )
        } 

        function getDescription() {
            return $sce.trustAsHtml(vm.event.description);

        }
    }
})();