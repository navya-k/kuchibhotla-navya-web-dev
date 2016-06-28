/**
 * Created by Navya on 6/7/2016.
 */

module.exports = function() {
    
    var models = {
        memberModel       : require("./user/user.model.server")(),
        eventModel        : require("./event/event.model.server")(),
        commentModel      : require("./comment/comment.model.server")()
    };
    return models;
};