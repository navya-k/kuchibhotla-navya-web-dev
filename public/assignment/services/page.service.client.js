(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ]

    function PageService() {
        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        return api;

        function createPage(webId, page) {
            var newpage = {
                _id: (new Date()).getTime()+"",
                name: page.name,
                websiteId : webId
            };
            pages.push(newpage);
            return newpage;
        }
        function findPageByWebsiteId(websiteId) {
            var resultSet = [];
            for(var i in pages) {
                if(pages[i].websiteId === websiteId) {
                    resultSet.push(pages[i]);
                }
            }
            return resultSet;
        }

        function findPageById(pageId) {
            for (var i in pages) {
                if (pages[i]._id === pageId) {
                    return pages[i];
                }
            }
            return null;
        }

        function updatePage(id, page) {
            for(var i in pages) {
                if(pages[i]._id === id) {
                    pages[i].name = page.name;
                    return true;
                }
            }
            return false;
        }
        function deletePage(id) {

            for(var i in pages) {
                if(pages[i]._id === id) {
                    pages.splice(i, 1);
                    return true;
                }
            }
            return false;
        }

    }
})();
