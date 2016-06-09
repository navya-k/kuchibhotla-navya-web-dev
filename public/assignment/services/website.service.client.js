(function() {

    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var api = {
            createWebsite: createWebsite,
            findWebsitesForUserId: findWebsitesForUserId,
            findWebsiteById : findWebsiteById,
            updateWebsite : updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function findWebsiteById(websiteId) {
            var url = "/api/website/"+websiteId;
            return $http.get(url);
        }
        
        function updateWebsite(websiteId, website) {
            var url = "/api/website/"+websiteId;
            return $http.put(url,website);
        }
        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.delete(url);
        }

        function createWebsite(developerId, name, desc) {
            var newWebsite = {
                name: name,
                description: desc
            };
            return $http.post("/api/user/"+developerId+"/website",newWebsite);
        }

        function findWebsitesForUserId(userId) {
            var url = "/api/user/"+ userId+"/website";
            return $http.get(url);
        }
    }

})();