(function(){
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    var key = "0f0d0bdcbb1a77c6d19d6416885988f6";
    var secret = "50a163948a891bd5";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function FlickrService($http) {
        var api = {
            searchPhotos: searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();