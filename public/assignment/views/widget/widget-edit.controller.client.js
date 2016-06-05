(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($sce, $routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.widgetId = $routeParams.widgetId;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function(response){
                    vm.widget = response.data;
                });
        }
        init();
         vm.deleteWidget = deleteWidget;
         vm.updateWidget = updateWidget;

        function updateWidget(widgetId, widget) {

            var result = WidgetService.updateWidget(widgetId, widget);
            if(result) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            } else {
                vm.error = "Unable to update widget";
            }
        }
        function deleteWidget(widgetId) {
            var result = WidgetService.deleteWidget(widgetId);
            if (result) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/"+vm.pageId+"/widget");
            } else {
                vm.error = "Unable to delete widget";
            }
        }
    }
})();