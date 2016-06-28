/**
 * Created by Navya on 6/7/2016.
 */

module.exports = function(){

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var Member = mongoose.model("Member", UserSchema);

    var api = {

        findGoogleUser          : findGoogleUser,
        createUser              : createUser,
        findUserById            : findUserById,
        findUserByCredentials   : findUserByCredentials,
        findUserByUsername      : findUserByUsername,
        updateUser              : updateUser,
        deleteUser              : deleteUser,
        getUsers                : getUsers,
        findAllEventsForUser    : findAllEventsForUser,
        findEventForUser        : findEventForUser,
        addEventToUser          : addEventToUser,
        removeEventFromUser     : removeEventFromUser
    };

    return api;

    function createUser(user){
        user.userType = "user";
        return Member.create(user);
    }

    function findUserById(userId){
        return Member.findById(userId);
    }

    function findGoogleUser(id) {
        return Member.findOne({"google.id": id});
    }


    function findUserByCredentials(username, password){
        return Member.findOne({username : username, password : password });
    }

    function findUserByUsername(username, password){
        return Member.findOne({username : username});
    }

    function findAllEventsForUser(userId){
        return Member.findById(userId).select('events');
    }

    function findEventForUser(userId, eventId){
        return Member.findById(userId,
            function(err, user) {
                user.events.id(eventId);
            });
    }


    function addEventToUser(userId, event){
        return Member.findById(userId ,
            function (err, user) {
                if (!err) {
                    user.events.push(event);
                    user.save();
                }
            }
        );
    }

    function removeEventFromUser(userId, eventId){
        return Member.findById(userId,
            function (err, user) {
                for(var event in user.events){
                    if(user.events[event].id === eventId) {
                        user.events.splice(event, 1);
                        user.save();
                    }
                }});
    }




    function updateUser(id,user){
        delete user._id;
        return Member
            .update({_id : id},{
                $set : {
                    firstName   : user.firstName,
                    lastName    : user.lastName
                }
            });
    }

    function deleteUser(userId){
        return Member.remove({_id : userId});
    }

    function getUsers(){
        return Member.find();
    }
};