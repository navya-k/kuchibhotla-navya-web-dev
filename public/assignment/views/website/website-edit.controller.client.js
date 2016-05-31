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
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function updateWebsite(websiteId, website) {
            var result = WebsiteService.updateWebsite(websiteId, website);
            if(result) {
                $location.url("/user/"+vm.userId+"/website");
            } else {
                vm.error = "Unable to update website";
            }
        }
        
        function deleteWebsite(websiteId) {
            var result = WebsiteService.deleteWebsite(websiteId);
            if(result) {
                $location.url("/user/"+vm.userId+"/website");
            } else {
                vm.error = "Unable to delete website";
            }
        }
    }
})();