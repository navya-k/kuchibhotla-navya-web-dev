/**
 * Created by Navya on 6/7/2016.
 */

module.exports = function() {
    
    var mongoose = require("mongoose");
    var CommentSchema = require("../comment/comment.schema.server")();
    var EventSchema = mongoose.Schema ({
        
        users : [{type: mongoose.Schema.Types.ObjectId, ref: "Member"}],
        eventObject    : Object,
        comments    : [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
        dateCreated : {type: Date, default : Date.now}
    },{collection : "project.event"});
    
    return EventSchema;
};