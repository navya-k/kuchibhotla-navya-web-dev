/**
 * Created by Navya on 6/7/2016.
 */

module.exports = function(){
    
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("Member", UserSchema);
    
    var api = {

        findFacebookUser        : findFacebookUser,
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
        return User.create(user);
    }

    function findUserById(userId){
        return User.findById(userId);
    }

    function findFacebookUser(id) {
        return User.findOne({"facebook.id": id});
    }


    function findUserByCredentials(username, password){
        return User.findOne({username : username, password : password });
    }

    function findUserByUsername(username, password){
        return User.findOne({username : username});
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
        return User.remove({_id : userId});
    }

    function getUsers(){
        return User.find();
    }
};