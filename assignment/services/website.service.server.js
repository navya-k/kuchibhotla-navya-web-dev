/**
 * Created by Navya on 6/3/2016.
 */
module.exports = function(app, models) {

    var websiteModel = models.websiteModel;
    
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res){ 
        var website = req.body;
        var userId = req.params.userId;
        websiteModel
            .createWebsite(userId, website)
            .then(
                function(website){
                    res.json(website);
                },
                function (err) {
                    res.statusCode(400).send(err);
                }
            ); 
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function(websites){
                    res.json(websites);
                },
                function(err) {
                    res.statusCode(404).send(err);
                }
            );
    }

    function findWebsiteById (req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function(website) {
                    res.json(website);
                },
                function(err) {
                    res.statusCode(404).send(err);
                }
            );
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newSite = req.body;
        websiteModel
            .updateWebsite(websiteId, newSite)
            .then(
                function(stats){
                    res.sendStatus(200);
                },
                function(err){
                    res.statusCode(404).send(err);
                }
            );
    }

    function deleteWebsite (req, res) {

        var websiteId = req.params.websiteId;
        websiteModel
            .deleteWebsite(websiteId)
            .then(
                function(stats) {
                    res.sendStatus(200);
                },
                function(err){
                    res.statusCode(404).send(err);
                }
            );
    }
};