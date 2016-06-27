/**
 * Created by Navya on 6/7/2016.
 */

module.exports = function(){
    
    var mongoose = require("mongoose");
    var UserSchema = require("./event.schema.server.js")();
    var Member = mongoose.model("Event", UserSchema);
    
    var api = {

        findGoogleUser          : findGoogleUser,
        createUser              : createUser,
        findUserById            : findUserById,
        findUserByCredentials   : findUserByCredentials,
        findUserByUsername      : findUserByUsername,
        updateUser              : updateUser,
        deleteUser              : deleteUser,
        getUsers                : getUsers
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