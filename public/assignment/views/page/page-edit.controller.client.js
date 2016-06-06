(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            PageService
                .findPageById(vm.pageId)
                .then(function(response){
                    vm.page = response.data;
                });
        }
        init();

        function deletePage(pageId) {
            PageService
                .deletePage(pageId)
                .then(
                function(response){
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                },
                function(error) {
                    vm.error = "Unable to delete page"
                }
            );
        }
        
        function updatePage(pageId, page) {
            PageService
                .updatePage(pageId, page)
                .then(
                function(response) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                },
                function(error) {
                    vm.error = "Unable to update page"
                }
            );
        }
    }
})();