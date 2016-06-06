/**
 * Created by Navya on 6/3/2016.
 */
module.exports = function(app) {

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }

    ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res){
        var page = req.body;
        page._id = new Date().getTime()+"";
        pages.push(page);
        res.send(page);
    }

    function findAllPagesForWebsite(req, res) {
        var webId = req.params.websiteId;
        var resultSet = [];
        for(var i in pages) {
            if(pages[i].websiteId === webId) {
                resultSet.push(pages[i]);
            }
        }
        res.json(resultSet);
    }

    function findPageById (req, res) {
        var pageId = req.params.pageId;
        var resultSet = [];
        for(var i in pages) {
            if(pages[i]._id === pageId) {
                res.send(pages[i]);
                return ;
            }
        }
        res.send({});
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;
        for(var i in pages) {
            if(pages[i]._id === pageId) {
                pages[i] = newPage;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function deletePage (req, res) {

        var pageId = req.params.pageId;
        for(var i in pages) {
            if(pages[i]._id === pageId) {
                pages.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }
};