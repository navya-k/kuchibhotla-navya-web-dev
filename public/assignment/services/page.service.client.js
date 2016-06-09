(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
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
                name: page.name,
                description : page.description,
                websiteId : webId

            };
            return $http.post("/api/website/"+webId+"/page",newpage);
        }
        function findPageByWebsiteId(websiteId) { 
            var url = "/api/website/"+websiteId+"/page";
            return $http.get(url);
        }

        function findPageById(pageId) {
            var url = "/api/page/"+pageId;
            return $http.get(url);
        }

        function updatePage(id, page) {
            var url = "/api/page/"+id;
            return $http.put(url,page);
        }
        function deletePage(id) {

            var url = "/api/page/"+id;
            return $http.delete(url);
        }
    }
})();
