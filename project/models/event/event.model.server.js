/**
 * Created by Navya on 6/7/2016.
 */

module.exports = function(){

    var mongoose = require("mongoose");
    var EventSchema = require("./event.schema.server")();
    var Event = mongoose.model("Event", EventSchema);

    var api = {
        createEvent           : createEvent,
        findEventForUser       : findEventForUser,
        removeEvent      : removeEvent,
        findEventById           : findEventById,
        findEventByMeetupId : findEventByMeetupId,
        findAllEventsWithUser : findAllEventsWithUser,
        
        // Comments

        addCommentToEvent : addCommentToEvent
    };

    return api;

    function createEvent(userId, event){
        delete event._id;
        var newEvent = {
            user : userId,
            eventObject : event,
        };
        return Event.create(newEvent);
    }

    function findEventForUser(userId, eventId){
        return Event.findOne({user :userId, _id : eventId});
    }

    function findEventById(eventId){
        return Event.findById(eventId);
    }
    function findEventByMeetupId(userId, meetupId){
        return Event.findOne({user: userId, 'eventObject.id' : meetupId});
    }
 
    function removeEvent(userId, eventId){
        return Event.remove({_id :eventId, user : userId});
    }

    function findAllEventsWithUser(userId){
        return Event.find({user : userId});
    }

    function addCommentToEvent(eventId,commentId){
        return Event.findById(eventId ,
            function (err, event) {
                if (!err) {
                    event.comments.push(commentId);
                    event.save();
                }
            }
        );
    }
};