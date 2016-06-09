/**
 * Created by Navya on 6/3/2016.
 */
module.exports = function(app, models) {

    var userModel = models.userModel;

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
            userModel
                .getUsers()
                .then(
                    function(users) {
                        res.json(users);
                    },
                    function(err){
                        res.statusCode(400).send(err);
                    }
                );
        }
    }

    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function(user) {
                    res.json(user);
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
                    res.json(user);
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
                    res.json(user);
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
                    res.json(user);
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
                    res.statusCode(404).send(err);
                }
            );
    }

    function deleteUser (req, res) {

        var id = req.params.userId;

        userModel
            .deleteUser(id)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.statusCode(404).send(err);
                }

            );
    }
};