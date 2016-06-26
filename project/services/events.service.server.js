/**
 * Created by Navya on 6/3/2016.
 */
module.exports = function(app, models) {

    var pageModel = models.pageModel;

    app.get("/events/:searchTerm", createPage);

    function createPage(req, res){
        var searchTerm = req.params.searchTerm;
        var urlBase = "http://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&limited_events=False&text=TEXT&photo-host=public&page=2&radius=25.0&category=9%2C14%2C32%2C23&desc=False&status=upcoming&sig_id=127074982&sig=60616c2b6bd7ff42ba5024c3018fe217b241e58e";

        var url = urlBase.replace("TEXT", "everest");

        console.log(url);
        res.send($http.get(url));
        // $http({
        //     method: 'JSONP',
        //     url: url
        // }).success(function(status) {
        //     //your code when success
        //     console.log("ok");
        // }).error(function(status) {
        //     //your code when fails
        //     console.log("not ok "+status);
        // });

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