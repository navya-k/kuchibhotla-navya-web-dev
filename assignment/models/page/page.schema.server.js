/**
 * Created by Navya on 6/7/2016.
 */

module.exports = function() {
    
    var mongoose = require("mongoose");
    
    var PageSchema = mongoose.Schema ({

        _website    : {type: mongoose.Schema.ObjectId , ref : "Website"},
        name        : {type: String, required: true},
        description : String,
        widgets    : [{type: mongoose.Schema.Types.ObjectId, ref: "Widget"}],
        dateCreated : {type: Date, default : Date.now}
    }, {collection : "assignment.page"});
    
    return PageSchema;
};