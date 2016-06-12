(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce,$location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        vm.reorder = reorder;

        function init() {
            WidgetService
                .findWidgetsForPageId(vm.pageId)
                .then(function(response){
                    vm.widgets = response.data;
                });
            
        }
        init();

        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);

        }

        function reorder(start, end) {
            console.log("Widget List Controller");
            console.log(start);
            console.log(end);
            WidgetService
                .reorderWidget(vm.pageId, start, end)
                .then(
                    function(response){
                        init();//$location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    },
                    function(err){
                        vm.error = "Unable to update widget order"
                    });
        }
    }
})();