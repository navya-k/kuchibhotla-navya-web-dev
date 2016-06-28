/**
 * Created by Navya on 6/7/2016.
 */

module.exports = function() {

    var mongoose = require("mongoose");

    var CommentSchema = mongoose.Schema ({

        _user       : {type: mongoose.Schema.ObjectId , ref : "Member"},
        _event      : {type: mongoose.Schema.ObjectId , ref : "Event"},
        text        : String,
        eventId     : String,
        liked       : Boolean,
        myComment   : Boolean,
        dateCreated : {type: Date, default : Date.now}
    },{collection : "project.comment"});

    return CommentSchema;
};