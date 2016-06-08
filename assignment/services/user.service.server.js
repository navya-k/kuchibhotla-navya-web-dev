/**
 * Created by Navya on 6/3/2016.
 */
module.exports = function(app, models) {

    var userModel = models.userModel;
    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    app.get("/api/user", getUsers);
    app.post("/api/user", createUser);
    app.get("/api/user?username=username", findUserByUsername);
    app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId",  updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function getUsers(req, res){
        var username = req.query.username;
        var password = req.query.password;

        if(username && password) {
            findUserByCredentials(username, password, res);
        }
        else if(username) {
            findUserByUsername(username, res);
        }
        else {
            res.send(users);
        }
    }

    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function(user) {
                    res.send(user);
                },
                function(err){
                    res.statusCode(400).send(err);
                }
            );
    }

    function findUserByUsername (username, res) {

        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    res.send(user);
                },
                function(err){
                    res.statusCode(404).send(err);
                }
            );
    }

    function findUserByCredentials(username, password, res) {

        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user){
                    res.send(user);
                },
                function(err){
                    res.statusCode(404).send(err);
                }
            );
    }

    function findUserById (req, res) {
        var id = req.params.userId;
        userModel
            .findUserById(id)
            .then(
                function(user){
                    res.send(user);
                },
                function(err){
                    res.statusCode(404).send(err);
                }
            );
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(id,newUser)
            .then(
                function(stats){
                    res.sendStatus(200);
                },
                function(err){
                    res.statusCode(400).send(err);
                }
            );
    }

    function deleteUser (req, res) {

        var id = req.params.userId;
        for(var i in users) {
            if (users[i]._id === id) {
                users.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }


};