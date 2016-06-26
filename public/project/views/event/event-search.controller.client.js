(function(){
    angular
        .module("Project")
        .controller("EventSearchController", EventSearchController);

    function EventSearchController($location, $routeParams, EventService) {
        var vm = this;

        vm.searchText = $routeParams.searchTerm;
        // vm.websiteId = $routeParams.websiteId;
        // vm.pageId = $routeParams.pageId;
        // vm.widgetId = $routeParams.widgetId;

        vm.searchEvents = searchEvents;
        // vm.selectPhoto = selectPhoto;

        function init() {
            console.log(vm.searchText);
            EventService
                .searchEvents(vm.searchText)
                .then(function(response){
                        console.log(response.data.results);
                        // data = response.data.replace("jsonFlickrApi(","");
                        // data = data.substring(0,data.length - 1);
                        // data = JSON.parse(data);
                        vm.events = response.data.results;
                        // $location.url("/events");
                    },
                    function(err){
                        console.log(err);
                    });
        }
        init();

        function searchEvents(searchText) {
           
        }

        // function selectPhoto(photo) {
        //     var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
        //     url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
        //
        //     vm.widget.url = url;
        //    
        //     WidgetService
        //         .updateWidget(vm.widgetId,vm.widget)
        //         .then(
        //     function(response) {
        //         $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId);
        //     },
        //     function(error) {
        //         vm.error = "Unable to update widget";
        //     });
        // }
    }
})();