(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($sce, $routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.createHeaderWidget = createHeaderWidget;
        vm.createImageWidget = createImageWidget;
        vm.createYouTubeWidget = createYouTubeWidget;

        function createHeaderWidget(pageId) {
            var headerWidget = {
                widgetType: "HEADER"
            }
            var newWidget = WidgetService.createWidget(pageId, headerWidget);
            if(newWidget) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWidget._id);
            } else {
                vm.error = "Unable to create widget";
            }
        }

        function createImageWidget(pageId) {
            var imageWidget = {
                widgetType: "IMAGE"
            }
            var newWidget = WidgetService.createWidget(pageId, imageWidget);
            if(newWidget) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWidget._id);
            } else {
                vm.error = "Unable to create widget";
            }
        }

        function createYouTubeWidget(pageId) {
            var youtubeWidget = {
                widgetType: "YOUTUBE"
            }
            var newWidget = WidgetService.createWidget(pageId, youtubeWidget);
            if(newWidget) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWidget._id);
            } else {
                vm.error = "Unable to create widget";
            }
        }
    }
})();