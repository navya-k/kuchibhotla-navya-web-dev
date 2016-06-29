/**
 * Created by Navya on 6/7/2016.
 */

module.exports = function(){

    var mongoose = require("mongoose");
    var CommentSchema = require("./comment.schema.server.js")();
    var Comment = mongoose.model("Comment", CommentSchema);


    var api = {
        createComment : createComment,
        findAllCommentsForEvent : findAllCommentsForEvent,
        findCommentById : findCommentById,
        updateComment : updateComment,
        deleteComment : deleteComment

    };

    return api;

    function createComment(comment, userId, eventId){
        var newComment = {
            _user : userId,
            _event : eventId,
            text : comment.text,
            username : comment.username
        };
        return Comment.create(newComment);
    }

    function findAllCommentsForEvent(eventId){
        return Comment.find({_event : eventId});
    }

    function findCommentById(commentId){
        return Comment.findById(commentId);
    }

    function updateComment(commentId, comment){
        delete comment._id;
        return Comment.update({_id : commentId},
            {
                $set : comment
            });
    }
    function deleteComment(commentId){
        return Comment.remove({_id :commentId});
    }
    
};