(function(){
    angular
        .module("Project")
        .controller("HomeController", HomeController);

    function HomeController($location) {
        var vm = this;
        
        vm.eventSearch = eventSearch;
        
        function eventSearch(searchText) {
            $location.url("/events/"+searchText);
        }
    }
})();