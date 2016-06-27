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
        findEventForUser        : findEventForUser,
        addEventToUser: addEventToUser,
        removeEventFromUser: removeEventFromUser
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

    function findEventForUser(userId, eventId){
        return Member.findOne({_id : userId, 'events.eventId': eventId});
    }

    function addEventToUser(userId, event){
        // TODO - if event exists
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
                if (!err) {
                    user.events.id(eventId).remove();
                    user.save();
                }
            });
    }




    function updateUser(id,user){
        delete user._id;
        return User
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