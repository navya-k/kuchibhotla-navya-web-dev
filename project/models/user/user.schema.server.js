/**
 * Created by Navya on 6/7/2016.
 */

module.exports = function() {
    
    var mongoose = require("mongoose");
    
    var UserSchema = mongoose.Schema ({
        
        username    : {type: String, required: true},
        password    : String,
        firstName   : String,
        lastName    : String,
        dob         : Date,
        email       : String,
        phone       : String,
        google    : {
            token: String,
            id: String,
            displayName: String
        },
        websites    : [{type: mongoose.Schema.Types.ObjectId, ref: "Website"}],
        dateCreated : {type: Date, default : Date.now}
    }, {collection : "project.user"});
    
    return UserSchema;
};