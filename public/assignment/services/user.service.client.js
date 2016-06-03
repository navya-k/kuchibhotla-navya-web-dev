(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername : findUserByUsername,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        return api;

        function createUser(newUser) {
                var user = {
                    _id: (new Date()).getTime() + "",
                    username: newUser.username,
                    password: newUser.password
                };
                return $http.post("/api/user",user);
        }

        function findUserById(id) {
            var url = "/api/user/"+id;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            for(var i in users) {
                if(users[i].username === username) {
                    return users[i];
                }
            }
            return null;
        }

        function findUserByUsernameAndPassword(username, password) {

            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url);
        }

        function updateUser(id, newUser) {
            for(var i in users) {
                if(users[i]._id === id) {
                    users[i].firstName = newUser.firstName;
                    users[i].lastName = newUser.lastName;
                    return true;
                }
            }
            return false;
        }
        
        function deleteUser(userId) {

            for(var i in users) {
                if(users[i]._id === userId) {
                    users.splice(i, 1);
                    return true;
                }
            }
            return false;
        }
    }
})();
