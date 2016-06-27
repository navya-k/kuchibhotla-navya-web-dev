/**
 * Created by Navya on 6/1/2016.
 */

module.exports = function(app) {

    var models = require("./models/models.server")();

    require("./services/member.service.server.js")(app, models);
    require("./services/events.service.server.js")(app, models);
    // require("./services/website.service.server.js")(app, models);
    // require("./services/page.service.server.js")(app, models);
    // require("./services/widget.service.server.js")(app, models);

    app.get("/sayhello/:something", function(request) {
        console.log(request.params.something);
    });

};