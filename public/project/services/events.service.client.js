/**
 * Created by Navya on 6/23/2016.
 */

(function(){
    angular
        .module("Project")
        .factory("EventService", EventService);

    var key = "003a55920363a2c3c483c437b6f69";

    var urlBase = "http://api.meetup.com/2/open_events?&sign=true&key=API_KEY&category=9,14,32,23&text=TEXT&page=20&format=json&callback=JSON_CALLBACK&fields=group_photo";

    function EventService($http) {
        var api = {
            searchEvents: searchEvents
        };
        return api;

        function searchEvents(searchTerm) {
            var url = urlBase.replace("TEXT", searchTerm);
            url = url.replace("API_KEY", key);
            console.log(url);
            return $http.jsonp(url);
        }
    }
})();