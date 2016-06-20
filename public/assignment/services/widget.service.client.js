(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    
    function WidgetService($http) {
        var api = {
            createWidget: createWidget,
            findWidgetsForPageId: findWidgetsForPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            reorderWidget : reorderWidget
        };
        return api;

        function createWidget(pageId, widget) {
           
            var newWidget = {
                type: widget.type
            };
            if(widget.type === "HEADING"){
                newWidget.size = widget.size;
            }
            return $http.post("/api/page/"+pageId+"/widget",newWidget);

        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/"+widgetId;
            return $http.get(url);
        }

        function findWidgetsForPageId(pageId) {
            var url = "/api/page/"+ pageId+"/widget";
            return $http.get(url);
          
        }

        function updateWidget(id, widget) {
            var url = "/api/widget/"+id;
            return $http.put(url,widget);
        }

        function deleteWidget(id) {
            var url = "/api/widget/"+id;
            return $http.delete(url);
        }

        function reorderWidget(pageId, start, end) {
            return $http.put("/api/page/"+pageId+"/widget?start="+start+"&end="+end);
        }
    }
})();