/**
 * Created by Navya on 6/23/2016.
 */

(function(){
    angular
        .module("Project")
        .factory("EventService", EventService);

    var key = "003a55920363a2c3c483c437b6f69";

    var urlBase = "http://api.meetup.com/2/open_events?&sign=true&key=API_KEY&category=9,14,32,23&text=TEXT&page=20&format=json&callback=JSON_CALLBACK&fields=group_photo";
    var eventUrl = "http://api.meetup.com/GROUP_URL/events/EVENT_ID?&sign=true&photo-host=public&fields=group_photo&key=API_KEY&format=json&callback=JSON_CALLBACK";

    function EventService($http) {
        var api = {
            searchEvents         : searchEvents,
            findEventById        : findEventById,
            findUserEventById    : findUserEventById,
            addEventToUser       : addEventToUser,
            removeEventFromUser  : removeEventFromUser,
            findEventsForUser    : findEventsForUser
        };
        return api;

        function searchEvents(searchTerm) {
            var url = urlBase.replace("TEXT", searchTerm);
            url = url.replace("API_KEY", key);
            console.log(url);
            return $http.jsonp(url);
        }

        function findEventById(groupUrl, eventId) {
            var url = eventUrl.replace("GROUP_URL", groupUrl);
            url = url.replace("EVENT_ID", eventId);
            url = url.replace("API_KEY", key);
            console.log(url);
            return $http.jsonp(url);
        }

        function addEventToUser(userId, event) {
            return $http.post("/project/api/user/"+userId+"/event",event);
        }

        function removeEventFromUser(userId, eventId) {
            return $http.get("/project/api/user/"+userId+"/event/"+eventId);
        }
        function findUserEventById(userId, eventId) {
            return $http.get("/project/api/user/"+userId+"/favourite/"+eventId);
        }

        function findEventsForUser(userId) {
            return $http.get("/project/api/user/"+userId+"/events");
        }
    }
})();