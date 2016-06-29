(function(){
    angular
        .module("Project")
        .controller("EventDetailController", EventDetailController);

    function EventDetailController($sce, $location,$route, $routeParams, EventService, $rootScope,CommentService) {
        var vm = this;
        vm.groupUrl = $routeParams.groupUrl;
        vm.meetupId = $routeParams.meetupId;
        vm.currentUser = $rootScope.currentUser;
        vm.getDescription = getDescription;

        vm.addToFavourites = addToFavourites;
        vm.removeFromFavourites = removeFromFavourites;

        function init() {
            // find the event in event collection
            vm.commentExists = false;
            EventService
                .findEventByMeetupId(vm.meetupId)
                .then(
                    function(response){
                        if(response.data){
                            // TODO FIX - data might be unavAILABLE
                            console.log("init "+response);
                            console.log("init  data"+response.data);
                            console.log("init data dataobj "+response.data.eventObject);
                            vm.event = response.data.eventObject;
                            vm.eventId = response.data._id;
                            // if user is in list of references - redirect
                            vm.favourite = false;
                            for(var user in response.data.users) {
                                if(response.data.users[user] == vm.currentUser._id){
                                    vm.isFavourite = true;
                                    break;
                                }
                            }
                            CommentService
                                .findCommentsForEvent(vm.eventId)
                                .then(function(comments){
                                    vm.comments = comments.data;
console.log(vm.comments);
                                    for(var comment in vm.comments) {
                                        if(vm.comments[comment]._user == vm.currentUser._id){
                                            console.log(vm.comments);
                                            vm.commentExists = true;
                                            break;
                                        }
                                    }
                                });

                        }
                        else {
                            vm.isFavourite = false;
                            /// might exist it other favs
                            EventService
                                .findEventById(vm.groupUrl, vm.meetupId)
                                .then(
                                    function (response) {

                                        vm.event = response.data.data;
                                    },
                                    function (err) {
                                        console.log(err);
                                    }
                                );
                        }
                    },
                    function(err) {

                    });
        }
        init();

        function addToFavourites(event){
            vm.isFavourite = false;
            EventService
                .findEventByMeetupId(vm.meetupId)
                .then(
                    function(response){
                        if(response.data){
                            // vm.event = response.data;
                            EventService
                                .updateEventAndUSerReferences(vm.currentUser._id, response.data._id)
                                .then(
                                    function(event){
                                        init();
                                    });
                        }
                        else {
                            // create and update
                            EventService
                                .createEventForUser(vm.currentUser._id, event)
                                .then(
                                    function(event){

                                        init();
                                    });


                        }
                    });
        }

        function removeFromFavourites(eventId) {
            // TODO FIX
            console.log(eventId);
            EventService
                .removeEventFromUser(vm.currentUser._id, eventId)
                .then(
                    function(response) {
                        console.log("removed after "+response);
                        // if no users delete event
                        console.log("removed data "+response.data);
                        console.log("removed data users "+response.data.users);
                        console.log("removed data users  length"+response.data.users.length);
                        if (response.data.users && response.data.users.length == 1) {
                            EventService
                                .removeEvent(eventId)
                                .then(function (removedEvent) {
                                    init();
                                });

                        }
                    });
        }

        function getDescription() {
            return $sce.trustAsHtml(vm.event.description);

        }
    }
})();