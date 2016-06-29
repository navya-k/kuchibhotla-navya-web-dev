(function(){
    angular
        .module("Project")
        .controller("EditCommentController", EditCommentController);

    function EditCommentController(CommentService, MemberService,  $routeParams, $rootScope,$location) {
        var vm = this;

        vm.eventId = $routeParams.eventId;
        vm.currentUser = $rootScope.currentUser;
        vm.commentId = $routeParams.commentId;

        vm.updateComment = updateComment;
        vm.deleteComment = deleteComment;

        function init() {
            CommentService
                .findCommentById(vm.commentId)
                .then(
                    function (response) {
                        vm.comment = response.data;
                    }, function (err) {
                        console.log(err);
                    });
        }
        init();

        function updateComment(comment) {

            CommentService
                .updateComment(comment)
                .then(
                    function (response) {
                        $location.url("/user/" + vm.currentUser._id + "/favourite/" + vm.eventId);
                    }, function (err) {
                        console.log(err);
                    });
        }
        
        function deleteComment(commentId) {

            CommentService
                .deleteComment(commentId, vm.eventId)
                .then(
                    function (response) {
                        $location.url("/user/" + vm.currentUser._id + "/favourite/" + vm.eventId);
                    }, function (err) {
                        console.log(err);
                    });
        }
    }
})();