/**
 * Created by Navya on 6/23/2016.
 */

(function(){
    angular
        .module("Project")
        .factory("CommentService", CommentService);

     

    function CommentService($http) {
        var api = {
            createComment : createComment          
        };
        return api;

        function createComment(comment, userId, eventId) {
            return $http.post("/project/api/user/"+userId+"/event/"+eventId+"/comment", {text : comment});
        }
    }
})();