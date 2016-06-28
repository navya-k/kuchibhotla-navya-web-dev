/**
 * Created by Navya on 6/7/2016.
 */

module.exports = function(){

    var mongoose = require("mongoose");
    var CommentSchema = require("./comment.schema.server.js")();
    var Comment = mongoose.model("Comment", CommentSchema);


    var api = {
        createComment : createComment

    };

    return api;

    function createComment(comment, userId, eventId){
        var newComment = {
            _user : userId,
            _event : eventId,
            text : comment.text
        };
        return Comment.create(newComment);
    }


};