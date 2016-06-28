/**
 * Created by Navya on 6/3/2016.
 */
module.exports = function(app, models) {

    var memberModel = models.memberModel;
    var eventModel = models.eventModel;

    app.get("/project/api/user/:userId/events", findAllEventsForUser);
    app.get("/project/api/user/:userId/favourite/:eventId", findUserEventById);
    app.post("/project/api/user/:userId/event",addEventToUser);
    app.get("/project/api/user/:userId/event/:eventId", removeEventFromUser);
    app.get("/project/api/user/:userId/meetup/:meetupId", findEventByMeetupId);
    
    function findAllEventsForUser (req, res) {
        var userId = req.params.userId;

        eventModel
            .findAllEventsWithUser(userId)
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
        eventModel
            .findEventById(eventId)
            .then(
                function(event){ 
                    res.json(event);
                },
                function(err){
                    res.statusCode(404).send(err);

                });
    }

    function addEventToUser (req, res) {
        var userId = req.params.userId;
        var event = req.body;
        eventModel
            .createEvent(userId, event)
            .then(
                function (eventCreated) { 
                    memberModel
                        .addEventToUser(userId, eventCreated._id)
                        .then(
                            function (user) { 
                                res.json(eventCreated);
                            },
                            function (err) {
                                res.statusCode(400).send(err);
                            });
                },
                function (err) {
                    res.statusCode(400).send(err);

                });
    }

    function removeEventFromUser (req, res) {
        var userId = req.params.userId;
        var eventId = req.params.eventId;

        eventModel
            .removeEvent(userId, eventId)
            .then(function (eventRemoved) {
                    memberModel
                        .removeEventFromUser(userId, eventId)
                        .then(
                            function(user){
                                res.json(200);
                            },
                            function (err) {
                                res.statusCode(400).send(err);
                            });
                },
                function (err) {
                    res.statusCode(400).send(err);

                });
    }

    function findEventByMeetupId (req, res) {
        var userId = req.params.userId;
        var meetupId = req.params.meetupId;

        eventModel
            .findEventByMeetupId(userId, meetupId)
            .then(function (event) {
                 res.json(event);
                },
                function (err) {
                    res.statusCode(400).send(err);
                });
    }
};