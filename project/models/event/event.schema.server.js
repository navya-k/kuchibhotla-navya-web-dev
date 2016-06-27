/**
 * Created by Navya on 6/7/2016.
 */

module.exports = function() {
    
    var mongoose = require("mongoose");
    
    var EventSchema = mongoose.Schema ({
        
        username    : {type: String, required: true},
        password    : String,
        firstName   : String,
        lastName    : String,
        dob         : Date,
        email       : String,
        phone       : String,
        userType    : {type: String, enum : ['user','admin']},
        google    : {
            token: String,
            id: String,
            displayName: String
        },
        dateCreated : {type: Date, default : Date.now}
    });
    
    return EventSchema;
};