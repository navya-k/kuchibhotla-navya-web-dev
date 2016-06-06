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
            PageService
                .createPage(webId, page)
                .then(function(response){

                    var newPage = response.data;
                    if(newPage) {
                        $location.url("/user/"+vm.userId+"/website/"+webId+"/page");
                    } else {
                        vm.error = "Unable to create page";
                    }
                });

        }
    }
})();