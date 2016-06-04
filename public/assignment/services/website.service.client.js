(function() {

    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var api = {
            createWebsite: createWebsite,
            findWebsitesForUserId: findWebsitesForUserId,
            findWebsiteById : findWebsiteById,
            updateWebsite : updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function findWebsiteById(websiteId) {
            var resultSet = [];
            for(var i in websites) {
                if(websites[i]._id === websiteId) {
                    return websites[i];
                }
            }
            return null;
        }
        function updateWebsite(websiteId, website) {
            for(var i in websites) {
                if(websites[i]._id === websiteId) {
                    websites[i] =  website;
                    return true;
                }
            }
            return false;
        }
        function deleteWebsite(websiteId) {
            for(var i in websites) {
                if(websites[i]._id === websiteId) {
                    websites.splice(i, 1);
                    return true;
                }
            }
            return false;
        }

        function createWebsite(developerId, name, desc) {
            var newWebsite = {
                _id: (new Date()).getTime()+"",
                name: name,
                description: desc,
                developerId: developerId
            };
            websites.push(newWebsite);
            return newWebsite;
        }

        function findWebsitesForUserId(userId) {
            
        }
    }

})();