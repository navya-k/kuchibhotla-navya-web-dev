/**
 * Created by Navya on 6/3/2016.
 */
module.exports = function(app, models) {

    var pageModel = models.pageModel; 
    
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res){
        var websiteId = req.params.websiteId;
        var page = req.body;
        pageModel
            .createPage(websiteId, page)
            .then(
                function(page){
                    res.json(page);
                },
                function(err){
                    res.statusCode(400).send(err);
                }
            );
    }

    function findAllPagesForWebsite(req, res) {
        var webId = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(webId)
            .then(
                function(pages){
                    res.json(pages);
                },
                function(err){
                    res.statusCode(404).send(err);
                }
            );
    }

    function findPageById (req, res) {
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(
                function(page){
                    res.json(page);
                },
                function(err){
                    res.statusCode(404).send(err);
                }
            );
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;
        pageModel
            .updatePage(pageId,newPage)
            .then(
                function(stats){
                    res.sendStatus(200);
                },
                function(err){
                    res.statusCode(404).send(err);
                }
            );
    }

    function deletePage (req, res) {

        var pageId = req.params.pageId;
        pageModel
            .deletePage(pageId)
            .then(
                function(stats){
                    res.sendStatus(200);
                },
                function(err){
                    res.statusCode(404).send(err);
                }
            );
    }
};