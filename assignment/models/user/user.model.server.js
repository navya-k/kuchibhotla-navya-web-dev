/**
 * Created by Navya on 6/7/2016.
 */

module.exports = function(){
    
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("User", UserSchema);
    
    var api = {
        
        createUser              : createUser,
        findUserById            : findUserById,
        findUserByCredentials   : findUserByCredentials,
        findUserByUsername      : findUserByUsername,
        updateUser              : updateUser
    };
    
    return api;
    
    function createUser(user){
        return User.create(user);
    }

    function findUserById(userId){
        return User.findById(userId);
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
};