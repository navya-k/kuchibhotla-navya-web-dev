/**
 * Created by Navya on 6/3/2016.
 */
module.exports = function(app, models) {

    var memberModel = models.memberModel;

    app.get("/project/api/user/:userId/events", findAllEventsForUser);
    app.get("/project/api/user/:userId/favourite/:eventId", findUserEventById);
    app.post("/project/api/user/:userId/event",addEventToUser);
    app.get("/project/api/user/:userId/event/:eventId", removeEventFromUser);

    function findAllEventsForUser (req, res) {
        var userId = req.params.userId;
        
        memberModel
            .findAllEventsForUser(userId)
            .then(
                function(events){
                    res.json(events);
                },
                function(err){
                    res.statusCode(404).send(err);
                }
            );
    }


    function findUserEventById (req, res) {
        var userId = req.params.userId;
        var eventId = req.params.eventId;
        memberModel
            .findUserById(userId)
            .then(
                function(user){
                    for(var event in user.events) {
                        if(user.events[event].id === eventId){
                            res.json(user.events[event]);
                            return;
                        }
                    }
                    res.statusCode(404).send(err);

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
                    res.json(200);
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
                function(user){
                    res.send(200);
                },
                function(err){
                    res.statusCode(404).send(err);
                }
            );
    }

};