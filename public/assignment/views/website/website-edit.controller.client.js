(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function(response){
                    vm.website  = response.data;
                });
        }
        init();

        function updateWebsite(websiteId, website) {
            WebsiteService
                .updateWebsite(websiteId, website)
                .then(
                    function(response) {
                        vm.success = "Updated successfully";
                    },
                    function(error) {
                        vm.error = "Unable to update website"
                    }
                );

        }
        
        function deleteWebsite(websiteId) {
            WebsiteService
                .deleteWebsite(websiteId)
                .then(
                    function(response){
                        $location.url("/user/"+vm.userId+"/website");
                    },
                    function(error) {
                        vm.error = "Unable to delete website"
                    }
                );
        }
    }
})();