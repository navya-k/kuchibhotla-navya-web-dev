/**
 * Created by Navya on 6/3/2016.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, models) {

    var userModel = models.userModel;

    app.get("/auth/facebook", passport.authenticate('facebook'));
    app.get("/auth/facebook/callback", passport.authenticate('facebook', {
        successRedirect: '/assignment/#/user',
        failureRedirect: '/assignment/#/login'
    }));
    app.get("/api/user", getUsers);
    app.post("/api/user", createUser);
    app.post("/api/logout", logout);
    app.get("/api/loggedIn", loggedIn);
    app.post("/api/register", register);
    app.post("/api/login", passport.authenticate('wam'), login);
    app.get("/api/user?username=username", findUserByUsername);
    app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId",  updateUser);
    app.delete("/api/user/:userId", deleteUser);

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use('wam', new LocalStrategy(localStrategy));
    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookLogin));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password,user.password)) {
                         done(null, user);
                    } else {
                        // in case of error intercept from passport will abort and return with failure
                         done(null, false);
                    }
                },
                function(err) {
                     done(err);
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function getUsers(req, res){
        var username = req.query.username;
        var password = req.query.password;

        if(username && password) {
            findUserByCredentials(username, password, req, res);
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

    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    if(user){
                        res.status(400).send("Username in use");
                        return;
                    }
                    else {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return userModel
                            .createUser(req.body);
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user) {
                        // passport logs in the user and sets a new session for them
                        req.login(user, function(err){
                            if(err){
                                res.status(400).send(err);
                            }
                            else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
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

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function loggedIn(req, res) {
        if(req.isAuthenticated()){
            res.json(req.user);
        }
        else {
            res.send('0');
        }
    }

    function login(req, res) {
        // passport authenticates user by the time it reaches this code.
        // passport also stores the user in the request. So all that's left to do is return it.
        var user = req.user;
        res.json(user);
    }

    function findUserByCredentials(username, password, req, res) {

        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user){

                    //console.log(req.session);
                    req.session.currentUser = user;
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

    // Facebook Login
    function facebookLogin(token, refreshToken, profile, done) {
        userModel
            .findFacebookUser(profile.id)
            .then(
                function(facebookUser) {
                    if(facebookUser) {
                        return done(null, facebookUser);
                    } else {
                        facebookUser = {
                            username: profile.displayName.replace(/ /g,''),
                            facebook: {
                                token: token,
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        };
                        userModel
                            .createUser(facebookUser)
                            .then(
                                function(user) {
                                    done(null, user);
                                },
                                function(err){
                                    done(null, err);
                                }
                            );
                    }
                },
                function(err){
                    done(null, err);
                }
            );
    }
};