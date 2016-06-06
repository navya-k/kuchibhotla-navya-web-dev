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
        
    }

    function findAllPagesForWebsite(req, res) {
         
    }

    function findPageById (username, res) {

        
    }

    function updatePage(username, password, res) {

       
    }

    function deletePage (req, res) {

        
    }
};