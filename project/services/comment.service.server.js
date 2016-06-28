/**
 * Created by Navya on 6/3/2016.
 */
module.exports = function(app, models) {

    var commentModel = models.commentModel;
    var eventModel = models.eventModel;

    app.post("/project/api/user/:userId/event/:eventId/comment", createComment);


    function createComment(req, res) {
        var userId = req.params.userId;
        var eventId = req.params.eventId;
        var comment = req.body;
        commentModel
            .createComment(comment, userId, eventId)
            .then(
                function(commentCreated){
                    // Add reference to Event
                    eventModel
                        .addCommentToEvent(eventId,commentCreated._id)
                        .then(
                            function(event) {
                                res.json(commentCreated);
                            },
                            function(err){
                                res.statusCode(400).send(err);
                            });

                },
                function(err){
                    res.statusCode(400).send(err);
                }

            );
    }

};