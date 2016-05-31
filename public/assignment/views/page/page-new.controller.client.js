(function(){
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, $location , PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;

        vm.createPage = createPage;

        function createPage(webId, page) {
            var newPage = PageService.createPage(webId, page);
            if(newPage) {
                $location.url("/user/"+vm.userId+"/website/"+webId+"/page");
            } else {
                vm.error = "Unable to create page";
            }
        }
    }
})();