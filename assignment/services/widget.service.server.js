/**
 * Created by Navya on 6/3/2016.
 */
module.exports = function(app, models) {

    var widgetModel = models.widgetModel;

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post ("/api/uploads", upload.single('myFile'), uploadImage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId",  updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    function createWidget(req, res){
        var widget = req.body;
        var pageId = req.params.pageId;

       widgetModel
           .createWidget(pageId, widget)
           .then(
               function(widget) {
                   res.json(widget);
               },
               function(err){
                   res.statusCode(400).send(err);
               }
           );
    }

    function findAllWidgetsForPage(req, res) {

        var pageId = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function(widgets){
                    res.json(widgets);
                },
                function(err){
                    res.statusCode(404).send(err);
                }
            );
    }

    function findWidgetById (req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(
                function(widget){
                    res.json(widget);
                },
                function(err){
                    res.statusCode(404).send(err);
                }
            );
    }

    function updateWidget(req, res) {

        var widgetId = req.params.widgetId;
        var newWidget = req.body;
        widgetModel
            .updateWidget(widgetId, newWidget)
            .then(
                function(stats){
                    res.sendStatus(200);
                },
                function(err){
                    res.statusCode(404).send(err);
                }
            );
    }

    function deleteWidget (req, res) {

        var id = req.params.widgetId;
        widgetModel
            .deleteWidget(id)
            .then(
                function(stats){
                    res.sendStatus(200);
                },
                function(err){
                    res.statusCode(404).send(err);
                }
            );

    }

    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var userId         = req.body.userId;
        var websiteId      = req.body.websiteId;
        var pageId         = req.body.pageId;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        widgetModel
            .updateWidget(widgetId,{url : "/uploads/"+filename})
            .then(
                function(stats){
                    res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
                },
                function(err){
                    res.statusCode(404).send(err);
                }
            );
        
    }

};