/**
 * Created by Navya on 6/1/2016.
 */

module.exports = function(app) {

    require("./services/user.service.server.js")(app);

    app.get("/sayhello/:something", function(request) {
        console.log(request.params.something);
    });

};