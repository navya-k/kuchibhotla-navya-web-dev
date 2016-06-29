(function(){
    angular
        .module("Project")
        .controller("NewCommentController", NewCommentController);

    function NewCommentController(CommentService, MemberService,  $routeParams, $rootScope,$location) {
        var vm = this;

        vm.eventId = $routeParams.eventId;
        vm.currentUser = $rootScope.currentUser;

        vm.addComment = addComment;

        function addComment(comment){
            CommentService
                .createComment(comment, vm.currentUser._id, vm.eventId, vm.currentUser.username)
                .then(
                    function(response) {
                        $location.url("/user/"+vm.currentUser._id+"/favourite/"+vm.eventId);
                    },function(err){
                        console.log(err);
                    });
        }
    }
})();