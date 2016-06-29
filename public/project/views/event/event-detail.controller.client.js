(function(){
    angular
        .module("Project")
        .controller("EventDetailController", EventDetailController);

    function EventDetailController($sce, $location,$route, $routeParams, EventService, MemberService, $rootScope,CommentService) {
        var vm = this;
        vm.groupUrl = $routeParams.groupUrl;
        vm.meetupId = $routeParams.meetupId;
        vm.currentUser = $rootScope.currentUser;
        vm.getDescription = getDescription;

        vm.addToFavourites = addToFavourites;
        vm.removeFromFavourites = removeFromFavourites;
        vm.upVoteComment = upVoteComment;
        vm.downVoteComment = downVoteComment;

        function init() {
            // find the event in event collection
            vm.commentExists = false;
            EventService
                .findEventByMeetupId(vm.meetupId)
                .then(
                    function(response){
                        if(response.data){ 
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
                                    MemberService
                                        .findCommentsForUser(vm.currentUser._id)
                                        .then(function(commentResponse) { 
                                            var likedcomments = commentResponse.data.likedComments;
                                            if (likedcomments) {
                                                for (var comment in vm.comments) {
                                                    var index = likedcomments.indexOf(vm.comments[comment]._id); 
                                                    if (index != -1) { 
                                                        vm.comments[comment].liked = true;

                                                    }
                                                    else { 
                                                        vm.comments[comment].liked = false;
                                                    }
                                                }
                                            }
                                            for (var comment in vm.comments) {
                                                if (vm.comments[comment]._user == vm.currentUser._id) {
                                                    vm.commentExists = true;
                                                    break;
                                                }
                                            }
                                        });

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
            EventService
                .removeEventFromUser(vm.currentUser._id, eventId)
                .then(
                    function(response) { 
                        // if no users delete event 
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
        function upVoteComment(userId, commentId) {
         
            MemberService
                .addCommentToUser(userId, commentId)
                .then(function(response){
                    init();
                },
                function(err){
                    console.log(err);
                });
        }

        function downVoteComment(userId, commentId) {
          
            MemberService
                .removeCommentFromUser(userId, commentId)
                .then(function(response){
                        init();
                    },
                    function(err){
                        console.log(err);
                    });
        }

    }
})();