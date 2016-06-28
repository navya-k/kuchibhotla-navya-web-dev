(function(){
    angular
        .module("Project")
        .controller("EventDetailController", EventDetailController);

    function EventDetailController($sce, $location,$route, $routeParams, EventService, $rootScope) {
        var vm = this;
        vm.groupUrl = $routeParams.groupUrl;
        vm.meetupId = $routeParams.meetupId;
        vm.currentUser = $rootScope.currentUser;
        vm.getDescription = getDescription;

        vm.addToFavourites = addToFavourites; 

        function init() {
            // find the event in event collection
            EventService
                .findMeetupEventForUser(vm.currentUser._id,vm.meetupId)
                .then(function(response){

                    if(response.data) { 
                        vm.isFavourite = true;
                        $location.url("/user/"+vm.currentUser._id+"/favourite/"+response.data._id);
                    }
                    else { 
                        /// might exist it other favs
                        EventService
                            .findEventById(vm.groupUrl, vm.meetupId)
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
                },
                function(err){
                    EventService
                        .findEventById(vm.groupUrl, vm.meetupId)
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
                });

        }
        init();
        
        function addToFavourites(event){
            EventService
                .addEventToUser(vm.currentUser._id, event)
                .then(
                    function(response){ 
                        vm.isFavourite = true;

                        $location.url("/user/"+vm.currentUser._id+"/favourite/"+response.data._id);
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