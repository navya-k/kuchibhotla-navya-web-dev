/**
 * Created by Navya on 6/3/2016.
 */
module.exports = function(app, models) {

    var memberModel = models.memberModel;
    
    app.get("/project/api/user/:userId/favourite/:eventId", findUserEventById);
    app.post("/project/api/user/:userId/event",addEventToUser);
    app.delete("/project/api/user/:userId/event/:eventId", removeEventFromUser);
    
    function findUserEventById (req, res) {
        var userId = req.params.userId;
        var eventId = req.params.eventId;
        memberModel
            .findEventForUser(userId, eventId)
            .then(
                function(event){
                    res.json(page);
                },
                function(err){
                    res.statusCode(404).send(err);
                }
            );
    }

    function addEventToUser (req, res) {
        var userId = req.params.userId;
        var event = req.body;
        memberModel
            .addEventToUser(userId, event)
            .then(
                function(user){
                    res.json(user);
                },
                function(err){
                    res.statusCode(404).send(err);
                }
            );
    }

    function removeEventFromUser (req, res) {
        var userId = req.params.userId;
        var eventId = req.params.eventId;
        memberModel
            .removeEventFromUser(userId, eventId)
            .then(
                function(stats){
                    res.statusCode(200);
                },
                function(err){
                    res.statusCode(404).send(err);
                }
            );
    }

};